import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { clearSession, getStoredUser, getToken, saveSession } from '../utils/token.js';
import { getMe, loginUser, registerUser } from '../api/authService.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(Boolean(getToken()));

  useEffect(() => {
    const hydrate = async () => {
      if (!getToken()) {
        setLoading(false);
        return;
      }
      try {
        const usuario = await getMe();
        setUser(usuario);
      } catch {
        clearSession();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    hydrate();
  }, []);

  const login = async (payload) => {
    const session = await loginUser(payload);
    saveSession(session);
    setUser(session.usuario);
    return session.usuario;
  };

  const register = async (payload) => {
    const session = await registerUser(payload);
    saveSession(session);
    setUser(session.usuario);
    return session.usuario;
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
