
import apiClient from './apiClient';

const API_URL = 'http://localhost:3000'

export const getDailySummary = async(date =null)=>{
    const token = localStorage.getItem('idToken');

    const response = await apiClient.get(`${API_URL}/reports/daily`, {
        headers: {Authorization: `Bearer ${token}`},
        params: date? {date} : {}        
    })
    return response.data
}  

export const getOrders = async () => {
  const token = localStorage.getItem('idToken');

  const response = await apiClient.get(`${API_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};  

export const getOrderById = async(id)=>{
  const token = localStorage.getItem('idToken');

  const respons = await apiClient.get(`${API_URL}/orders/${id}`,{
    headers:{Authorization: `Bearer ${token}`}
  })
  return respons.data;
}