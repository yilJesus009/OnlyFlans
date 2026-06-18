import http from './http.js';

export const registerUser = async (payload) => {
  const { data } = await http.post('/auth/register', payload);
  return data;
};

export const loginUser = async (payload) => {
  const { data } = await http.post('/auth/login', payload);
  return data;
};

export const getMe = async () => {
  const { data } = await http.get('/auth/me');
  return data.usuario;
};
