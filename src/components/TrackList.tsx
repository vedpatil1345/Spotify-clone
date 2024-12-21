// TrackList.tsx

import { Clock, Play } from 'lucide-react';
import { useSpotifyPlayback } from '../hooks/useSpotifyPlayback';

interface Track {
  id: string;
  uri: string;
  name: string;
  artists: { name: string }[];
  album: { name: string; images: { url: string }[] };
  duration_ms: number;
}

interface TrackListProps {
  tracks: Track[];
}

export function TrackList({ tracks }: TrackListProps) {
  const { playTracks } = useSpotifyPlayback();

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlay = (index: number) => {
    const trackUris = tracks.slice(index).map(track => track.uri);
    playTracks(trackUris);
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-[16px_4fr_3fr_2fr_minmax(120px,1fr)] gap-4 px-4 py-2 text-gray-400 border-b border-gray-800">
        <div>#</div>
        <div>Title</div>
        <div>Album</div>
        <div>Date added</div>
        <div className="flex justify-end">
          <Clock size={16} />
        </div>
      </div>
      {tracks.map((track, index) => (
        <div
          key={track.id}
          className="grid grid-cols-[16px_4fr_3fr_2fr_minmax(120px,1fr)] gap-4 px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md group"
          onClick={() => handlePlay(index)}
        >
          <div className="flex items-center">
            <span className="group-hover:hidden">{index + 1}</span>
            <Play size={16} className="hidden group-hover:block" />
          </div>
          <div className="flex items-center gap-4">
            <img
              src={track.album.images[2]?.url}
              alt={track.album.name}
              className="w-10 h-10"
            />
            <div>
              <div className="font-medium">{track.name}</div>
              <div className="text-sm text-gray-400">
                {track.artists.map(artist => artist.name).join(', ')}
              </div>
            </div>
          </div>
          <div className="flex items-center text-gray-400">{track.album.name}</div>
          <div className="flex items-center text-gray-400">Today</div>
          <div className="flex items-center justify-end text-gray-400">
            {formatDuration(track.duration_ms)}
          </div>
        </div>
      ))}
    </div>
  );
}