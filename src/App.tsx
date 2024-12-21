import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { Login } from './pages/Login';
import { Callback } from './pages/Callback';
import { PrivateRoute } from './components/PrivateRoute';
import { useAuthStore } from './store/useAuthStore';
import { spotifyApi } from './lib/spotify';
import { Home } from './pages/Home';

function App() {
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = await spotifyApi.getAccessToken();
        setIsAuthenticated(!!accessToken);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [setIsAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/" element={
          <PrivateRoute>
            <AppLayout>
              <Home />
            </AppLayout>
          </PrivateRoute>
        } />
        <Route path="/search" element={
          <PrivateRoute>
            <AppLayout>
              <div>Search Page</div>
            </AppLayout>
          </PrivateRoute>
        } />
        <Route path="/library" element={
          <PrivateRoute>
            <AppLayout>
              <div>Library Page</div>
            </AppLayout>
          </PrivateRoute>
        } />
        <Route path="/liked" element={
          <PrivateRoute>
            <AppLayout>
              <div>Liked Songs</div>
            </AppLayout>
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;