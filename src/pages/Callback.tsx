import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { spotifyApi } from '../lib/spotify';
import { useAuthStore } from '../store/useAuthStore';

export function Callback() {
  const navigate = useNavigate();
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await spotifyApi.authenticate();
        setIsAuthenticated(true);
        navigate('/');
      } catch (error) {
        console.error('Authentication failed:', error);
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate, setIsAuthenticated]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
    </div>
  );
}