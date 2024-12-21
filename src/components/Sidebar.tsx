import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Library, Heart } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="w-64 bg-black h-screen p-6">
      <div className="text-white space-y-6">
        <Link to="/" className="flex items-center space-x-2 hover:text-red-500">
          <Home size={24} />
          <span>Home</span>
        </Link>
        <Link to="/search" className="flex items-center space-x-2 hover:text-red-500">
          <Search size={24} />
          <span>Search</span>
        </Link>
        <Link to="/library" className="flex items-center space-x-2 hover:text-red-500">
          <Library size={24} />
          <span>Your Library</span>
        </Link>
        <Link to="/liked" className="flex items-center space-x-2 hover:text-red-500">
          <Heart size={24} />
          <span>Liked Songs</span>
        </Link>
      </div>
    </div>
  );
}