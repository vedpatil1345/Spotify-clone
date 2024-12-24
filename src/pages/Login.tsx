import React from 'react';
import LoginButton from '../components/LoginButton';
import { Music } from 'lucide-react';

export default function Login() {
  return (
    <div className="min-h-screen bg-dark-300 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <Music size={64} className="text-primary-500" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Welcome to MeTunes</h1>
        <p className="text-gray-400 mb-8">Connect with Spotify to start listening</p>
        <LoginButton />
      </div>
    </div>
  );
}