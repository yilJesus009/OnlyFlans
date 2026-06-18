import http from './http.js';

export const getCreatorProfile = async () => {
  const { data } = await http.get('/creador/perfil');
  return data;
};

export const updateCreatorProfile = async ({ descripcion, fotoPerfil, banner }) => {
  const formData = new FormData();
  formData.append('descripcion', descripcion || '');
  if (fotoPerfil?.[0]) formData.append('fotoPerfil', fotoPerfil[0]);
  if (banner?.[0]) formData.append('banner', banner[0]);
  const { data } = await http.put('/creador/perfil', formData);
  return data;
};

export const getCreatorPosts = async () => {
  const { data } = await http.get('/creador/posts');
  return data;
};

export const createCreatorPost = async ({ texto, imagen }) => {
  const formData = new FormData();
  formData.append('texto', texto);
  if (imagen?.[0]) formData.append('imagen', imagen[0]);
  const { data } = await http.post('/creador/posts', formData);
  return data;
};

export const deleteCreatorPost = async (id) => {
  const { data } = await http.delete(`/creador/posts/${id}`);
  return data;
};

export const getCreatorGoals = async () => {
  const { data } = await http.get('/creador/metas');
  return data;
};

export const createCreatorGoal = async (payload) => {
  const { data } = await http.post('/creador/metas', payload);
  return data;
};

export const deleteCreatorGoal = async (id) => {
  const { data } = await http.delete(`/creador/metas/${id}`);
  return data;
};

export const getIncomeReport = async (params) => {
  const { data } = await http.get('/reporte/ingresos', { params });
  return data;
};

export const getPostComments = async (postId) => {
  const { data } = await http.get(`/donacion/posts/${postId}/comentarios`);
  return data;
};
