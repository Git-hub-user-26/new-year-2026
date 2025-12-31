import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Create floating star particles
    const newStars = [];
    for (let i = 0; i < 20; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
    setStars(newStars);
  }, []);

  return (
    <div className="home-container">
      {/* Magical floating stars */}
      <div className="stars-bg">
        {stars.map(star => (
          <div 
            key={star.id} 
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.id * 0.1}s`,
              animationDuration: `${star.speed * 10}s`
            }}
          />
        ))}
      </div>

      {/* Romantic overlay */}
      <div className="overlay-gradient"></div>

      <div className="home-content">
        {/* Animated title with heartbeat */}
        <div className="title-wrapper">
          <h1 className="home-title">
            <span className="heart-float">💖</span>
            Happy New Year 2026!
            <span className="heart-float">💖</span>
          </h1>
          <div className="title-glow"></div>
        </div>

        {/* Welcome message with typewriter effect */}
        <p className="home-message">
          Welcome to a website specially for my dumb dora dorry Doremon ! ✨<br/>
          <span className="highlight-text">
            Happy New Year Dummyyyyy 💕
          </span>
        </p>
        
        {/* Enhanced navigation cards with hover magic */}
        <div className="nav-cards">
          <Link to="/countdown" className="nav-card countdown-card">
            <div className="card-icon">⏰</div>
            <div className="card-glow"></div>
            <h3>Countdown Magic</h3>
            <p>Fireworks for chotta sa baccha  ✨</p>
            <div className="card-shine"></div>
          </Link>
          
          <Link to="/gallery" className="nav-card gallery-card">
            <div className="card-icon">📸</div>
            <div className="card-glow"></div>
            <h3>Pics of my mau</h3>
            <p>Apki pyaari pyaari photos 💑</p>
            <div className="card-shine"></div>
          </Link>
          
          <Link to="/messages" className="nav-card messages-card">
            <div className="card-icon">💌</div>
            <div className="card-glow"></div>
            <h3>Love Notes</h3>
            <p>Pabo these are some words for yoouu ❤️</p>
            <div className="card-shine"></div>
          </Link>
        </div>

        {/* Floating footer with love animation */}
        <div className="home-footer">
          <div className="love-animation">
            <span className="love-heart">❤️</span>
            <p>For my pretty little babyy</p>
            <span className="love-heart">❤️</span>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="corner-decoration top-left">
        <div className="sparkle sparkle-1">✨</div>
        <div className="sparkle sparkle-2">⭐</div>
      </div>
      <div className="corner-decoration top-right">
        <div className="sparkle sparkle-3">💫</div>
        <div className="sparkle sparkle-4">🌟</div>
      </div>
    </div>
  );
}

export default Home;
