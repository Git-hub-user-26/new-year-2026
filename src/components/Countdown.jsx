import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Fireworks from '@fireworks-js/react';
import '../styles/Countdown.css';

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({});
  const [isNewYear, setIsNewYear] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const videoRef = useRef(null);

  // YOUR VIDEO URL HERE
  const VIDEO_URL = '/media/your-romantic-video.mp4';

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const newYear = new Date('2026-01-01T00:00:00');
      const difference = newYear - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
        setIsNewYear(false);
        setShowFireworks(false);
        setShowVideo(false);
      } else {
        setIsNewYear(true);
        setTimeout(() => setShowFireworks(true), 500);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFireworksEnd = () => {
    setShowFireworks(false);
    setTimeout(() => {
      setShowVideo(true);
      setTimeout(() => {
        if (videoRef.current && userInteracted) {
          videoRef.current.play();
        }
      }, 500);
    }, 2000);
  };

  const handleUserInteraction = () => {
    setUserInteracted(true);
    if (videoRef.current && showVideo) {
      videoRef.current.play().catch(e => console.log('Video play failed:', e));
    }
  };

  return (
    <div className="countdown-container" onClick={handleUserInteraction}>
      {/* Floating particles background */}
      <div className="particles-bg">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>

      <Link to="/home" className="back-btn">← Back to Home</Link>
      
      {!isNewYear ? (
        <div className="countdown-content">
          <div className="title-container">
            <h1 className="countdown-title">
              <span className="emoji">🎊</span> New Year 2026 Countdown <span className="emoji">🎊</span>
            </h1>
            <p className="countdown-subtitle">
              Just moments away from our magical celebration together! 💕✨
            </p>
          </div>
          
          <div className="timer-display">
            <div className="time-unit" data-value={timeLeft.days || 0}>
              <span className="time-number">{timeLeft.days || 0}</span>
              <span className="time-label">Days</span>
            </div>
            <div className="time-separator">:</div>
            <div className="time-unit" data-value={timeLeft.hours || 0}>
              <span className="time-number">{String(timeLeft.hours || 0).padStart(2, '0')}</span>
              <span className="time-label">Hours</span>
            </div>
            <div className="time-separator">:</div>
            <div className="time-unit" data-value={timeLeft.minutes || 0}>
              <span className="time-number">{String(timeLeft.minutes || 0).padStart(2, '0')}</span>
              <span className="time-label">Minutes</span>
            </div>
            <div className="time-separator">:</div>
            <div className="time-unit" data-value={timeLeft.seconds || 0}>
              <span className="time-number">{String(timeLeft.seconds || 0).padStart(2, '0')}</span>
              <span className="time-label">Seconds</span>
            </div>
          </div>

          <div className="progress-ring">
            <svg className="progress-svg">
              <circle className="progress-circle-bg" cx="100" cy="100" r="90"></circle>
              <circle className="progress-circle" cx="100" cy="100" r="90"></circle>
            </svg>
            <div className="progress-text">Almost There! 💖</div>
          </div>
        </div>
      ) : showFireworks ? (
        <div className="celebration-fullscreen">
          <Fireworks 
            options={{
              rocketsPoint: { x: 0.5, y: 0.2 },
              colors: ['#ff0055', '#ff9a00', '#ffd600', '#00ffaa', '#a100ff', '#ffcc00', '#00ccff'],
              particles: {
                life: { max: 800 },
                speed: { min: 0.05, max: 0.25 },
                quantity: 8
              },
              rockets: { hue: { min: 0, max: 360 } },
              traceLength: 4.5,
              delay: { min: 12, max: 35 },
              friction: 0.97,
              gravity: { x: 0, y: 1 },
              wind: { x: 0.2, y: 0.5 }
            }}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999
            }}
            onFinish={handleFireworksEnd}
          />
          <div className="fireworks-overlay">
            <div className="celebration-badge">🎉</div>
            <h1 className="celebration-title">HAPPY NEW YEAR 2026!</h1>
            <p className="celebration-text">Get ready for something truly special, my love... 💖✨</p>
          </div>
        </div>
      ) : showVideo ? (
        <div className="video-fullscreen">
          <video
            ref={videoRef}
            src={VIDEO_URL}
            autoPlay
            loop
            muted={!userInteracted}
            playsInline
            className="celebration-video"
          />
          {!userInteracted && (
            <div className="video-overlay">
              <div className="heart-pulse">💕</div>
              <h2>Click anywhere to unlock our special message 💕</h2>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Countdown;
