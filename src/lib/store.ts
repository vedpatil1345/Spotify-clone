import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  display_name: string;
  images: { url: string }[];
}

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
}

interface PlayerState {
  isPlaying: boolean;
  currentTrack: SpotifyApi.TrackObjectFull | null;
  volume: number;
  setPlaying: (playing: boolean) => void;
  setTrack: (track: SpotifyApi.TrackObjectFull) => void;
  setVolume: (volume: number) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
    }),
    { name: 'auth-storage' }
  )
);

export const usePlayerStore = create<PlayerState>((set) => ({
  isPlaying: false,
  currentTrack: null,
  volume: 1,
  setPlaying: (playing) => set({ isPlaying: playing }),
  setTrack: (track) => set({ currentTrack: track }),
  setVolume: (volume) => set({ volume: volume }),
}));