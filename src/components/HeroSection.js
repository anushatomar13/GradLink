import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useAuth0 } from "@auth0/auth0-react";


const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: 'smooth' });
};

const HeroSection = () => {
  //const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';

      particles.forEach((particle, i) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative h-screen bg-gray-900 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8 inline-block">
            <div className="text-cyan-400 font-mono mb-2 animate-pulse">
              $ initiating_system_connection...
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white 
                         [text-shadow:0_0_10px_rgba(0,255,255,0.5)] mb-4
                         bg-clip-text text-transparent bg-gradient-to-r 
                         from-cyan-400 to-blue-500">
              Connect. Collaborate. Excel.
            </h1>
            <div className="text-cyan-400 font-mono animate-pulse">
              $ connection_established
            </div>
          </div>

          <p className="text-xl text-cyan-100 mb-12 max-w-2xl mx-auto
                     [text-shadow:0_0_5px_rgba(0,255,255,0.3)]">
            Welcome to your next-gen alumni portal — where innovation meets networking.
          </p>

          <div className="flex flex-wrap justify-center gap-6">

          {/* {isAuthenticated ? (
            
  <button
    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
    className="group relative px-8 py-4 bg-transparent border border-cyan-400 text-cyan-400 
               hover:bg-cyan-400 hover:text-gray-900 transition-all duration-1000
               overflow-hidden font-mono"
  >
    <div
      className="absolute inset-0 w-1 bg-cyan-400 transition-all duration-300
                 group-hover:w-full -z-10"
    />
    &lt;Log_Out /&gt;
  </button>
) : (
  <button
    onClick={() => {
      loginWithRedirect();
      navigate('/auth');
    }}
    className="group relative px-8 py-4 bg-transparent border border-cyan-400 text-cyan-400 
               hover:bg-cyan-400 hover:text-gray-900 transition-all duration-1000
               overflow-hidden font-mono"
  >
    <div
      className="absolute inset-0 w-1 bg-cyan-400 transition-all duration-300
                 group-hover:w-full -z-10"
    />
    &lt;Join_Network /&gt;
  </button>
)} */}
 <button className="group relative px-8 py-4 bg-transparent border border-cyan-400 text-cyan-400 
                           hover:bg-cyan-400 hover:text-gray-900 transition-all duration-1000
                           overflow-hidden font-mono" onClick={() => navigate('/auth')}>
              <div className="absolute inset-0 w-1 bg-cyan-400 transition-all duration-300
                           group-hover:w-full -z-10" />
              &lt;Join_Network /&gt;
            </button>

            <button className="group relative px-8 py-4 bg-cyan-400 text-gray-900 
                           hover:bg-cyan-300 transition-all duration-300
                           font-mono" onClick={() => scrollToSection('features')}>
              &lt;Explore_Hub /&gt;
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-400 animate-pulse" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-cyan-400 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-cyan-400 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyan-400 animate-pulse" />
    </div>
  );
};

export default HeroSection;