import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Library, Plus, Heart } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-64 bg-dark-300 h-full flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary-500">MeTunes</h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2 px-3">
          <li>
            <Link to="/" className="flex items-center space-x-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-dark-200">
              <Home size={24} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/search" className="flex items-center space-x-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-dark-200">
              <Search size={24} />
              <span>Search</span>
            </Link>
          </li>
          <li>
            <Link to="/library" className="flex items-center space-x-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-dark-200">
              <Library size={24} />
              <span>Your Library</span>
            </Link>
          </li>
        </ul>

        <div className="mt-8">
          <ul className="space-y-2 px-3">
            <li>
              <button className="w-full flex items-center space-x-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-dark-200">
                <Plus size={24} />
                <span>Create Playlist</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center space-x-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-dark-200">
                <Heart size={24} />
                <span>Liked Songs</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}