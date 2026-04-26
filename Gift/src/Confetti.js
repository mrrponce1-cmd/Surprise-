import React, { useState, useEffect } from 'react';

export default function Confetti({ active, count = 50 }) {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    if (active) {
      const shapes = ['circle', 'square', 'triangle', 'heart'];
      const newParticles = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        color: [
          '#ff006e', '#8338ec', '#3a86ff', '#06ffa5', 
          '#ffbe0b', '#fb5607', '#ff4081', '#00e676',
          '#e74c3c', '#9b59b6', '#3498db', '#1abc9c'
        ][Math.floor(Math.random() * 12)],
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 4,
        size: 8 + Math.random() * 12,
        rotation: Math.random() * 360,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        sway: Math.random() * 100 - 50
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [active, count]);

  if (!active || particles.length === 0) return null;

  const getShapeStyle = (shape, size) => {
    const base = {
      width: size,
      height: size,
      position: 'absolute'
    };
    
    switch(shape) {
      case 'circle':
        return { ...base, borderRadius: '50%' };
      case 'square':
        return { ...base, borderRadius: '2px' };
      case 'triangle':
        return {
          ...base,
          width: 0,
          height: 0,
          borderLeft: `${size/2}px solid transparent`,
          borderRight: `${size/2}px solid transparent`,
          borderBottom: `${size}px solid currentColor`,
          backgroundColor: 'transparent'
        };
      case 'heart':
        return {
          ...base,
          transform: 'rotate(-45deg)',
          borderRadius: '0 50% 0 50%'
        };
      default:
        return base;
    }
  };

  return (
    <div style={styles.container}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            ...getShapeStyle(p.shape, p.size),
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: p.shape === 'triangle' ? 'transparent' : p.color,
            color: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotation}deg)`,
            animationName: `fall${Math.floor(Math.random() * 3)}, sway`,
            opacity: 0.8 + Math.random() * 0.2
          }}
        />
      ))}
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: 100
  }
};