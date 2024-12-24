export const SPOTIFY_CONFIG = {
  CLIENT_ID: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  REDIRECT_URI: `${window.location.origin}/callback`,
  SCOPES: [
    'user-read-private',
    'user-read-email',
    'user-library-read',
    'user-library-modify',
    'user-read-playback-state',
    'user-modify-playback-state',
    'streaming',
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private'
  ].join(' ')
};