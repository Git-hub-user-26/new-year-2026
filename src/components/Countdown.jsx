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
  const [showConfetti, setShowConfetti] = useState(false);
  const videoRef = useRef(null);
  const fireworksTimerRef = useRef(null);
  // Updated to end at 17:48 IST (5:48 PM)
  const targetRef = useRef(new Date('2026-01-01T17:48:00'));

  // YOUR VIDEO URL HERE - Update to public URL if needed
  const VIDEO_URL = '/media/WhatsApp Video 2025-12-31 at 23.37.27.mp4';

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetRef.current - now;

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
        setShowConfetti(false);
      } else if (!isNewYear) {
        // Trigger sequence: fireworks → 5s delay → video
        setIsNewYear(true);
        setShowFireworks(true);
        setShowVideo(false);
        
        // Brief confetti burst on zero
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);

        // End fireworks after 8 seconds, then wait 5 more seconds before video
        fireworksTimerRef.current = setTimeout(() => {
          setShowFireworks(false);
          
          // Wait 5 seconds after fireworks end, then show video
          setTimeout(() => {
            setShowVideo(true);
            // Attempt autoplay after slight delay
            setTimeout(() => {
              if (videoRef.current) {
                videoRef.current.play().catch(e => {
                  console.log('Autoplay failed (user interaction needed):', e);
                });
              }
            }, 300);
          }, 5000);
        }, 8000);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => {
      clearInterval(timer);
      if (fireworksTimerRef.current) {
        clearTimeout(fireworksTimerRef.current);
      }
    };
  }, [isNewYear]);

  const handleUserInteraction = () => {
    setUserInteracted(true);
    if (videoRef.current) {
      try {
        videoRef.current.muted = false;
      } catch (e) {
        console.log('Failed to unmute:', e);
      }
      videoRef.current.play().catch(e => console.log('Video play failed:', e));
    }
  };

  return (
    <div className="countdown-container" onClick={handleUserInteraction}>
      {/* Enhanced floating particles + animated hearts */}
      <div className="particles-bg">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="floating-heart heart-1">💖</div>
        <div className="floating-heart heart-2">💕</div>
        <div className="floating-heart heart-3">✨</div>
      </div>

      <Link to="/home" className="back-btn">← Back to Home</Link>
      
      {!isNewYear ? (
        <div className="countdown-content fade-in">
          <div className="title-container pulse">
            <h1 className="countdown-title">
              <span className="emoji bounce">🎊</span> 10-Minute Countdown <span className="emoji bounce">🎊</span>
            </h1>
            <p className="countdown-subtitle slide-in">
              Just moments away from our magical celebration together! 💕✨
            </p>
          </div>
          
          <div className="timer-display scale-in">
            <div className="time-unit" data-value={timeLeft.days || 0}>
              <span className="time-number glow">{timeLeft.days || 0}</span>
              <span className="time-label">Days</span>
            </div>
            <div className="time-separator">:</div>
            <div className="time-unit" data-value={timeLeft.hours || 0}>
              <span className="time-number glow">{String(timeLeft.hours || 0).padStart(2, '0')}</span>
              <span className="time-label">Hours</span>
            </div>
            <div className="time-separator">:</div>
            <div className="time-unit" data-value={timeLeft.minutes || 0}>
              <span className="time-number glow">{String(timeLeft.minutes || 0).padStart(2, '0')}</span>
              <span className="time-label">Minutes</span>
            </div>
            <div className="time-separator">:</div>
            <div className="time-unit" data-value={timeLeft.seconds || 0}>
              <span className="time-number glow pulse-fast">{String(timeLeft.seconds || 0).padStart(2, '0')}</span>
              <span className="time-label">Seconds</span>
            </div>
          </div>

          <div className="progress-ring rotate">
            <svg className="progress-svg">
              <circle className="progress-circle-bg" cx="100" cy="100" r="90"></circle>
              <circle className="progress-circle" cx="100" cy="100" r="90"></circle>
            </svg>
            <div className="progress-text bounce">Almost There! 💖</div>
          </div>
        </div>
      ) : showFireworks ? (
        <div className="celebration-fullscreen">
          <Fireworks 
            options={{
              rocketsPoint: { x: 0.5, y: 0.2 },
              colors: ['#ff0055', '#ff9a00', '#ffd600', '#00ffaa', '#a100ff', '#ffcc00', '#00ccff', '#ff69b4'],
              particles: { life: { max: 800 }, speed: { min: 0.05, max: 0.25 }, quantity: 10 },
              rockets: { hue: { min: 0, max: 360 } },
              traceLength: 4.5,
              delay: { min: 12, max: 35 },
              friction: 0.97,
              gravity: { x: 0, y: 1 },
              wind: { x: 0.2, y: 0.5 }
            }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}
          />
          {showConfetti && <div className="confetti-burst"></div>}
          <div className="fireworks-overlay fade-in">
            <div className="celebration-badge scale">🎉</div>
            <h1 className="celebration-title pulse">HAPPY NEW YEAR 2026!</h1>
            <p className="celebration-text slide-in">Get ready for something truly special, my love... 💖✨</p>
          </div>
        </div>
      ) : showVideo ? (
        <div className="video-fullscreen fade-in">
          <video
            ref={videoRef}
            src={VIDEO_URL}
            autoPlay
            loop
            muted={true}
            playsInline
            className="celebration-video"
          />
          {!userInteracted && (
            <div className="video-overlay pulse">
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
