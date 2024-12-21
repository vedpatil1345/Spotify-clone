// Player.tsx
import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useSpotifyPlayback } from '../hooks/useSpotifyPlayback';

export function Player() {
  const {
    playerState: { isPlaying, currentTrack, volume },
    pause,
    resume,
    nextTrack,
    previousTrack,
    setVolume
  } = useSpotifyPlayback();

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      resume();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black p-4">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <div className="flex items-center space-x-4 w-1/3">
          <img
            src={currentTrack.album.images[2]?.url}
            alt="Track artwork"
            className="w-10 h-10 rounded"
          />
          <div className="text-white">
            <p className="font-medium">{currentTrack.name}</p>
            <p className="text-sm text-gray-400">
              {currentTrack.artists.map((artist: { name: string }) => artist.name).join(', ')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 w-1/3 justify-center">
          <button 
            className="text-gray-400 hover:text-white"
            onClick={previousTrack}
            title="Previous Track"
          >
            <SkipBack size={20} />
          </button>
          <button 
            className="bg-red-500 rounded-full p-2 hover:scale-105 transition"
            onClick={handlePlayPause}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={20} className="text-white" />
            ) : (
              <Play size={20} className="text-white" />
            )}
          </button>
          <button 
            className="text-gray-400 hover:text-white"
            onClick={nextTrack}
            title="Next Track"
          >
            <SkipForward size={20} />
          </button>
        </div>
        
        <div className="flex items-center space-x-2 w-1/3 justify-end">
          <Volume2 size={20} className="text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-gray-600 rounded-full"
            title="Volume Control"
          />
        </div>
      </div>
    </div>
  );
}