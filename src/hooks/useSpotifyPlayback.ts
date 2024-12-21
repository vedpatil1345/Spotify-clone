// useSpotifyPlayback.ts
import { useState, useEffect } from 'react';
import { spotifyApi } from '../lib/spotify';

interface PlayerState {
  isPlaying: boolean;
  currentTrack: SpotifyApi.TrackObjectFull | null;
  position: number;
  volume: number;
}

export function useSpotifyPlayback() {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [deviceId, setDeviceId] = useState<string>('');
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    currentTrack: null,
    position: 0,
    volume: 1,
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Tunes Web Player',
        getOAuthToken: cb => {
          spotifyApi.getAccessToken().then(token => {
            cb(token);
          });
        },
        volume: 1
      });

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDeviceId(device_id);
        setPlayer(player);
      });

      player.addListener('player_state_changed', state => {
        if (!state) return;

        setPlayerState({
          isPlaying: !state.paused,
          currentTrack: state.track_window.current_track,
          position: state.position,
          volume: state.volume,
        });
      });

      player.connect();
    };

    return () => {
      player?.disconnect();
    };
  }, []);

  const play = async (uri?: string) => {
    if (!deviceId) return;

    const payload = uri ? { uris: [uri] } : {};
    await spotifyApi.put(`me/player/play?device_id=${deviceId}`, payload);
  };

  const playTracks = async (uris: string[]) => {
    if (!deviceId) return;
    await spotifyApi.put(`me/player/play?device_id=${deviceId}`, { uris });
  };

  const pause = async () => {
    await player?.pause();
  };

  const resume = async () => {
    await player?.resume();
  };

  const nextTrack = async () => {
    await player?.nextTrack();
  };

  const previousTrack = async () => {
    await player?.previousTrack();
  };

  const setVolume = async (volume: number) => {
    await player?.setVolume(volume);
  };

  return {
    playerState,
    play,
    playTracks,
    pause,
    resume,
    nextTrack,
    previousTrack,
    setVolume,
  };
}

// types/spotify.d.ts
declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: {
      Player: any;
    };
  }
}