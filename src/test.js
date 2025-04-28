import React, { useEffect, useState } from 'react';

const ScrollEffectPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textStyle = {
    opacity: 1 - scrollProgress,
    transform: `translateX(${(0.5 - scrollProgress / 2) * 100}%)`,
    transition: 'transform 0.2s, opacity 0.2s',
    fontSize: '4rem',
    fontWeight: 'bold',
    color: 'black',
    whiteSpace: 'nowrap',
  };

  return (
    <div style={{ height: '200vh', margin: 0, background: '#fff' }}>
      <div style={{
        position: 'fixed',
        top: '40%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div style={{ width: '60vw', overflow: 'hidden' }}>
          <div style={textStyle}>
            This is a fading centered scroll effect
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollEffectPage;
