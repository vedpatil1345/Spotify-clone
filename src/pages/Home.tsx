import { useEffect, useState } from 'react';
import { spotifyApi } from '../lib/spotify';
import { TrackList } from '../components/TrackList';

export function Home() {
  const [topTracks, setTopTracks] = useState([]);
  const [recentTracks, setRecentTracks] = useState([]);
  const [debugInfo, setDebugInfo] = useState({ auth: '', error: '', tokenInfo: '' });

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        // Check authentication and log token details
        const token = await spotifyApi.getAccessToken();
        console.log('Token type:', typeof token, 'Token value:', token);
        setDebugInfo(prev => ({ 
          ...prev, 
          auth: token ? 'Token exists' : 'No token',
          tokenInfo: `Token type: ${typeof token}`
        }));

        // Get current user profile first to verify authentication
        const userProfile = await spotifyApi.currentUser.profile();
        console.log('User profile:', userProfile);

        // Get top tracks
        const topResponse = await spotifyApi.currentUser.topTracks({
          limit: 20,
          timeRange: 'short_term'
        });
        console.log('Top tracks response:', topResponse);
        if (topResponse?.items) {
          setTopTracks(topResponse.items);
        }

        // Get recently played tracks
        const recentResponse = await spotifyApi.player.getRecentlyPlayedTracks(20);
        console.log('Recent tracks response:', recentResponse);
        if (recentResponse?.items) {
          setRecentTracks(recentResponse.items.map(item => item.track));
        }

      } catch (error) {
        console.error('Error details:', error);
        setDebugInfo(prev => ({ 
          ...prev, 
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        }));
      }
    };

    fetchTracks();
  }, []);

  return (
    <div className="space-y-8">
      {/* Debug information */}
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <h3 className="text-red-500 font-bold mb-2">Debug Info:</h3>
        <p>Auth Status: {debugInfo.auth}</p>
        <p>Token Info: {debugInfo.tokenInfo}</p>
        {debugInfo.error && <p className="text-red-500">Error: {debugInfo.error}</p>}
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">Your Top Tracks</h2>
        {topTracks.length === 0 ? (
          <p className="text-gray-400">No top tracks found - Try playing some music first!</p>
        ) : (
          <TrackList tracks={topTracks} />
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
        {recentTracks.length === 0 ? (
          <p className="text-gray-400">No recent tracks found - Try playing some music!</p>
        ) : (
          <TrackList tracks={recentTracks} />
        )}
      </section>
    </div>
  );
}