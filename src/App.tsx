import React, { useState, useEffect } from 'react';
import Desktop from './components/Desktop/Desktop';
import { WindowProvider } from './components/context/WindowContext'; // Updated path to match actual file location
import './App.css';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showLoader, setShowLoader] = useState(true);

  // Simulate loading the OS
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, any username and password will work
    if (username && password) {
      setLoading(true);
      
      // Simulate loading
      setTimeout(() => {
        setAuthenticated(true);
        setLoading(false);
      }, 1500);
    } else {
      setError('Please enter both username and password');
    }
  };

  if (loading && showLoader) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center text-white font-mono">
        <div className="text-center">
          <h1 className="text-3xl text-kali-accent mb-4">Kali Portfolio OS</h1>
          <div className="flex flex-col items-center">
            <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-kali-accent animate-fill"></div>
            </div>
            <p className="mt-4 text-gray-400">Loading system components...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white font-mono">
        <div className="w-96 p-6 bg-gray-900 rounded-lg border border-kali-accent">
          <div className="text-center mb-6">
            <h1 className="text-2xl text-kali-accent">Kali Portfolio OS</h1>
            <p className="text-gray-400 text-sm">Login to access</p>
          </div>
          
          {error && (
            <div className="mb-4 p-2 bg-red-900 bg-opacity-30 border border-red-500 rounded text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-1 text-gray-300 text-sm">
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 focus:border-kali-accent p-2 rounded text-white"
                placeholder="Enter any username"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block mb-1 text-gray-300 text-sm">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 focus:border-kali-accent p-2 rounded text-white"
                placeholder="Enter any password"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-2 px-4 bg-kali-accent text-black font-semibold rounded hover:bg-green-400 transition-colors"
            >
              Log In
            </button>
          </form>
          
          <div className="mt-4 text-center text-gray-400 text-sm">
            <p>Demo Mode: Any username and password will work</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <WindowProvider>
      <Desktop />
    </WindowProvider>
  );
};

export default App;