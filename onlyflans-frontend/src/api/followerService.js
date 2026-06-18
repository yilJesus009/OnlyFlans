import http from './http.js';

export const searchCreators = async (q) => {
  const { data } = await http.get('/seguidor/buscar', { params: { q } });
  return data;
};

export const getPublicCreatorProfile = async (id) => {
  const { data } = await http.get(`/seguidor/creador/${id}`);
  return data;
};

export const donateFlans = async ({ creadorId, cantidad }) => {
  const { data } = await http.post('/donacion', { creadorId, cantidad });
  return data;
};

export const getUnlockedPosts = async (creadorId) => {
  const { data } = await http.get(`/donacion/creador/${creadorId}/posts`);
  return data;
};

export const createComment = async ({ postId, texto }) => {
  const { data } = await http.post('/donacion/comentario', { postId, texto });
  return data;
}; 

export const getFavorites = async () => {
  const { data } = await http.get('/seguidor/favoritos');
  return data;
};

export const addFavorite = async (creadorId) => {
  const { data } = await http.post('/seguidor/favoritos', { creadorId });
  return data;
};

export const removeFavorite = async (creadorId) => {
  const { data } = await http.delete(`/seguidor/favoritos/${creadorId}`);
  return data;
};

export const getFeed = async () => {
  const { data } = await http.get('/seguidor/feed');
  return data;
};

export const getDonationHistory = async (params) => {
  const { data } = await http.get('/donacion/historial', { params });
  return data;
};
