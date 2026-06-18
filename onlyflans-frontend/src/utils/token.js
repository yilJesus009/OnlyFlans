const TOKEN_KEY = 'onlyflans_token';
const USER_KEY = 'onlyflans_user';

export const saveSession = ({ token, usuario }) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(usuario));
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getStoredUser = () => {
  const value = localStorage.getItem(USER_KEY);
  return value ? JSON.parse(value) : null;
};

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
