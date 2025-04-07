import React, { useEffect, useState } from 'react';
import { Search, Briefcase, GraduationCap, UserPlus, UserCheck } from 'lucide-react';
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

    await updateDoc(senderRef, {
      sent: arrayUnion(targetUid),
    });

    await updateDoc(receiverRef, {
      received: arrayUnion(currentUserUid),
    });

    setUsers(prev =>
      prev.map(u =>
        u.id === targetUid ? { ...u, status: 'sent' } : u
      )
    );
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

    setUsers(prev =>
      prev.map(u =>
        u.id === targetUid ? { ...u, status: 'connected' } : u
      )
    );
  };

  const cancelRequest = async (targetUid) => {
    const myRef = doc(db, 'connections', currentUserUid);
    const theirRef = doc(db, 'connections', targetUid);

    await updateDoc(myRef, {
      sent: arrayRemove(targetUid),
    });

    await updateDoc(theirRef, {
      received: arrayRemove(currentUserUid),
    });

    setUsers(prev =>
      prev.map(u =>
        u.id === targetUid ? { ...u, status: 'none' } : u
      )
    );
  };

  const removeConnection = async (targetUid) => {
    const myRef = doc(db, "connections", currentUserUid);
    const theirRef = doc(db, "connections", targetUid);
  
    await updateDoc(myRef, {
      connected: arrayRemove(targetUid),
    });
  
    await updateDoc(theirRef, {
      connected: arrayRemove(currentUserUid),
    });
  
    setUsers(prev =>
      prev.map(u =>
        u.id === targetUid ? { ...u, status: "none" } : u
      )
    );
  };
  

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
                    {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'No Name Available'}
                  </h3>
                </div>
                {user.status === 'connected' ? (
  <button
    onClick={() => removeConnection(user.id)}
    className="text-red-400 hover:text-red-300 transition-colors duration-300"
  >
    Disconnect
  </button>

                ) : user.status === 'sent' ? (
                  <button
                    onClick={() => cancelRequest(user.id)}
                    className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
                  >
                    Cancel Request
                  </button>
                ) : user.status === 'received' ? (
                  <button
                    onClick={() => acceptRequest(user.id)}
                    className="text-green-300 hover:text-green-200 transition-colors duration-300"
                  >
                    Accept
                  </button>
                ) : (
                  <button
                    onClick={() => sendRequest(user.id)}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                  >
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
