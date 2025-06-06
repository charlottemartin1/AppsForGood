import React from 'react';

function Home() {
  return (
    <section className="min-h-screen grid md:grid-cols-2">
      {/* Pendulum Section */}
      <div className="relative h-[50vh] md:h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="ph1.jpg"
            alt="Physics Lab"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative">
          <div 
            className="w-2 h-40 bg-blue-400 rounded-full origin-top"
            style={{
              animation: 'pendulumSwing 2s ease-in-out infinite',
              transformOrigin: 'top center'
            }}
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full absolute -bottom-4 left-1/2 transform -translate-x-1/2"></div>
          </div>
        </div>
        
      </div>

      {/* Science Lab Section */}
      <div className="relative h-[50vh] md:h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="ph2.jpg"
            alt="Science Lab"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        {/* Animated Bubbles */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-8 h-8 bg-blue-400/30 rounded-full"
            style={{
              animation: `bubbleFloat ${2 + i}s ease-in-out infinite`,
              top: `${20 + i * 15}%`,
              left: `${20 + i * 15}%`
            }}
          />
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Learn. Explore. <span className="text-blue-400">Eureka!</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-100 mb-8 leading-relaxed drop-shadow-lg">
            Learn faster than the speed of light.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;