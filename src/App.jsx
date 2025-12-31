import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import Gallery from './components/Gallery';
import Messages from './components/Messages';
import Countdown from './components/Countdown';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setAuth={setIsAuthenticated} />} />
        <Route 
          path="/home" 
          element={isAuthenticated ? <Home /> : <Navigate to="/" />} 
        />
        <Route 
          path="/gallery" 
          element={isAuthenticated ? <Gallery /> : <Navigate to="/" />} 
        />
        <Route 
          path="/messages" 
          element={isAuthenticated ? <Messages /> : <Navigate to="/" />} 
        />
        <Route 
          path="/countdown" 
          element={isAuthenticated ? <Countdown /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
