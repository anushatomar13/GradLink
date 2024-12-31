import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900 text-cyan-400 py-8 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Main content */}
        <div className="text-center">
          {/* Terminal-style copyright */}
          <div className="font-mono mb-6">
            <span className="opacity-60">$ echo </span>
            <span>"© {currentYear} Alumni_Portal.exe"</span>
          </div>

          {/* Navigation links */}
          <div className="flex justify-center items-center gap-8 mb-6">
            {[
              { href: '/privacy', label: 'Privacy_Policy' },
              { href: '/terms', label: 'Terms_of_Use' },
              { href: '/contact', label: 'Contact_Us' },
              { href: '/support', label: 'Support' }
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative font-mono text-sm"
              >
                <span className="inline-block transition-transform group-hover:-translate-y-1 duration-200">
                  &lt;{link.label} /&gt;
                </span>
                <span className="absolute bottom-0 left-0 w-full h-px bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </a>
            ))}
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-6 mb-6">
            {['GitHub', 'LinkedIn', 'Twitter', 'Discord'].map((platform) => (
              <a
                key={platform}
                href={`#${platform.toLowerCase()}`}
                className="w-10 h-10 rounded-sm border border-cyan-400/30 flex items-center justify-center hover:bg-cyan-400/10 transition-colors duration-200"
              >
                <span className="font-mono text-xs">{platform[0]}</span>
              </a>
            ))}
          </div>

          {/* Tech-style status message */}
          <div className="font-mono text-xs text-cyan-400/60">
            <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse mr-2" />
            system_status: online | server_location: global_network
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute bottom-0 left-0 w-16 h-16 border-l border-b border-cyan-400/20" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r border-b border-cyan-400/20" />
      </div>
    </footer>
  );
};

export default Footer;