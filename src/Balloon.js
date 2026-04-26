import React from 'react';

export default function Balloon({ color, delay, left, size = 1 }) {
  const width = 60 * size;
  const height = 75 * size;
  
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '-150px',
        left: `${left}%`,
        width: width,
        height: height,
        animation: `rise ${6 + Math.random() * 4}s linear ${delay}s forwards, 
                    sway ${3 + Math.random() * 2}s ease-in-out ${delay}s infinite`,
        zIndex: Math.floor(Math.random() * 10)
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
          background: `radial-gradient(circle at 30% 30%, ${color}, ${darkenColor(color, 40)})`,
          boxShadow: `
            inset -10px -10px 20px rgba(0,0,0,0.2),
            inset 10px 10px 20px rgba(255,255,255,0.3),
            0 5px 15px rgba(0,0,0,0.2)
          `,
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '15%',
            left: '20%',
            width: '25%',
            height: '15%',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.4)',
            filter: 'blur(2px)'
          }}
        />
      </div>
      <div 
        style={{
          position: 'absolute',
          bottom: -height * 0.4,
          left: '50%',
          width: '2px',
          height: height * 0.4,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)',
          transform: 'translateX(-50%)'
        }}
      />
    </div>
  );
}

function darkenColor(color, percent) {
  const num = parseInt(color.replace("#",""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = (num >> 8 & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;
  return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}
