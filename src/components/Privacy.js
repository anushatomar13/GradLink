import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Lock, FileText } from 'lucide-react';

const Privacy = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [terminalText, setTerminalText] = useState('');
  const fullText = '> sys.privacy.initialize()';

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
            <h2 className="text-4xl font-bold font-mono text-cyan-400 mb-4">Privacy_Policy</h2>
            <p className="text-gray-400 font-mono">Protecting Your Data, Securing Your Future</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div
              className="relative p-8 rounded-lg bg-slate-800/50 border border-cyan-500/20 overflow-hidden group hover:border-cyan-500/50 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-5 group-hover:opacity-10 transition-opacity" />
              <h3 className="text-2xl font-mono font-bold text-white mb-4">
                <span className="text-cyan-400">&gt;</span> Data_Collection
              </h3>
              <p className="text-gray-300 font-mono leading-relaxed">
                We collect user data only with your consent. The data collected is necessary for providing our services and improving user experience.
              </p>
            </div>
            <div
              className="relative p-8 rounded-lg bg-slate-800/50 border border-cyan-500/20 overflow-hidden group hover:border-cyan-500/50 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-5 group-hover:opacity-10 transition-opacity" />
              <h3 className="text-2xl font-mono font-bold text-white mb-4">
                <span className="text-cyan-400">&gt;</span> Data_Security
              </h3>
              <p className="text-gray-300 font-mono leading-relaxed">
                We prioritize the security of your personal information using advanced encryption protocols to safeguard your data.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div
              className="relative p-8 rounded-lg bg-slate-800/50 border border-cyan-500/20 overflow-hidden group hover:border-cyan-500/50 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-5 group-hover:opacity-10 transition-opacity" />
              <h3 className="text-2xl font-mono font-bold text-white mb-4">
                <span className="text-cyan-400">&gt;</span> Data_Sharing
              </h3>
              <p className="text-gray-300 font-mono leading-relaxed">
                We do not share your personal data with third parties, except where required by law or to improve our services.
              </p>
            </div>
            <div
              className="relative p-8 rounded-lg bg-slate-800/50 border border-cyan-500/20 overflow-hidden group hover:border-cyan-500/50 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-5 group-hover:opacity-10 transition-opacity" />
              <h3 className="text-2xl font-mono font-bold text-white mb-4">
                <span className="text-cyan-400">&gt;</span> User_Rights
              </h3>
              <p className="text-gray-300 font-mono leading-relaxed">
                You have the right to access, modify, and delete your personal data. You can also request data portability at any time.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <button className="group px-8 py-3 rounded-lg bg-cyan-500 text-white font-mono hover:bg-cyan-400 transition-all duration-300">
              accept_privacy()
              <Shield className="inline-block ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;