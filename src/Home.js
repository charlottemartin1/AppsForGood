import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home() {
  const navigate = useNavigate();
React.useEffect(() => {
    document.body.style.backgroundColor = '#e3cfe8';
    return () => {
        document.body.style.backgroundColor = '';
    };
}, []);

 // Create particle effect
 const particlesContainer = document.getElementById('particles-container');
 const particleCount = 80;
 
 // Create particles
 for (let i = 0; i < particleCount; i++) {
     createParticle();
 }
 
 function createParticle() {
     const particle = document.createElement('div');
     particle.className = 'particle';
     
     // Random size (small)
     const size = Math.random() * 3 + 1;
     particle.style.width = `${size}px`;
     particle.style.height = `${size}px`;
     
     // Initial position
     resetParticle(particle);
     
     particlesContainer.appendChild(particle);
     
     // Animate
     animateParticle(particle);
 }
 
 function resetParticle(particle) {
     // Random position
     const posX = Math.random() * 100;
     const posY = Math.random() * 100;
     
     particle.style.left = `${posX}%`;
     particle.style.top = `${posY}%`;
     particle.style.opacity = '0';
     
     return {
         x: posX,
         y: posY
     };
 }
 
 function animateParticle(particle) {
     // Initial position
     const pos = resetParticle(particle);
     
     // Random animation properties
     const duration = Math.random() * 10 + 10;
     const delay = Math.random() * 5;
     
     // Animate with GSAP-like timing
     setTimeout(() => {
         particle.style.transition = `all ${duration}s linear`;
         particle.style.opacity = Math.random() * 0.3 + 0.1;
         
         // Move in a slight direction
         const moveX = pos.x + (Math.random() * 20 - 10);
         const moveY = pos.y - Math.random() * 30; // Move upwards
         
         particle.style.left = `${moveX}%`;
         particle.style.top = `${moveY}%`;
         
         // Reset after animation completes
         setTimeout(() => {
             animateParticle(particle);
         }, duration * 1000);
     }, delay * 1000);
 }
 
 // Mouse interaction
 document.addEventListener('mousemove', (e) => {
     // Create particles at mouse position
     const mouseX = (e.clientX / window.innerWidth) * 100;
     const mouseY = (e.clientY / window.innerHeight) * 100;
     
     // Create temporary particle
     const particle = document.createElement('div');
     particle.className = 'particle';
     
     // Small size
     const size = Math.random() * 4 + 2;
     particle.style.width = `${size}px`;
     particle.style.height = `${size}px`;
     
     // Position at mouse
     particle.style.left = `${mouseX}%`;
     particle.style.top = `${mouseY}%`;
     particle.style.opacity = '0.6';
     
     particlesContainer.appendChild(particle);
     
     // Animate outward
     setTimeout(() => {
         particle.style.transition = 'all 2s ease-out';
         particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
         particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
         particle.style.opacity = '0';
         
         // Remove after animation
         setTimeout(() => {
             particle.remove();
         }, 2000);
     }, 10);
     
     // Subtle movement of gradient spheres
     const spheres = document.querySelectorAll('.gradient-sphere');
     const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
     const moveY = (e.clientY / window.innerHeight - 0.5) * 5;
     
     spheres.forEach(sphere => {
         const currentTransform = getComputedStyle(sphere).transform;
         sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
     });
 });
 
  return (
    <>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Welcome to the Home Page</h1>
        <button
          style={{
            margin: '9px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#a68bad',
            padding: '20px 40px',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/topics')}
        >
          Topics
        </button>
        <button
          style={{
            margin: '9px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#a68bad',
            padding: '20px 40px',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/settings')}
        >
          Settings
        </button>
        <button
          style={{
            margin: '9px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#a68bad',
            padding: '20px 40px',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/awards')}
        >
          Awards
        </button>
      </div>

      <body>
    <div class="gradient-background">
        <div class="gradient-sphere sphere-1"></div>
        <div class="gradient-sphere sphere-2"></div>
        <div class="gradient-sphere sphere-3"></div>
        <div class="glow"></div>
        <div class="grid-overlay"></div>
        <div class="noise-overlay"></div>
        <div class="particles-container" id="particles-container"></div>
    </div>

    <div class="content-container">
        <h1>Modern Gradient</h1>
        <p>A sleek, modern background with soft gradient spheres, subtle movement, and interactive particle effects. Perfect for contemporary web designs.</p>
        <button class="btn">Explore More</button>
    </div>
</body>
    </>


  );
}

export default Home;