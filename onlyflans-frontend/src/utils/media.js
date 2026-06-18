import { API_ORIGIN } from '../api/http.js';

export const uploadUrl = (filename) => {
  if (!filename) return '';
  return `${API_ORIGIN}/uploads/${filename}`;
};
