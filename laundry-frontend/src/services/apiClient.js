import axios from 'axios';

const API_URL = 'http://localhost:3000';

const apiClient = axios.create({ baseURL: API_URL });

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('idToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor RESPONSE - ini yang handle auto-refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Kalau error 401 DAN belum pernah dicoba refresh sebelumnya
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // tandain biar nggak infinite loop

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await axios.post(`${API_URL}/auth/refresh-token`, { refreshToken });

        localStorage.setItem('idToken', res.data.idToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);

        // Ulangi request yang gagal, pakai token baru
        originalRequest.headers.Authorization = `Bearer ${res.data.idToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh token juga gagal/basi, paksa logout
        localStorage.removeItem('idToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('outlet');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;