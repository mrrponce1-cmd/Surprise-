import React, { useState, useEffect } from 'react';
import Confetti from './Confetti';
import Balloon from './Balloon';
import Firework from './Firework';
import PhotoGallery from './PhotoGallery';
import ParticleExplosion from './ParticleExplosion';
import Cake3D from './Cake3D';

// 👇 ADD THESE IMPORTS FOR PHOTOS
import photo1 from './images/1.jpg';
import photo2 from './images/2.jpg';
import photo3 from './images/3.jpg';
import photo4 from './images/4.jpg';
import photo5 from './images/5.jpg';
import photo6 from './images/6.jpg';

export default function App() {
  // PRE-FILLED NAME HERE - Change this to any name you want!
  const [name, setName] = useState('Ashy');
  const [submitted, setSubmitted] = useState(false);
  const [candlesLit, setCandlesLit] = useState([false, false, false, false, false]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fireworks, setFireworks] = useState([]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [explosions, setExplosions] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
  const [blowOut, setBlowOut] = useState(false);

  // 👇 USE IMPORTED PHOTOS INSTEAD OF PATHS
  const photos = [photo1, photo2, photo3, photo4, photo5, photo6];

  const birthdayMessages = [
    "🎂 Make a wish and blow out the candles!",
    "✨ May all your dreams come true today!",
    "🎈 Another year of amazing adventures awaits!",
    "🌟 You deserve all the happiness in the world!",
    "🎁 Wishing you endless joy and laughter!",
    "💝 Today is all about YOU!",
    "🎊 Let's party like there's no tomorrow!"
  ];

  useEffect(() => {
    if (submitted) {
      const interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % birthdayMessages.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [submitted, birthdayMessages.length]);

  const handleStart = () => {
    setSubmitted(true);
    setShowConfetti(true);
    
    // Create massive fireworks
    const newFireworks = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: `${10 + Math.random() * 80}%`,
      y: `${10 + Math.random() * 50}%`,
      color: ['#ff006e', '#8338ec', '#3a86ff', '#06ffa5', '#ffbe0b', '#fb5607', '#ff4081', '#00e676'][i],
      delay: i * 300,
      size: 1 + Math.random()
    }));
    setFireworks(newFireworks);

    // Add explosions
    const newExplosions = Array.from({ length: 3 }, (_, i) => ({
      id: Date.now() + i + 100,
      x: 30 + Math.random() * 40,
      y: 30 + Math.random() * 30,
      delay: i * 600
    }));
    setExplosions(newExplosions);
  };

  const lightCandle = (index) => {
    if (blowOut) return;
    const newCandles = [...candlesLit];
    newCandles[index] = true;
    setCandlesLit(newCandles);
    
    // Small explosion on candle light
    setExplosions(prev => [...prev, {
      id: Date.now(),
      x: 20 + index * 15,
      y: 50,
      delay: 0,
      small: true
    }]);

    if (newCandles.every(c => c)) {
      setTimeout(() => {
        setBlowOut(true);
        setShowConfetti(false);
        setTimeout(() => setShowConfetti(true), 500);
      }, 1000);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setCandlesLit([false, false, false, false, false]);
    setShowConfetti(false);
    setFireworks([]);
    setExplosions([]);
    setShowGallery(false);
    setBlowOut(false);
  };

  if (!submitted) {
    return (
      <div style={styles.container}>
        <div style={styles.stars}></div>
        <div style={styles.card}>
          <div style={styles.iconFloat}>🎉</div>
          <h1 style={styles.title}>Happy Birthday!</h1>
          <p style={styles.subtitle}>Ready to celebrate?</p>
          
          <div style={styles.nameDisplay}>
            <span style={styles.nameLabel}>Celebrating:</span>
            <span style={styles.nameValue}>{name}</span>
          </div>

          {photos.length > 0 && (
            <div style={styles.photoPreview}>
              <span style={styles.previewText}>📸 {photos.length} memories loaded</span>
            </div>
          )}

          <button onClick={handleStart} style={styles.button}>
            Start Celebration 🚀
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Confetti active={showConfetti} count={100} />
      
      <div style={styles.balloonContainer}>
        {Array.from({ length: 12 }).map((_, i) => (
          <Balloon 
            key={i} 
            color={['#ff006e', '#8338ec', '#3a86ff', '#06ffa5', '#ffbe0b', '#fb5607'][i % 6]} 
            delay={i * 0.3} 
            left={5 + i * 8} 
            size={0.8 + Math.random() * 0.4}
          />
        ))}
      </div>

      {fireworks.map(fw => (
        <Firework key={fw.id} {...fw} />
      ))}

      {explosions.map(ex => (
        <ParticleExplosion key={ex.id} {...ex} />
      ))}

      <div style={styles.mainCard}>
        <h1 style={styles.celebrationTitle}>
          Happy Birthday, {name}! 
          <span style={styles.age}>🎂</span>
        </h1>
        
        <div style={styles.messageContainer}>
          <p style={styles.message}>{birthdayMessages[messageIndex]}</p>
        </div>

        <Cake3D 
          candlesLit={candlesLit} 
          onLightCandle={lightCandle}
          blowOut={blowOut}
        />

        {blowOut && (
          <div style={styles.wishBox}>
            <p style={styles.wishText}>✨ Wish Granted! ✨</p>
            <p style={styles.wishSubtext}>May all your dreams come true!</p>
          </div>
        )}

        {photos.length > 0 && (
          <button 
            style={styles.galleryButton}
            onClick={() => setShowGallery(!showGallery)}
          >
            {showGallery ? 'Hide' : 'Show'} Photo Gallery 📸
          </button>
        )}

        {showGallery && <PhotoGallery photos={photos} />}

        <button onClick={reset} style={styles.resetButton}>
          🎉 Create New Celebration
        </button>
      </div>

      <div style={styles.floatingHearts}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{...styles.heart, animationDelay: `${i * 0.5}s`}}>💖</div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflow: 'hidden',
    position: 'relative',
    perspective: '1000px'
  },
  stars: {
    position: 'fixed',
    inset: 0,
    backgroundImage: `
      radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0))
    `,
    backgroundRepeat: 'repeat',
    backgroundSize: '200px 200px',
    animation: 'twinkle 5s ease-in-out infinite',
    opacity: 0.5
  },
  card: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    padding: '3rem',
    borderRadius: '2rem',
    border: '1px solid rgba(255,255,255,0.2)',
    boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 100px rgba(131, 56, 236, 0.3)',
    textAlign: 'center',
    maxWidth: '500px',
    width: '90%',
    zIndex: 10,
    animation: 'slideIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    transform: 'translateZ(0)'
  },
  iconFloat: {
    fontSize: '5rem',
    marginBottom: '1rem',
    animation: 'float 3s ease-in-out infinite',
    filter: 'drop-shadow(0 10px 20px rgba(255,0,110,0.5))'
  },
  title: {
    fontSize: '3.5rem',
    background: 'linear-gradient(135deg, #ff006e 0%, #8338ec 50%, #3a86ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    textShadow: '0 0 30px rgba(131, 56, 236, 0.5)'
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '2rem',
    fontSize: '1.2rem'
  },
  nameDisplay: {
    background: 'rgba(255,255,255,0.1)',
    padding: '1rem 2rem',
    borderRadius: '1rem',
    marginBottom: '1rem',
    border: '1px solid rgba(255,255,255,0.2)'
  },
  nameLabel: {
    color: 'rgba(255,255,255,0.6)',
    display: 'block',
    fontSize: '0.9rem',
    marginBottom: '0.3rem'
  },
  nameValue: {
    color: 'white',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    textShadow: '0 0 20px rgba(255,0,110,0.5)'
  },
  photoPreview: {
    marginBottom: '1.5rem',
    padding: '0.8rem',
    background: 'rgba(6, 255, 165, 0.1)',
    borderRadius: '1rem',
    border: '1px solid rgba(6, 255, 165, 0.3)'
  },
  previewText: {
    color: '#06ffa5',
    fontSize: '1rem',
    fontWeight: '500'
  },
  button: {
    background: 'linear-gradient(135deg, #ff006e 0%, #8338ec 100%)',
    color: 'white',
    border: 'none',
    padding: '1.2rem 3rem',
    fontSize: '1.3rem',
    borderRadius: '2rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 10px 30px rgba(255, 0, 110, 0.4)',
    transition: 'all 0.3s',
    animation: 'pulse 2s infinite'
  },
  mainCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    padding: '2rem',
    borderRadius: '2rem',
    border: '1px solid rgba(255,255,255,0.2)',
    boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 100px rgba(131, 56, 236, 0.3)',
    textAlign: 'center',
    maxWidth: '700px',
    width: '95%',
    zIndex: 10,
    animation: 'slideIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    position: 'relative',
    overflow: 'hidden'
  },
  celebrationTitle: {
    fontSize: '2.5rem',
    color: 'white',
    marginBottom: '1rem',
    fontWeight: 'bold',
    textShadow: '0 0 20px rgba(255,255,255,0.5)'
  },
  age: {
    display: 'inline-block',
    animation: 'bounce 1s infinite'
  },
  messageContainer: {
    minHeight: '5rem',
    marginBottom: '1rem'
  },
  message: {
    fontSize: '1.4rem',
    color: 'rgba(255,255,255,0.9)',
    animation: 'fadeIn 0.5s',
    textShadow: '0 0 10px rgba(255,255,255,0.3)'
  },
  wishBox: {
    marginTop: '1.5rem',
    padding: '1.5rem',
    background: 'linear-gradient(135deg, rgba(255,0,110,0.3) 0%, rgba(131,56,236,0.3) 100%)',
    borderRadius: '1rem',
    border: '1px solid rgba(255,255,255,0.2)',
    animation: 'pulse 2s infinite'
  },
  wishText: {
    fontSize: '1.8rem',
    color: 'white',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  wishSubtext: {
    fontSize: '1.1rem',
    color: 'rgba(255,255,255,0.8)'
  },
  galleryButton: {
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.3)',
    color: 'white',
    padding: '0.8rem 1.5rem',
    borderRadius: '2rem',
    cursor: 'pointer',
    marginTop: '1rem',
    fontSize: '1rem',
    transition: 'all 0.3s'
  },
  resetButton: {
    background: 'linear-gradient(135deg, #06ffa5 0%, #00e676 100%)',
    color: '#1a1a2e',
    border: 'none',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    borderRadius: '2rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '1.5rem',
    boxShadow: '0 5px 20px rgba(6, 255, 165, 0.4)',
    transition: 'all 0.3s'
  },
  balloonContainer: {
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 1
  },
  floatingHearts: {
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 5
  },
  heart: {
    position: 'absolute',
    fontSize: '2rem',
    animation: 'floatUp 4s ease-in infinite',
    opacity: 0
  }
};