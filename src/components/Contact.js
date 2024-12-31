import React, { useState, useEffect } from 'react';
import { Terminal, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [terminalText, setTerminalText] = useState('Contacting...');

  useEffect(() => {
    setIsVisible(true);
    let index = 0;
    const typeText = () => {
      setTerminalText('Contacting...'.slice(0, index));
      index++;
      if (index <= 'Contacting...'.length) {
        setTimeout(typeText, 100);
      }
    };
    typeText();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 border border-cyan-500/20 rounded-lg transform rotate-45 animate-pulse" />
        <div className="absolute bottom-40 right-10 w-40 h-40 border border-cyan-500/20 rounded-full animate-spin-slow" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 border border-cyan-500/20 rounded-lg transform -rotate-12 animate-float" />
      </div>

      <div className="relative container mx-auto px-6 py-20">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Terminal-style header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-slate-800/50 rounded-xl p-4 mb-6 border border-cyan-500/20">
              <Terminal className="inline-block w-6 h-6 text-cyan-400 mr-2" />
              <span className="font-mono text-cyan-400">{terminalText}</span>
              <span className="animate-pulse">_</span>
            </div>
            <h2 className="text-4xl font-bold font-mono text-cyan-400 mb-4">ALUMNI_NET.contact()</h2>
            <p className="text-gray-400 font-mono">We're here to assist you!</p>
          </div>

          {/* Contact information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="group p-6 rounded-lg bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/50 backdrop-blur-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center mb-4">
                <Mail className="w-5 h-5 text-cyan-400" />
                <div className="ml-2 h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <h3 className="text-3xl font-mono font-bold text-white mb-1">Email</h3>
              <p className="text-gray-400 font-mono text-sm">
                <span className="text-cyan-400">&gt;</span> contact@alumninet.com
              </p>
            </div>
            <div className="group p-6 rounded-lg bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/50 backdrop-blur-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center mb-4">
                <Phone className="w-5 h-5 text-cyan-400" />
                <div className="ml-2 h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <h3 className="text-3xl font-mono font-bold text-white mb-1">Phone</h3>
              <p className="text-gray-400 font-mono text-sm">
                <span className="text-cyan-400">&gt;</span> +91 9284309XXX
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;