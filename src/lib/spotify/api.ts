const BASE_URL = 'https://api.spotify.com/v1';

export async function fetchFromSpotify(endpoint: string, token: string) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getCurrentUser(token: string) {
  return fetchFromSpotify('/me', token);
}

export async function getUserPlaylists(token: string) {
  return fetchFromSpotify('/me/playlists', token);
}

export async function getRecentlyPlayed(token: string) {
  return fetchFromSpotify('/me/player/recently-played', token);
}

export async function searchTracks(token: string, query: string) {
  const params = new URLSearchParams({ q: query, type: 'track,artist,album' });
  return fetchFromSpotify(`/search?${params}`, token);
}