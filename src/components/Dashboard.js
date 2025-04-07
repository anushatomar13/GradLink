import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

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
  const [showConnections, setShowConnections] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) setSubmittedData(userDoc.data());

          const connDoc = await getDoc(doc(db, "connections", user.uid));
          setConnections(connDoc.exists() ? connDoc.data() : { sent: [], received: [], connected: [] });
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchConnections = async () => {
      const fetched = await Promise.all(
        connections.connected.map(async (uid) => {
          const docSnap = await getDoc(doc(db, "users", uid));
          return docSnap.exists() ? { id: uid, ...docSnap.data() } : null;
        })
      );
      setConnectedUsers(fetched.filter(Boolean));
    };
    if (connections.connected.length) fetchConnections();
  }, [connections]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    const data = { studentOrAlumni, college, company, designation, graduatingBatch };
    try {
      await setDoc(doc(db, "users", user.uid), data, { merge: true });
      setSubmittedData(data);
    } catch (err) {
      console.error("Error saving: ", err);
    }
  };

  const SectionCard = ({ label, value }) => (
    <div className="bg-[#0D1117] p-4 border border-gray-700 rounded-lg hover:shadow transition">
      <p className="text-gray-400 text-sm">{label}</p>
      <h4 className="text-white text-lg">{value || "N/A"}</h4>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#0D1117] text-white">
      <aside className="w-full md:w-1/4 bg-[#161B22] px-6 pt-10 pb-6 border-r border-[#30363D] min-h-screen">
        <div className="flex flex-col items-center text-center space-y-4 border-b border-[#30363D] pb-6 mb-6">
          <img
            src="/user.jpeg"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-cyan-500 shadow"
          />
          <h2 className="font-semibold text-xl">
            {user?.displayName || user?.email?.split("@")[0]}
          </h2>
          <p className="text-sm text-gray-400">
            {submittedData?.designation} @ {submittedData?.company}
          </p>
        </div>

        <div className="space-y-4">
          <SectionCard label="College" value={submittedData?.college} />
          <SectionCard label="Batch" value={submittedData?.graduatingBatch} />

          <div className="bg-[#0D1117] border border-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Connections</p>
            <div className="bg-[#0D1117] border border-gray-700 p-4 rounded-lg">
              <div
                className="flex justify-between items-center cursor-pointer mb-2"
                onClick={() => setShowConnections(prev => !prev)}
              >
                <p className="text-sm text-gray-400">
                  Connections ({connectedUsers.length})
                </p>
                {showConnections ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>

              <motion.div
                initial={false}
                animate={{ height: showConnections ? "auto" : 0, opacity: showConnections ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {connectedUsers.length > 0 ? (
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                    {connectedUsers.map((u) => (
                      <div key={u.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src="/user.jpeg"
                            alt={`${u.firstName} ${u.lastName}`}
                            className="w-8 h-8 rounded-full border border-gray-700"
                          />
                          <div className="flex flex-col text-sm">
                            <span className="text-white">{u.firstName} {u.lastName}</span>
                            <span className="text-gray-400 text-xs">{u.designation}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm mt-2">No connections yet</p>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-6">Welcome, {user?.displayName || "User"} 👋</h1>

          {submittedData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SectionCard label="Role" value={submittedData.studentOrAlumni} />
              <SectionCard label="College" value={submittedData.college} />
              <SectionCard label="Company" value={submittedData.company} />
              <SectionCard label="Designation" value={submittedData.designation} />
              <SectionCard label="Graduating Batch" value={submittedData.graduatingBatch} />
              <div className="col-span-1 md:col-span-2">
                <button
                  onClick={() => setSubmittedData(null)}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded-lg font-semibold transition"
                >
                  Edit Details
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
  <div>
    <label className="block mb-1 font-medium">Who are you?</label>
    <div className="flex space-x-4">
      {["Alumni", "Student"].map((role) => (
        <label key={role} className="flex items-center space-x-2">
          <input
            type="radio"
            value={role}
            checked={studentOrAlumni === role}
            onChange={(e) => {
              setStudentOrAlumni(e.target.value);
              setCompany("");
              setDesignation("");
            }}
            className="accent-cyan-500"
          />
          <span>{role}</span>
        </label>
      ))}
    </div>
  </div>

  <div>
    <label className="block mb-1 font-medium">College</label>
    <select
      value={college}
      onChange={(e) => setCollege(e.target.value)}
      className="w-full bg-[#0D1117] border border-gray-700 p-2 rounded"
    >
      <option value="">Select College</option>
      {["IIT Bombay", "IIT Delhi", "IIT Kanpur", "IIT Madras", "IIT Kharagpur"].map((name) => (
        <option key={name}>{name}</option>
      ))}
    </select>
  </div>

  {/* Company or Tech Stack Dropdown */}
  <div>
    <label className="block mb-1 font-medium">
      {studentOrAlumni === "Student" ? "Tech Stack" : "Company"}
    </label>
    <select
      value={company}
      onChange={(e) => setCompany(e.target.value)}
      className="w-full bg-[#0D1117] border border-gray-700 p-2 rounded"
    >
      <option value="">Select {studentOrAlumni === "Student" ? "Tech Stack" : "Company"}</option>
      {studentOrAlumni === "Student"
        ? ["MERN", "Java + Spring", "Python + Django", "Android", "Flutter", "Other"]
        : ["Google", "Microsoft", "Amazon", "Infosys", "TCS", "Other"]
      .map((item) => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>

    {company === "Other" && (
      <input
        type="text"
        placeholder="Enter custom value"
        className="mt-2 w-full bg-[#0D1117] border border-gray-700 p-2 rounded"
        onChange={(e) => setCompany(e.target.value)}
      />
    )}
  </div>

  {/* Designation or Looking For Dropdown */}
  <div>
    <label className="block mb-1 font-medium">
      {studentOrAlumni === "Student" ? "Looking for" : "Designation"}
    </label>
    <select
      value={designation}
      onChange={(e) => setDesignation(e.target.value)}
      className="w-full bg-[#0D1117] border border-gray-700 p-2 rounded"
    >
      <option value="">
        Select {studentOrAlumni === "Student" ? "Interest Area" : "Designation"}
      </option>
      {studentOrAlumni === "Student"
        ? ["Intern", "Research Internship", "Freelance", "Full-time", "Other"]
        : ["SDE-1", "Data Analyst", "Consultant", "Product Manager", "Other"]
      .map((item) => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>

    {designation === "Other" && (
      <input
        type="text"
        placeholder="Enter custom value"
        className="mt-2 w-full bg-[#0D1117] border border-gray-700 p-2 rounded"
        onChange={(e) => setDesignation(e.target.value)}
      />
    )}
  </div>

  <div>
    <label className="block mb-1 font-medium">Graduating Batch</label>
    <select
      value={graduatingBatch}
      onChange={(e) => setGraduatingBatch(e.target.value)}
      className="w-full bg-[#0D1117] border border-gray-700 p-2 rounded"
    >
      <option value="">Select Batch</option>
      {[2020, 2021, 2022, 2023, 2024, 2025, 2026].map((y) => (
        <option key={y}>{y}</option>
      ))}
    </select>
  </div>

  <button
    type="submit"
    className="w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded-lg font-semibold transition"
  >
    Save Details
  </button>
</form>

          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
