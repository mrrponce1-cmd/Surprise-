import React from 'react';

export default function Cake3D({ candlesLit, onLightCandle, blowOut }) {
  return (
    <div style={styles.container}>
      <div style={styles.cake}>
        {/* Cake layers */}
        <div style={styles.layer3}>
          {blowOut && <div style={styles.blowSmoke}>💨</div>}
        </div>
        <div style={styles.layer2} />
        <div style={styles.layer1} />
        
        {/* Plate */}
        <div style={styles.plate} />
        
        {/* Candles */}
        <div style={styles.candlesContainer}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                ...styles.candle,
                left: `${15 + i * 17}%`,
                bottom: '100%'
              }}
              onClick={() => onLightCandle(i)}
            >
              <div style={styles.candleBody} />
              <div 
                style={{
                  ...styles.flame,
                  opacity: candlesLit[i] && !blowOut ? 1 : 0,
                  animation: candlesLit[i] && !blowOut ? 'flicker 0.5s infinite alternate' : 'none'
                }}
              >
                <div style={styles.flameInner} />
              </div>
              {!candlesLit[i] && !blowOut && (
                <div style={styles.clickHint}>👆</div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {blowOut && (
        <div style={styles.celebrateText}>
          🎊 HOORAY! 🎊
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    margin: '1rem 0',
    position: 'relative'
  },
  cake: {
    position: 'relative',
    width: '240px',
    height: '160px',
    margin: '0 auto',
    transform: 'perspective(1000px) rotateX(10deg)',
    animation: 'cakeFloat 3s ease-in-out infinite'
  },
  layer1: {
    position: 'absolute',
    bottom: 0,
    left: '10%',
    width: '80%',
    height: '50px',
    background: 'linear-gradient(to bottom, #8B4513, #654321)',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
  },
  layer2: {
    position: 'absolute',
    bottom: '45px',
    left: '15%',
    width: '70%',
    height: '40px',
    background: 'linear-gradient(to bottom, #D2691E, #8B4513)',
    borderRadius: '10px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.2)'
  },
  layer3: {
    position: 'absolute',
    bottom: '80px',
    left: '20%',
    width: '60%',
    height: '35px',
    background: 'linear-gradient(to bottom, #F4A460, #D2691E)',
    borderRadius: '10px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.2)'
  },
  plate: {
    position: 'absolute',
    bottom: '-10px',
    left: '5%',
    width: '90%',
    height: '20px',
    background: 'linear-gradient(to bottom, #ddd, #999)',
    borderRadius: '50%',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
  },
  candlesContainer: {
    position: 'absolute',
    bottom: '90px',
    left: 0,
    width: '100%',
    height: '40px'
  },
  candle: {
    position: 'absolute',
    width: '16px',
    height: '40px',
    cursor: 'pointer',
    transition: 'transform 0.2s'
  },
  candleBody: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to right, #ff006e, #ff4081, #ff006e)',
    borderRadius: '3px',
    boxShadow: 'inset -2px 0 5px rgba(0,0,0,0.2)'
  },
  flame: {
    position: 'absolute',
    top: '-15px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '12px',
    height: '18px',
    transition: 'opacity 0.3s'
  },
  flameInner: {
    width: '100%',
    height: '100%',
    background: 'radial-gradient(ellipse at bottom, #ffeb3b 0%, #ff9800 50%, #ff5722 100%)',
    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
    boxShadow: '0 0 15px #ff9800, 0 0 30px #ff5722'
  },
  clickHint: {
    position: 'absolute',
    top: '-25px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '1rem',
    animation: 'bounce 1s infinite',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
  },
  blowSmoke: {
    position: 'absolute',
    top: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '2rem',
    animation: 'fadeOutUp 1s forwards'
  },
  celebrateText: {
    marginTop: '0.5rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#ff006e',
    textShadow: '0 0 20px rgba(255,0,110,0.5)',
    animation: 'bounce 0.5s infinite alternate'
  }
};