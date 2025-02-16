import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { auth } from "../firebase"; // ✅ Import Firebase auth
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal"; // ✅ Import the authentication modal

const Navbar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <nav className="relative bg-gray-900/95 backdrop-blur-sm text-cyan-400 py-3">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="font-mono text-xl text-cyan-400">ALUMNI_NET</a>
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          {["Dashboard", "Events", "Connect", "About", "Donate"].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-sm hover:text-cyan-300"
            >
              {item}
            </a>
          ))}
        </div>
        
        {/* Authentication */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm">Hi, {user.displayName || user.email.split("@")[0]}</span>
              <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300">
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="text-sm text-cyan-400 hover:text-cyan-300"
            >
              Login/SignUp
            </button>
          )}
        </div>
      </div>

      {/* Search Input */}
      <div className="absolute right-4 top-3">
        <input
          type="text"
          placeholder="Search Alumni..."
          className="w-64 py-2 px-4 pr-10 bg-gray-800 border border-cyan-400 text-white text-sm"
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
      </div>

      {/* Authentication Modal */}
      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
    </nav>
  );
};

export default Navbar;
