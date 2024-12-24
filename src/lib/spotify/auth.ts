import { SPOTIFY_CONFIG } from './config';

export function getAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: SPOTIFY_CONFIG.CLIENT_ID,
    response_type: 'token',
    redirect_uri: SPOTIFY_CONFIG.REDIRECT_URI,
    scope: SPOTIFY_CONFIG.SCOPES,
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export function getTokenFromUrl(): string | null {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get('access_token');
}