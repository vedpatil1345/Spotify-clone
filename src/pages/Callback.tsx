import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTokenFromUrl } from '../lib/spotify/auth';
import { useAuthStore } from '../lib/store';
import { getCurrentUser } from '../lib/spotify/api';

export default function Callback() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuthStore();

  useEffect(() => {
    const token = getTokenFromUrl();
    if (token) {
      setToken(token);
      getCurrentUser(token)
        .then(user => {
          setUser(user);
          navigate('/');
        })
        .catch(() => navigate('/login'));
    } else {
      navigate('/login');
    }
  }, [navigate, setToken, setUser]);

  return (
    <div className="min-h-screen bg-dark-300 flex items-center justify-center">
      <div className="text-white">Connecting to Spotify...</div>
    </div>
  );
}