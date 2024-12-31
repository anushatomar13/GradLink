import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Search, Bell, MessageSquare, Calendar, Briefcase, 
    Book, Users, Award, Settings, ChevronDown, Menu, X as CloseIcon
  } from 'lucide-react';

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
  const [notifications] = useState([
    { id: 1, text: "New job posting in your field", time: "2h ago" },
    { id: 2, text: "Upcoming alumni meetup", time: "1d ago" },
  ]);
  
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
        <h2 className="text-xl font-bold text-white mb-1">Ruhi Jaiswal</h2>
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

      <div className={`md:hidden fixed inset-0 bg-gray-900/90 z-50 transition-opacity duration-300 ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className={`w-80 bg-gray-800 h-full overflow-y-auto transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
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

            <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-cyan-400/20">
              <h3 className="text-xl font-bold text-white mb-4">Recent Notifications</h3>
              <div className="space-y-4">
                {notifications.map(notif => (
                  <div key={notif.id} className="flex items-center justify-between p-3 md:p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Bell className="w-5 h-5 text-cyan-400" />
                      <div>
                        <p className="text-white text-sm md:text-base">{notif.text}</p>
                        <p className="text-gray-400 text-xs md:text-sm">{notif.time}</p>
                      </div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                { icon: Calendar, title: 'Events', desc: 'Upcoming alumni gatherings' },
                { icon: Briefcase, title: 'Jobs', desc: 'Career opportunities' },
                { icon: Book, title: 'Resources', desc: 'Learning materials' },
                { icon: Users, title: 'Network', desc: 'Connect with alumni' },
                { icon: Award, title: 'Achievements', desc: 'Your milestones' },
                { icon: Settings, title: 'Settings', desc: 'Account preferences' }
              ].map((feature, i) => (
                <button key={i} className="p-4 md:p-6 bg-gray-800 rounded-lg border border-cyan-400/20 
                                       hover:border-cyan-400/50 transition-all duration-300 
                                       text-left group">
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 mb-3 md:mb-4 
                                       group-hover:text-cyan-300 transition-colors duration-300" />
                  <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-xs md:text-sm">{feature.desc}</p>
                </button>
              ))}
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