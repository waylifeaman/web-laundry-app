import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const register = async (data) => {
  const response = await axios.post(`${API_URL}/auth/register`, data);
  return response.data;
};
export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
  return response.data;
};