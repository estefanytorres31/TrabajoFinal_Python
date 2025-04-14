import axios from './axiosInstance';

export const getRelacionesSistemaParte = () => axios.get('/sistema-partes/');
export const getRelacionSistemaParte = (id) => axios.get(`/sistema-partes/${id}`);
export const createRelacionSistemaParte = (data) => axios.post('/sistema-partes/', data);
export const updateRelacionSistemaParte = (id, data) => axios.put(`/sistema-partes/${id}`, data);
export const deleteRelacionSistemaParte = (id) => axios.delete(`/sistema-partes/${id}`);

