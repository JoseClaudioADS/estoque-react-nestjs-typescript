import { useState, useEffect } from 'react';

import api from '../services/api';
import history from '../services/history';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  function handleLogin(token: string) {
    localStorage.setItem('token', token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setAuthenticated(true);
    history.push('/');
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    history.push('/');
  }

  return { authenticated, handleLogin, handleLogout, loading };
}
