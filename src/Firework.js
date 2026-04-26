import React, { useState, useEffect } from 'react';

export default function Firework({ x, y, color, delay, size = 1 }) {
  const [exploded, setExploded] = useState(false);
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setExploded(true);
      // Generate explosion particles
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        angle: (i / 20) * Math.PI * 2,
        velocity: 50 + Math.random() * 100,
        size: 3 + Math.random() * 4
      }));
      setParticles(newParticles);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!exploded) return null;

  return (
    <div style={{ ...styles.container, left: x, top: y }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            ...styles.particle,
            width: p.size,
            height: p.size,
            backgroundColor: color,
            boxShadow: `0 0 ${p.size * 2}px ${color}`,
            animationDelay: `${p.id * 0.02}s`,
            transform: `rotate(${p.angle}rad)`
          }}
        />
      ))}
      <div style={{ ...styles.flash, backgroundColor: color }} />
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 50,
    width: 0,
    height: 0
  },
  particle: {
    position: 'absolute',
    borderRadius: '50%',
    animation: 'explode 1.5s ease-out forwards',
    left: 0,
    top: 0
  },
  flash: {
    position: 'absolute',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    left: '-50px',
    top: '-50px',
    animation: 'flash 0.3s ease-out forwards',
    opacity: 0.8
  }
};