import React, { useState, useEffect } from 'react';
import { Terminal, Code2, Network, Cpu, Server, Sparkles } from 'lucide-react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [terminalText, setTerminalText] = useState('');
  const fullText = '> sys.about.initialize()';

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

  const metrics = [
    { icon: Network, title: 'Network Size', value: '50,000+', detail: 'connected_alumni' },
    { icon: Server, title: 'Global Reach', value: '120+', detail: 'countries_active' },
    { icon: Cpu, title: 'Collaborations', value: '1000+', detail: 'successful_partnerships' },
    { icon: Code2, title: 'Events Hosted', value: '200+', detail: 'annual_gatherings' }
  ];

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
            <h2 className="text-4xl font-bold font-mono text-cyan-400 mb-4">
              ALUMNI_NET.about()
            </h2>
            <p className="text-gray-400 font-mono">Connecting Minds, Building Futures</p>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {metrics.map(({ icon: Icon, title, value, detail }, index) => (
              <div 
                key={index}
                className="group p-6 rounded-lg bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/50 backdrop-blur-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <Icon className="w-5 h-5 text-cyan-400" />
                  <div className="ml-2 h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <h3 className="text-3xl font-mono font-bold text-white mb-1">{value}</h3>
                <p className="text-gray-400 font-mono text-sm">
                  <span className="text-cyan-400">&gt;</span> {title}
                </p>
                <p className="text-xs text-cyan-500/70 font-mono mt-1">{detail}</p>
              </div>
            ))}
          </div>

          {/* Info panels */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative p-8 rounded-lg bg-slate-800/50 border border-cyan-500/20 overflow-hidden group hover:border-cyan-500/50 transition-colors duration-300">
              <div className="absolute inset-0 bg-grid-pattern opacity-5 group-hover:opacity-10 transition-opacity" />
              <h3 className="text-2xl font-mono font-bold text-white mb-4">
                <span className="text-cyan-400">&gt;</span> Core.Mission
              </h3>
              <p className="text-gray-300 font-mono leading-relaxed">
                Facilitating seamless connections and knowledge transfer between alumni through advanced networking protocols.
              </p>
            </div>
            <div className="relative p-8 rounded-lg bg-slate-800/50 border border-cyan-500/20 overflow-hidden group hover:border-cyan-500/50 transition-colors duration-300">
              <div className="absolute inset-0 bg-grid-pattern opacity-5 group-hover:opacity-10 transition-opacity" />
              <h3 className="text-2xl font-mono font-bold text-white mb-4">
                <span className="text-cyan-400">&gt;</span> Vision.Future
              </h3>
              <p className="text-gray-300 font-mono leading-relaxed">
                Building an intelligent ecosystem that empowers alumni to achieve unprecedented professional growth.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <button className="group px-8 py-3 rounded-lg bg-cyan-500 text-white font-mono hover:bg-cyan-400 transition-all duration-300">
              join.network()
              <Sparkles className="inline-block ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;