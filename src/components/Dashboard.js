import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [connections, setConnections] = useState({ sent: [], received: [], connected: [] });
  const [connectedUsers, setConnectedUsers] = useState([]);

  const [studentOrAlumni, setStudentOrAlumni] = useState("");
  const [college, setCollege] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [graduatingBatch, setGraduatingBatch] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setSubmittedData(userDocSnap.data());
          }

          const connectionRef = doc(db, "connections", user.uid);
          const connectionSnap = await getDoc(connectionRef);

          if (connectionSnap.exists()) {
            setConnections(connectionSnap.data());
          } else {
            setConnections({ sent: [], received: [], connected: [] });
          }
        } catch (error) {
          console.error("Error fetching user or connection data:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchConnectedUsers = async () => {
      if (connections.connected.length > 0) {
        const fetched = await Promise.all(
          connections.connected.map(async (uid) => {
            const docSnap = await getDoc(doc(db, "users", uid));
            return docSnap.exists() ? { id: uid, ...docSnap.data() } : null;
          })
        );
        setConnectedUsers(fetched.filter(Boolean));
      }
    };

    fetchConnectedUsers();
  }, [connections]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("No user is logged in.");
      return;
    }

    const userData = {
      studentOrAlumni,
      college,
      company,
      designation,
      graduatingBatch,
    };

    try {
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, userData, { merge: true });
      setSubmittedData(userData);
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Left Panel */}
        <div className="hidden md:block md:col-span-3 bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-2xl border border-cyan-400/30 shadow-lg">
          <h4 className="text-lg font-semibold text-white mb-4 text-center">Your Profile</h4>

          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-cyan-500 shadow-md">
              <img src="user.jpeg" alt="Profile" className="w-full h-full object-cover" />
            </div>

            <h2 className="text-xl font-bold text-white mt-4">
              {user ? (user.displayName || user.email?.split("@")[0]) : "Guest"}
            </h2>
          </div>

          <div className="mt-6 space-y-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-cyan-500/20 text-center shadow-md">
              <p className="text-lg text-gray-300 font-medium underline">College</p>
              <h3 className="text-sm font-semibold text-white">{submittedData?.college || "Your College"}</h3>
              <p className="text-sm text-gray-300 font-medium mt-2 underline">Graduating Batch</p>
              <h4 className="text-md font-semibold text-cyan-400">{submittedData?.graduatingBatch || "Your Batch"}</h4>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-cyan-500/20 text-center shadow-md">
              <p className="text-sm text-cyan-400 font-medium">
                {submittedData ? `${submittedData.designation} @ ${submittedData.company}` : "Your current company"}
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-cyan-500/20 shadow-md">
              <h4 className="text-white text-sm font-semibold mb-2 text-center">Your Connections</h4>
              <ul className="text-cyan-400 text-sm text-center">
                {connectedUsers.length > 0 ? (
                  connectedUsers.map(u => (
                    <li key={u.id}>{u.firstName} {u.lastName}</li>
                  ))
                ) : (
                  <li>No connections yet</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="md:col-span-9">
          <div className="bg-gray-800 rounded-lg p-6 border border-cyan-400/20 min-h-[527px]">
            <h3 className="text-xl font-bold text-white mb-4">
              Welcome, {user ? user.displayName || user.email?.split("@")[0] : "Guest"}!
            </h3>

            {submittedData ? (
              <div className="space-y-6 text-white">
                {[ 
                  { label: "Role", value: submittedData.studentOrAlumni },
                  { label: "College", value: submittedData.college },
                  { label: "Company", value: submittedData.company },
                  { label: "Designation", value: submittedData.designation },
                  { label: "Graduating Batch", value: submittedData.graduatingBatch },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-800 rounded-lg p-4 border border-cyan-400/20 shadow-md">
                    <p><strong className="text-cyan-500">{item.label}:</strong> {item.value}</p>
                  </div>
                ))}

                <button
                  onClick={() => setSubmittedData(null)}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 rounded transition-all"
                >
                  Edit Details
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6 text-white">
                <div className="form-group">
                  <label className="block text-sm font-medium mb-2">Who are you?</label>
                  <div className="flex space-x-4">
                    {["Alumni", "Student"].map(role => (
                      <label key={role} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="role"
                          className="form-radio text-cyan-400"
                          value={role}
                          checked={studentOrAlumni === role}
                          onChange={(e) => setStudentOrAlumni(e.target.value)}
                        />
                        <span className="ml-2">{role}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium mb-2">Select Your College</label>
                  <select
                    className="form-control w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                  >
                    <option value="">Select College</option>
                    <option>IIT Bombay</option>
                    <option>IIT Delhi</option>
                    <option>IIT Kanpur</option>
                    <option>IIT Madras</option>
                    <option>IIT Kharagpur</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium mb-2">
                    {studentOrAlumni === "Student" ? "Tech Stack" : "Current Company"}
                  </label>
                  <input
                    type="text"
                    placeholder="Example: Cognizant, TCS..."
                    className="form-control w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium mb-2">
                    {studentOrAlumni === "Student" ? "What are you looking for?" : "Designation"}
                  </label>
                  <input
                    type="text"
                    placeholder="Example: SDE-1, Junior Developer"
                    className="form-control w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium mb-2">Graduating Batch</label>
                  <select
                    className="form-control w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
                    value={graduatingBatch}
                    onChange={(e) => setGraduatingBatch(e.target.value)}
                  >
                    <option value="">Select Batch</option>
                    {[2020, 2021, 2022, 2023, 2024].map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 rounded transition-all"
                >
                  Save Details
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
