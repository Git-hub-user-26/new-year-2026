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
  const [videoError, setVideoError] = useState('');
  const videoRef = useRef(null);
  const fireworksTimerRef = useRef(null);
  const targetRef = useRef(new Date('2026-01-01T17:41:00'));

  // IMPORTANT: Place video file in 'public/media/' folder
  const VIDEO_URL = '/media/dv.mp4';

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
        console.log('🎉 COUNTDOWN ZERO - Starting celebration sequence');
        setIsNewYear(true);
        setShowFireworks(true);
        setShowVideo(false);
        
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);

        // Fireworks for 8s, then 5s pause, then video
        fireworksTimerRef.current = setTimeout(() => {
          console.log('🎆 Fireworks ending, waiting 5s for video...');
          setShowFireworks(false);
          
          setTimeout(() => {
            console.log('📹 Attempting to show video...');
            setShowVideo(true);
          }, 5000);
        }, 8000);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => {
      clearInterval(timer);
      if (fireworksTimerRef.current) clearTimeout(fireworksTimerRef.current);
    };
  }, [isNewYear]);

  // Separate effect to play video when it becomes visible
  useEffect(() => {
    if (showVideo && videoRef.current) {
      console.log('📹 Video element rendered, attempting playback...');
      console.log('Video src:', videoRef.current.src);
      
      const playVideo = async () => {
        try {
          // Force load the video first
          videoRef.current.load();
          
          // Wait a bit for loading
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Attempt play
          await videoRef.current.play();
          console.log('✅ Video playing successfully!');
        } catch (error) {
          console.error('❌ Video play failed:', error);
          setVideoError(`Playback error: ${error.message}. Click anywhere to play.`);
        }
      };
      
      playVideo();
    }
  }, [showVideo]);

  const handleUserInteraction = () => {
    console.log('👆 User clicked - attempting to play/unmute video');
    
    if (videoRef.current && showVideo) {
      setUserInteracted(true);
      
      try {
        videoRef.current.muted = false;
        console.log('🔊 Video unmuted');
      } catch (e) {
        console.error('Failed to unmute:', e);
      }
      
      videoRef.current.play()
        .then(() => console.log('✅ Video playing with sound'))
        .catch(e => {
          console.error('❌ Play failed:', e);
          setVideoError('Unable to play video. Check console for details.');
        });
    }
  };

  const handleVideoError = (e) => {
    console.error('❌ Video error event:', e.target.error);
    setVideoError(`Video load error. Check if file exists at: ${VIDEO_URL}`);
  };

  return (
    <div className="countdown-container" onClick={handleUserInteraction}>
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
      {/* Add this after back button for testing */}
      <button onClick={() => setShowVideo(true)} style={{position:'fixed',top:'100px',left:'20px',zIndex:999}}>
        TEST VIDEO
      </button>
      
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
            preload="auto"
            className="celebration-video"
            onError={handleVideoError}
            onLoadedData={() => console.log('📹 Video loaded successfully')}
          />
          {!userInteracted && (
            <div className="video-overlay pulse">
              <div className="heart-pulse">💕</div>
              <h2>Click anywhere to unlock our special message 💕</h2>
              {videoError && (
                <p style={{color: '#ff6b6b', fontSize: '14px', marginTop: '10px'}}>
                  {videoError}
                </p>
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Countdown;
{showVideo && (
  <div onClick={() => videoRef.current.play()}>
    <p>🎥 Tap to play your New Year video! 💕</p>
    <video ref={videoRef} src="/media/dv.mp4" muted playsInline />
  </div>
)}
