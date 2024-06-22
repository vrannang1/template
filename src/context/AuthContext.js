import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import Cookies from 'js-cookie';
import { FETCH_USER_QUERY } from '../graphql/queries';

const AuthContext = createContext();

const fetchUserByToken = async (client) => {
  const { data } = await client.query({
    query: FETCH_USER_QUERY,
  });
  return data.me;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const client = useApolloClient();

  useEffect(() => {
    const token = Cookies.get('auth-token');
    if (token) {
      fetchUserByToken(client)
        .then(setUser)
        .finally(() => setLoading(false))
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [client]);

  const login = (userData) => {
    Cookies.set('auth-token', userData.token, { secure: true, sameSite: 'Strict' });
    Cookies.set('refresh-token', userData.refreshToken, { secure: true, sameSite: 'Strict' });
    setUser(userData.user);
  };

  const logout = () => {
    Cookies.remove('auth-token');
    Cookies.remove('refresh-token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
