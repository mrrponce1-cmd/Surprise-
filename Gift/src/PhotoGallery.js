import React, { useState, useRef } from 'react';

export default function PhotoGallery({ photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [ripples, setRipples] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(null);

  if (photos.length === 0) return null;

  const handlePhotoClick = (e, photo, index) => {
    e.stopPropagation();
    
    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
      index
    };
    
    setRipples(prev => [...prev, newRipple]);
    setClickedIndex(index);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);

    // Create floating hearts
    const newHearts = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 50,
      y: y,
      delay: i * 100,
      emoji: ['❤️', '💖', '💕', '💗', '💝'][Math.floor(Math.random() * 5)]
    }));
    
    setHearts(prev => [...prev, ...newHearts]);
    
    setTimeout(() => {
      setHearts(prev => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
    }, 1500);

    // Open modal after effect
    setTimeout(() => {
      setSelectedPhoto(photo);
      setClickedIndex(null);
    }, 300);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>📸 Memory Lane</h3>
      <div style={styles.grid}>
        {photos.map((photo, index) => (
          <div 
            key={index} 
            style={{
              ...styles.photoWrapper,
              transform: clickedIndex === index ? 'scale(0.95)' : 'scale(1)',
              boxShadow: clickedIndex === index 
                ? '0 0 30px rgba(255,0,110,0.8)' 
                : '0 4px 15px rgba(0,0,0,0.3)'
            }}
            onClick={(e) => handlePhotoClick(e, photo, index)}
          >
            <img 
              src={photo} 
              alt={`Memory ${index + 1}`} 
              style={styles.photo}
            />
            
            {/* Ripple effects */}
            {ripples.filter(r => r.index === index).map(ripple => (
              <span
                key={ripple.id}
                style={{
                  ...styles.ripple,
                  left: ripple.x,
                  top: ripple.y
                }}
              />
            ))}
            
            {/* Floating hearts on click */}
            {hearts.filter((_, i) => Math.floor(i / 5) === Math.floor(ripples.find(r => r.index === index)?.id / 5)).map(heart => (
              <span
                key={heart.id}
                style={{
                  ...styles.floatingHeart,
                  left: heart.x,
                  top: heart.y,
                  animationDelay: `${heart.delay}ms`
                }}
              >
                {heart.emoji}
              </span>
            ))}
            
            <div style={styles.overlay}>
              <span style={styles.viewIcon}>✨ Click Me!</span>
            </div>
            
            <div style={styles.numberBadge}>{index + 1}</div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div 
          style={styles.modal} 
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            style={styles.modalContent} 
            onClick={e => e.stopPropagation()}
          >
            <img 
              src={selectedPhoto} 
              alt="Selected" 
              style={styles.modalImage} 
            />
            <div style={styles.modalEffects}>
              <span style={styles.sparkle}>✨</span>
              <span style={styles.sparkle}>🌟</span>
              <span style={styles.sparkle}>💫</span>
            </div>
            <button 
              style={styles.closeButton}
              onClick={() => setSelectedPhoto(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    marginTop: '2rem',
    padding: '1.5rem',
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '1rem',
    animation: 'slideUp 0.5s ease-out',
    position: 'relative',
    overflow: 'hidden'
  },
  title: {
    color: 'white',
    marginBottom: '1rem',
    fontSize: '1.3rem',
    textAlign: 'center'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '1rem'
  },
  photoWrapper: {
    position: 'relative',
    aspectRatio: '1',
    borderRadius: '1rem',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    border: '2px solid transparent'
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s'
  },
  ripple: {
    position: 'absolute',
    width: '20px',
    height: '20px',
    background: 'rgba(255,255,255,0.6)',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    animation: 'rippleEffect 0.6s ease-out',
    pointerEvents: 'none'
  },
  floatingHeart: {
    position: 'absolute',
    fontSize: '1.2rem',
    pointerEvents: 'none',
    animation: 'heartFloat 1s ease-out forwards',
    zIndex: 10
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: '10px',
    opacity: 0,
    transition: 'opacity 0.3s'
  },
  viewIcon: {
    color: 'white',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
  },
  numberBadge: {
    position: 'absolute',
    top: '8px',
    left: '8px',
    background: 'linear-gradient(135deg, #ff006e, #8338ec)',
    color: 'white',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
  },
  modal: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.3s',
    backdropFilter: 'blur(10px)'
  },
  modalContent: {
    position: 'relative',
    maxWidth: '90vw',
    maxHeight: '90vh',
    animation: 'zoomIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  modalImage: {
    maxWidth: '100%',
    maxHeight: '85vh',
    borderRadius: '1rem',
    boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 100px rgba(255,0,110,0.3)',
    border: '3px solid rgba(255,255,255,0.1)'
  },
  modalEffects: {
    position: 'absolute',
    top: '-50px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '20px',
    fontSize: '2rem'
  },
  sparkle: {
    animation: 'sparkle 1s ease-in-out infinite',
    animationDelay: '0s',
    filter: 'drop-shadow(0 0 10px gold)'
  },
  closeButton: {
    position: 'absolute',
    top: '-60px',
    right: '0',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: 'white',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    fontSize: '1.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s',
    backdropFilter: 'blur(10px)'
  }
};