import React from 'react';
import { getAuthUrl } from '../lib/spotify/auth';

export default function LoginButton() {
  return (
    <button
      onClick={() => window.location.href = getAuthUrl()}
      className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-full transition-colors"
    >
      Connect with Spotify
    </button>
  );
}