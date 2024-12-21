import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const CLIENT_ID = '2981ea24d7414456bc3bc350542f904b';
const REDIRECT_URI = 'http://localhost:5173/callback';
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'user-library-read',
  'user-top-read',
  'user-read-recently-played',
  'streaming',
  'user-read-playback-state',
  'user-modify-playback-state'
];

export const spotifyApi = SpotifyApi.withImplicitGrant(
  CLIENT_ID,
  REDIRECT_URI,
  SCOPES
);