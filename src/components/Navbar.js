import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { auth } from "../firebase"; // ✅ Import Firebase auth
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Logo = () => (
  <svg viewBox="0 0 100 100" className="h-10 w-10">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4FD1C5" />
        <stop offset="100%" stopColor="#63B3ED" />
      </linearGradient>
    </defs>
    <path
      d="M20 45L50 30L80 45L50 60L20 45ZM50 65L30 55V65L50 75L70 65V55L50 65Z"
      fill="url(#logoGradient)"
      className="drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]"
    />
    <path
      d="M70 55L70 65"
      stroke="url(#logoGradient)"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const Navbar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // ✅ Hook for navigation

  // 🔹 Track user login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect after logout
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <nav className="relative bg-gray-900/95 backdrop-blur-sm text-cyan-400 py-3">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between flex-wrap">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Logo />
              <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-mono text-sm hidden sm:block">
              <span className="opacity-60">sys.</span>
              <span className="text-cyan-400">ALUMNI_NET</span>
            </span>
          </a>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8 mt-3 sm:mt-0">
            {["Dashboard", "Events", "Connect", "About", "Donate"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="relative group font-mono text-sm py-2 hover:text-cyan-300 transition-colors duration-200"
              >
                <span className="relative z-10">{`<${item}/>`}</span>
                <span className="absolute -bottom-1 left-0 w-full h-px bg-cyan-400/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </a>
            ))}
          </div>

          {/* Authentication Links */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm font-mono text-cyan-400">
                  Hi, {user.displayName || user.email.split("@")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-mono text-red-400 hover:text-red-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <a
                href="/register"
                className="text-sm font-mono text-cyan-400 hover:text-cyan-300"
              >
                Login/Signup
              </a>
            )}
          </div>

          {/* Search Input */}
          <div className="relative mt-3 sm:mt-0">
            <input
              type="text"
              placeholder="Search Alumni..."
              className={`w-64 py-2 px-4 pr-10 bg-gray-800/50 
                       border border-cyan-400/20 
                       text-white font-mono text-sm
                       focus:outline-none focus:border-cyan-400/50
                       transition-all duration-200
                       ${isSearchFocused ? "shadow-[0_0_10px_rgba(0,255,255,0.1)]" : ""}`}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/50" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent shadow-[0_0_5px_rgba(0,255,255,0.3)]" />
    </nav>
  );
};


export default Navbar;
