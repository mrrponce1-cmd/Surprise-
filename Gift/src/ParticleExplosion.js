import React, { useEffect, useState } from 'react';

export default function ParticleExplosion({ x, y, delay, small = false }) {
  const [active, setActive] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!active) return null;

  const particleCount = small ? 12 : 30;
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    angle: (i / particleCount) * Math.PI * 2,
    distance: small ? 30 + Math.random() * 30 : 50 + Math.random() * 100,
    size: small ? 4 : 6 + Math.random() * 6,
    color: ['#ff006e', '#8338ec', '#3a86ff', '#06ffa5', '#ffbe0b'][Math.floor(Math.random() * 5)]
  }));

  return (
    <div style={{ ...styles.container, left: `${x}%`, top: `${y}%` }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            ...styles.particle,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            transform: `rotate(${p.angle}rad)`,
            animationDuration: small ? '0.6s' : '1s'
          }}
        />
      ))}
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 60,
    width: 0,
    height: 0
  },
  particle: {
    position: 'absolute',
    borderRadius: '50%',
    left: 0,
    top: 0,
    animation: 'particleBurst ease-out forwards'
  }
};