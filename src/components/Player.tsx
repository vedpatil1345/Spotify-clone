import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { usePlayerStore } from '../lib/store';

export default function Player() {
  const { isPlaying, currentTrack, volume, setPlaying, setVolume } = usePlayerStore();

  return (
    <div className="h-20 bg-dark-400 border-t border-dark-200 px-4 flex items-center justify-between">
      {/* Track Info */}
      <div className="w-1/3 flex items-center space-x-4">
        {currentTrack && (
          <>
            <img
              src={currentTrack.albumArt || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=50&h=50&fit=crop'}
              alt="Album art"
              className="w-14 h-14 rounded"
            />
            <div>
              <h4 className="text-sm font-medium text-white">{currentTrack.title || 'No Track Selected'}</h4>
              <p className="text-xs text-gray-400">{currentTrack.artist || 'Unknown Artist'}</p>
            </div>
          </>
        )}
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white">
            <SkipBack size={20} />
          </button>
          <button 
            className="w-8 h-8 flex items-center justify-center bg-white rounded-full hover:scale-105 transition"
            onClick={() => setPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={20} className="text-black" /> : <Play size={20} className="text-black ml-1" />}
          </button>
          <button className="text-gray-400 hover:text-white">
            <SkipForward size={20} />
          </button>
        </div>
        <div className="w-96 h-1 bg-gray-600 rounded-full">
          <div className="w-1/3 h-full bg-primary-500 rounded-full" />
        </div>
      </div>

      {/* Volume Control */}
      <div className="w-1/3 flex justify-end items-center space-x-2">
        <Volume2 size={20} className="text-gray-400" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-24 accent-primary-500"
        />
      </div>
    </div>
  );
}