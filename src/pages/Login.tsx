import { Music } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { spotifyApi } from '../lib/spotify';
import { useAuthStore } from '../store/useAuthStore';

export function Login() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    try {
      await spotifyApi.authenticate();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <Music size={64} className="text-red-500 mb-8" />
      <h1 className="text-4xl font-bold text-white mb-8">Tunes</h1>
      <button
        onClick={handleLogin}
        className="bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition cursor-pointer"
      >
        Login with Spotify
      </button>
    </div>
  );
}