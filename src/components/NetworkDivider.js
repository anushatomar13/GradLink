import React from 'react';

const NetworkDivider = () => {
  return (
    <div className="relative h-24 bg-gray-900 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Center line with nodes */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
        <div className="relative max-w-6xl mx-auto px-4">
          {/* Horizontal line */}
          <div className="absolute left-4 right-4 h-px bg-cyan-400/30" />
          
          {/* Animated nodes */}
          <div className="relative flex justify-between max-w-lg mx-auto">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="relative">
                <div 
                  className="w-3 h-3 rounded-full bg-cyan-400/80 
                           shadow-[0_0_8px_rgba(0,255,255,0.5)]
                           animate-pulse"
                  style={{
                    animationDelay: `${i * 200}ms`
                  }}
                />
                <div 
                  className="absolute top-0 left-0 w-3 h-3 rounded-full 
                           border border-cyan-400/50
                           animate-ping"
                  style={{
                    animationDuration: '3s',
                    animationDelay: `${i * 200}ms`
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Terminal-style text */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 
                    font-mono text-cyan-400/60 text-sm">
        <span className="opacity-60">$</span> connecting_sections...
      </div>

      {/* Side decorative elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-cyan-400/50 to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-l from-cyan-400/50 to-transparent" />
    </div>
  );
};

export default NetworkDivider;