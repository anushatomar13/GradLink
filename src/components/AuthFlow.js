import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Bell, MessageSquare, Menu, X as CloseIcon
} from 'lucide-react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; 
const InstituteSelect = ({ onSelect }) => {
  const institutes = [
    "Indian Institute of Technology (IIT) Bombay",
    "Indian Institute of Technology (IIT) Delhi",
    "Indian Institute of Technology (IIT) Kanpur",
    "Indian Institute of Technology (IIT) Kharagpur",
    "Rajiv Gandhi Institute of Petroleum Technology",
    "Indian Institute of Technology (IIT) Madras",
    "Indian Institute of Technology (IIT) Roorkee",
    "Indian Institute of Science (IISc) Bangalore",
    "Jawaharlal Nehru University (JNU), New Delhi",
    "University of Delhi (DU), New Delhi",
    "Indian Institute of Management (IIM) Ahmedabad",
    "Indian Institute of Management (IIM) Bangalore",
    "Indian Institute of Management (IIM) Calcutta",
    "BITS Pilani (Birla Institute of Technology and Science)",
    "VIT University, Vellore",
    "Manipal Academy of Higher Education (MAHE), Manipal"
  ];

  return (
    <div className="max-w-md mx-auto p-8 bg-gray-800 rounded-lg shadow-xl mt-10 mb-10">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Select Your Institute</h2>
      <select
        className="w-full p-3 bg-gray-700 text-white rounded border border-cyan-400/30 focus:border-cyan-400"
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Select Institute</option>
        {institutes.map(inst => (
          <option key={inst} value={inst}>{inst}</option>
        ))}
      </select>
    </div>
  );
};

const SignupForm = ({ institute }) => {
  const navigate = useNavigate();
  const [isAlumni, setIsAlumni] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Sign Up - {institute}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-cyan-400 mb-2">Status</label>
          <select
            className="w-full p-3 bg-gray-700 text-white rounded border border-cyan-400/30"
            onChange={(e) => setIsAlumni(e.target.value === 'alumni')}
          >
            <option value="student">Current Student</option>
            <option value="alumni">Alumni</option>
          </select>
        </div>

        {isAlumni && (
          <div>
            <label className="block text-cyan-400 mb-2">Graduation Year</label>
            <input
              type="number"
              className="w-full p-3 bg-gray-700 text-white rounded border border-cyan-400/30"
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 bg-gray-700 text-white rounded border border-cyan-400/30"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-700 text-white rounded border border-cyan-400/30"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-700 text-white rounded border border-cyan-400/30"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-cyan-400 text-gray-900 rounded hover:bg-cyan-300 
                   transition-colors duration-300 font-mono"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-gray-700 text-white rounded border border-cyan-400/30"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-gray-700 text-white rounded border border-cyan-400/30"
        />
        <button
          type="submit"
          className="w-full py-3 bg-cyan-400 text-gray-900 rounded hover:bg-cyan-300 
                   transition-colors duration-300 font-mono"
        >
          Login
        </button>
      </form>
    </div>
  );
};

const Dashboard = () => {
  //const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [user, setUser] = useState(null);
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const ProfileContent = ({ isMobile = false }) => (
    <div className={`bg-gray-800 rounded-lg ${isMobile ? 'p-4' : 'p-6'} border border-cyan-400/20`}>
      <div className="text-center mb-6">
        <div className={`${isMobile ? 'w-20 h-20' : 'w-24 h-24 md:w-32 md:h-32'} mx-auto mb-4 rounded-full overflow-hidden border-4 border-cyan-400/20`}>
          <img
            src="user.jpeg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-xl font-bold text-white mb-1">{user ? user.displayName || user.email?.split("@")[0] : "Guest"}
        </h2>

        <p className="text-cyan-400 text-sm">Class of 2020</p>
        
        <p className="text-gray-400 text-sm mt-2">Software Engineer @ Tech Corp</p>
      </div>

      {!isMobile && (
        <>
          <div className="space-y-4">
            <button className="w-full py-2 px-4 bg-cyan-400 text-gray-900 rounded-lg hover:bg-cyan-300 transition-colors duration-300">
              Edit Profile
            </button>
            <button className="w-full py-2 px-4 border border-cyan-400/50 text-cyan-400 rounded-lg hover:bg-cyan-400/10 transition-colors duration-300">
              View Public Profile
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-cyan-400/20">
            <h3 className="text-white font-semibold mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-gray-700/50 rounded-lg">
                <div className="text-cyan-400 font-bold">128</div>
                <div className="text-gray-400 text-sm">Connections</div>
              </div>
              <div className="p-3 bg-gray-700/50 rounded-lg">
                <div className="text-cyan-400 font-bold">15</div>
                <div className="text-gray-400 text-sm">Events</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="bg-gray-800/50 border-b border-cyan-400/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                className="md:hidden text-cyan-400"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-40 sm:w-64 py-2 px-4 pr-10 bg-gray-800 border border-cyan-400/20 
                           text-white rounded-lg focus:outline-none focus:border-cyan-400/50"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400/50 w-4 h-4" />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <button className="relative text-cyan-400 hover:text-cyan-300">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="text-cyan-400 hover:text-cyan-300">
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`md:hidden fixed inset-0 bg-gray-900/90 z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
        <div className={`w-80 bg-gray-800 h-full overflow-y-auto transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
          <div className="p-4">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-cyan-400 hover:text-cyan-300"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>
            <ProfileContent />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative mb-6 sm:hidden">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 pr-10 bg-gray-800 border border-cyan-400/20 
                     text-white rounded-lg focus:outline-none focus:border-cyan-400/50"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400/50 w-4 h-4" />
        </div>

        <div className="md:hidden mb-6">
          <ProfileContent isMobile={true} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="hidden md:block md:col-span-3">
            <ProfileContent />
          </div>

          <div className="md:col-span-9 space-y-6">
            <div className="md:hidden grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-800 rounded-lg text-center border border-cyan-400/20">
                <div className="text-cyan-400 font-bold">128</div>
                <div className="text-gray-400 text-sm">Connections</div>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg text-center border border-cyan-400/20">
                <div className="text-cyan-400 font-bold">15</div>
                <div className="text-gray-400 text-sm">Events</div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-cyan-400/20 min-h-[527px]">
  <h3 className="text-xl font-bold text-white mb-4">
    Welcome, {user ? user.displayName || user.email?.split("@")[0] : "Guest"}!
  </h3>

  {/* Form Below Welcome Message */}
  <form className="space-y-4 text-white">
    {/* Alumni or Student Selection */}
    <div>
      <label className="block text-sm font-medium mb-2">Who are you?</label>
      <div className="flex space-x-4">
        <label className="inline-flex items-center">
          <input type="radio" name="role" value="alumni" className="form-radio text-cyan-400" />
          <span className="ml-2">Alumni</span>
        </label>
        <label className="inline-flex items-center">
          <input type="radio" name="role" value="student" className="form-radio text-cyan-400" />
          <span className="ml-2">Student</span>
        </label>
      </div>
    </div>

    {/* College Dropdown */}
    <div>
      <label className="block text-sm font-medium mb-2">Select Your College</label>
      <select className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white">
        <option value="iit_bombay">Indian Institute of Technology (IIT) Bombay</option>
    <option value="iit_delhi">Indian Institute of Technology (IIT) Delhi</option>
    <option value="iit_kanpur">Indian Institute of Technology (IIT) Kanpur</option>
    <option value="iit_kharagpur">Indian Institute of Technology (IIT) Kharagpur</option>
    <option value="rgipt">Rajiv Gandhi Institute of Petroleum Technology</option>
    <option value="iit_madras">Indian Institute of Technology (IIT) Madras</option>
    <option value="iit_roorkee">Indian Institute of Technology (IIT) Roorkee</option>
    <option value="iisc_bangalore">Indian Institute of Science (IISc) Bangalore</option>
    <option value="jnu">Jawaharlal Nehru University (JNU), New Delhi</option>
    <option value="du">University of Delhi (DU), New Delhi</option>
    <option value="iim_ahmedabad">Indian Institute of Management (IIM) Ahmedabad</option>
    <option value="iim_bangalore">Indian Institute of Management (IIM) Bangalore</option>
    <option value="iim_calcutta">Indian Institute of Management (IIM) Calcutta</option>
    <option value="bits_pilani">BITS Pilani (Birla Institute of Technology and Science)</option>
    <option value="vit_vellore">VIT University, Vellore</option>
    <option value="manipal">Manipal Academy of Higher Education (MAHE), Manipal</option>
      </select>
    </div>

    {/* Current Company/Organization */}
    <div>
      <label className="block text-sm font-medium mb-2">Current Company/Organization</label>
      <input
        type="text"
        placeholder="For example: Tech Corp, Cognizant"
        className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
      />
    </div>
    {/* Current Designation*/}
    <div>
      <label className="block text-sm font-medium mb-2">Designation</label>
      <input
        type="text"
        placeholder="For example: Junior Developer, SDE-2, etc"
        className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
      />
    </div>

    {/* Graduating Batch Dropdown */}
    <div>
      <label className="block text-sm font-medium mb-2">Graduating Batch</label>
      <select className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white">
        <option value="">Select Batch</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 rounded"
    >
      Submit
    </button>
  </form>
</div>

          
          </div>
        </div>
      </div>
    </div>
  );
};

const AuthFlow = () => {
  const [institute, setInstitute] = useState('');
  const [isNewUser, setIsNewUser] = useState(true);

  if (!institute) {
    return <InstituteSelect onSelect={setInstitute} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-md mx-auto mb-8">
        <button
          onClick={() => setIsNewUser(!isNewUser)}
          className="text-cyan-400 hover:text-cyan-300"
        >
          {isNewUser ? 'Already have an account? Login' : 'Need an account? Sign up'}
        </button>
      </div>
      {isNewUser ? <SignupForm institute={institute} /> : <LoginForm />}
    </div>
  );
};

export { AuthFlow, Dashboard };