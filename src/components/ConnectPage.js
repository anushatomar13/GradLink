import React, { useEffect, useState } from 'react';
import { Briefcase, GraduationCap, UserPlus, UserCheck } from 'lucide-react';
import { db, auth } from '../firebase';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const ConnectPage = () => {
  const [filters, setFilters] = useState({ year: '', industry: '', location: '' });
  const [users, setUsers] = useState([]);
  const [currentUserUid, setCurrentUserUid] = useState(null);

  const fetchUsersAndConnections = async (uid) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const allUsers = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.id !== uid);

      const connectionDoc = await getDoc(doc(db, 'connections', uid));
      const connectionData = connectionDoc.exists() ? connectionDoc.data() : {
        sent: [],
        received: [],
        connected: [],
      };

      const usersWithStatus = allUsers.map(user => {
        const { id } = user;
        return {
          ...user,
          status: connectionData.connected.includes(id)
            ? 'connected'
            : connectionData.sent.includes(id)
            ? 'sent'
            : connectionData.received.includes(id)
            ? 'received'
            : 'none',
        };
      });

      setUsers(usersWithStatus);
    } catch (error) {
      console.error('Error fetching users and connections:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setCurrentUserUid(authUser.uid);
        fetchUsersAndConnections(authUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const sendRequest = async (targetUid) => {
    if (!currentUserUid || !targetUid) return;

    const senderRef = doc(db, 'connections', currentUserUid);
    const receiverRef = doc(db, 'connections', targetUid);

    const senderSnap = await getDoc(senderRef);
    const receiverSnap = await getDoc(receiverRef);

    if (!senderSnap.exists()) {
      await setDoc(senderRef, { sent: [], received: [], connected: [] });
    }
    if (!receiverSnap.exists()) {
      await setDoc(receiverRef, { sent: [], received: [], connected: [] });
    }

    await updateDoc(senderRef, { sent: arrayUnion(targetUid) });
    await updateDoc(receiverRef, { received: arrayUnion(currentUserUid) });

    setUsers(prev => prev.map(u => u.id === targetUid ? { ...u, status: 'sent' } : u));
  };

  const acceptRequest = async (targetUid) => {
    const myRef = doc(db, 'connections', currentUserUid);
    const theirRef = doc(db, 'connections', targetUid);

    await updateDoc(myRef, {
      received: arrayRemove(targetUid),
      connected: arrayUnion(targetUid),
    });

    await updateDoc(theirRef, {
      sent: arrayRemove(currentUserUid),
      connected: arrayUnion(currentUserUid),
    });

    setUsers(prev => prev.map(u => u.id === targetUid ? { ...u, status: 'connected' } : u));
  };

  const cancelRequest = async (targetUid) => {
    const myRef = doc(db, 'connections', currentUserUid);
    const theirRef = doc(db, 'connections', targetUid);

    await updateDoc(myRef, { sent: arrayRemove(targetUid) });
    await updateDoc(theirRef, { received: arrayRemove(currentUserUid) });

    setUsers(prev => prev.map(u => u.id === targetUid ? { ...u, status: 'none' } : u));
  };

  const removeConnection = async (targetUid) => {
    const myRef = doc(db, 'connections', currentUserUid);
    const theirRef = doc(db, 'connections', targetUid);

    await updateDoc(myRef, { connected: arrayRemove(targetUid) });
    await updateDoc(theirRef, { connected: arrayRemove(currentUserUid) });

    setUsers(prev => prev.map(u => u.id === targetUid ? { ...u, status: 'none' } : u));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search users by name, company, or role..."
              className="w-full py-3 px-4 pr-10 bg-gray-800 border border-cyan-500/30 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <select
            value={filters.year}
            onChange={e => setFilters({ ...filters, year: e.target.value })}
            className="py-2 px-3 bg-gray-800 border border-cyan-500/30 text-white rounded-xl"
          >
            <option value="">All Years</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          <select
            value={filters.industry}
            onChange={e => setFilters({ ...filters, industry: e.target.value })}
            className="py-2 px-3 bg-gray-800 border border-cyan-500/30 text-white rounded-xl"
          >
            <option value="">All Industries</option>
            <option value="Software">Software</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
          </select>
          <select
            value={filters.location}
            onChange={e => setFilters({ ...filters, location: e.target.value })}
            className="py-2 px-3 bg-gray-800 border border-cyan-500/30 text-white rounded-xl"
          >
            <option value="">All Locations</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users
            .filter(user => {
              const matchesYear = filters.year === '' || String(user.graduatingBatch) === filters.year;
              const matchesIndustry = filters.industry === '' || user.industry === filters.industry;
              const matchesLocation = filters.location === '' || user.location === filters.location;
              return matchesYear && matchesIndustry && matchesLocation;
            })
            .map(user => (
              <div
                key={user.id}
                className="bg-gradient-to-tr from-gray-800 to-gray-900 rounded-2xl p-6 border border-cyan-400/20 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'No Name Available'}
                  </h3>
                  {user.status === 'connected' ? (
                    <button onClick={() => removeConnection(user.id)} className="text-red-400 hover:text-red-300 font-medium">
                      Disconnect
                    </button>
                  ) : user.status === 'sent' ? (
                    <button onClick={() => cancelRequest(user.id)} className="text-yellow-400 hover:text-yellow-300 font-medium">
                      Cancel Request
                    </button>
                  ) : user.status === 'received' ? (
                    <button onClick={() => acceptRequest(user.id)} className="text-green-400 hover:text-green-300 font-medium">
                      Accept
                    </button>
                  ) : (
                    <button onClick={() => sendRequest(user.id)} className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      <UserPlus size={20} />
                    </button>
                  )}
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
                    <span>Class of {user.graduatingBatch || 'N/A'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <UserCheck size={16} className="text-cyan-400/70" />
                    <span>{user.designation || 'N/A'}</span>
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
