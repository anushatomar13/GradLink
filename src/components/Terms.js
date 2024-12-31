import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const Terms = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [terminalText, setTerminalText] = useState('');
  const fullText = '> sys.terms.initialize()';

  useEffect(() => {
    setIsVisible(true);
    let index = 0;
    const typeText = () => {
      setTerminalText(fullText.slice(0, index));
      index++;
      if (index <= fullText.length) {
        setTimeout(typeText, 100);
      }
    };
    typeText();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 border border-cyan-500/20 rounded-lg transform rotate-45 animate-pulse" />
        <div className="absolute bottom-40 right-10 w-40 h-40 border border-cyan-500/20 rounded-full animate-spin-slow" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 border border-cyan-500/20 rounded-lg transform -rotate-12 animate-float" />
      </div>

      <div className="relative container mx-auto px-6 py-20">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

          <div className="text-center mb-16">
            <div className="inline-block bg-slate-800/50 rounded-xl p-4 mb-6 border border-cyan-500/20">
              <Terminal className="inline-block w-6 h-6 text-cyan-400 mr-2" />
              <span className="font-mono text-cyan-400">{terminalText}</span>
              <span className="animate-pulse">_</span>
            </div>
            <h2 className="text-4xl font-bold font-mono text-cyan-400 mb-4">
              ALUMNI_NET.terms()
            </h2>
            <p className="text-gray-400 font-mono">Terms of Use</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="relative p-8 rounded-lg bg-slate-800/50 border border-cyan-500/20 overflow-hidden group hover:border-cyan-500/50 transition-colors duration-300">
              <div className="absolute inset-0 bg-grid-pattern opacity-5 group-hover:opacity-10 transition-opacity" />
              <h3 className="text-2xl font-mono font-bold text-white mb-4">
                <span className="text-cyan-400">&gt;</span> User Responsibilities
              </h3>
              <p className="text-gray-300 font-mono leading-relaxed">
                Users are responsible for maintaining the confidentiality of their account and password. You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </div>
            <div className="relative p-8 rounded-lg bg-slate-800/50 border border-cyan-500/20 overflow-hidden group hover:border-cyan-500/50 transition-colors duration-300">
              <div className="absolute inset-0 bg-grid-pattern opacity-5 group-hover:opacity-10 transition-opacity" />
              <h3 className="text-2xl font-mono font-bold text-white mb-4">
                <span className="text-cyan-400">&gt;</span> Prohibited Activities
              </h3>
              <p className="text-gray-300 font-mono leading-relaxed">
                You may not use our services for any illegal or harmful activities, including but not limited to spamming, hacking, or distributing malware.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="relative p-8 rounded-lg bg-slate-800/50 border border-cyan-500/20 overflow-hidden group hover:border-cyan-500/50 transition-colors duration-300">
              <div className="absolute inset-0 bg-grid-pattern opacity-5 group-hover:opacity-10 transition-opacity" />
              <h3 className="text-2xl font-mono font-bold text-white mb-4">
                <span className="text-cyan-400">&gt;</span> Limitation of Liability
              </h3>
              <p className="text-gray-300 font-mono leading-relaxed">
                We are not liable for any indirect, incidental, or consequential damages resulting from the use of our services.
              </p>
            </div>
            <div className="relative p-8 rounded-lg bg-slate-800/50 border border-cyan-500/20 overflow-hidden group hover:border-cyan-500/50 transition-colors duration-300">
              <div className="absolute inset-0 bg-grid-pattern opacity-5 group-hover:opacity-10 transition-opacity" />
              <h3 className="text-2xl font-mono font-bold text-white mb-4">
                <span className="text-cyan-400">&gt;</span> Termination
              </h3>
              <p className="text-gray-300 font-mono leading-relaxed">
                We reserve the right to suspend or terminate your account if you violate these terms of use.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <button className="group px-8 py-3 rounded-lg bg-cyan-500 text-white font-mono hover:bg-cyan-400 transition-all duration-300">
              accept.terms()
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;