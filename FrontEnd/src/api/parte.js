import axios from './axiosInstance';    

export const getPartes = () => axios.get('/partes/');
export const getParte = (id) => axios.get(`/partes/${id}`);
export const createParte = (data) => axios.post('/partes/', data);
export const updateParte = (id, data) => axios.put(`/partes/${id}`, data);
export const deleteParte = (id) => axios.delete(`/partes/${id}`);

// Extra: obtener sistemas asociados a una parte
export const getSistemasPorParte = (id) => axios.get(`/partes/${id}/sistemas`);
