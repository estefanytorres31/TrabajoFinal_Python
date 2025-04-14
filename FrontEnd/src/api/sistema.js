import axios from './axiosInstance';

export const getSistemas = () => axios.get('/sistemas/');
export const getSistema = (id) => axios.get(`/sistemas/${id}`);
export const createSistema = (data) => axios.post('/sistemas/', data);
export const updateSistema = (id, data) => axios.put(`/sistemas/${id}`, data);
export const deleteSistema = (id) => axios.delete(`/sistemas/${id}`);

// Extra: obtener partes asociadas a un sistema
export const getPartesPorSistema = (id) => axios.get(`/sistemas/${id}/partes`);
