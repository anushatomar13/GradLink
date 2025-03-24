import React, { useEffect, useState } from 'react';
import { Search, MapPin, Briefcase, GraduationCap, UserPlus, UserCheck } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const ConnectPage = () => {
  const [filters, setFilters] = useState({ year: '', industry: '', location: '' });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 pt-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search users by name, company, or role..."
              className="w-full py-3 px-4 pr-10 bg-gray-800 border border-cyan-400/20 text-white rounded-lg focus:outline-none focus:border-cyan-400/50"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400/50 w-5 h-5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
  <div key={user.id} className="bg-gray-800 rounded-lg p-6 border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300">
    <div className="flex items-start justify-between mb-4">
      <div>
      <h3 className="text-lg font-semibold text-white">
  {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "No Name Available"}
</h3>

      </div>
      <button className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
        <UserPlus size={20} />
      </button>
    </div>

    <div className="space-y-2 text-sm text-gray-400">
      {user.company && (
        <div className="flex items-center space-x-2">
          <Briefcase size={16} className="text-cyan-400/70" />
          <span>{user.company}</span>
        </div>
      )}
      <div className="flex items-center space-x-2">
        <GraduationCap size={16} className="text-cyan-400/70" />
        <span>Class of {user.graduatingBatch || "N/A"}</span>
      </div>
      <div className="flex items-center space-x-2">
  <UserCheck size={16} className="text-cyan-400/70" />
  <span>{user.designation || "N/A"}</span>
</div>

    </div>
  </div>
))}

        </div>
      </div>
    </div>
  );
};

export default ConnectPage;
