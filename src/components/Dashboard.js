import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [studentOrAlumni, setStudentOrAlumni] = useState("");
  const [college, setCollege] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState(""); // Fixed typo from "desgination"
  const [graduatingBatch, setGraduatingBatch] = useState("");
  const [submittedData, setSubmittedData] = useState(null); // Store submitted details

  const onSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      studentOrAlumni,
      college,
      company,
      designation, // Updated key to match state variable
      graduatingBatch,
    };

    try {
      await addDoc(collection(db, "users"), userData);
      setSubmittedData(userData); // Store submitted details in state
      
      // Clear form fields
      setStudentOrAlumni("");
      setCollege("");
      setCompany("");
      setDesignation("");
      setGraduatingBatch("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h3 className="text-xl font-bold text-white mb-4">
        Welcome, {user ? user.displayName || user.email?.split("@")[0] : "Guest"}!
      </h3>

      {submittedData ? (
        <div className="bg-gray-800 rounded-lg p-6 border border-cyan-400/20">
          <h3 className="text-xl font-bold text-white mb-4">Your Profile</h3>
          <p className="text-white"><strong>Role:</strong> {submittedData.studentOrAlumni}</p>
          <p className="text-white"><strong>College:</strong> {submittedData.college}</p>
          <p className="text-white"><strong>Company:</strong> {submittedData.company}</p>
          <p className="text-white"><strong>Designation:</strong> {submittedData.designation}</p>
          <p className="text-white"><strong>Graduating Batch:</strong> {submittedData.graduatingBatch}</p>
          <button 
            onClick={() => setSubmittedData(null)} 
            className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded">
            Edit Details
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-6 text-white">
          <div>
            <label className="block text-sm font-medium mb-2">Who are you?</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  className="form-radio text-cyan-400"
                  value="Alumni"
                  onChange={(e) => setStudentOrAlumni(e.target.value)}
                />
                <span className="ml-2">Alumni</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  className="form-radio text-cyan-400"
                  value="Student"
                  onChange={(e) => setStudentOrAlumni(e.target.value)}
                />
                <span className="ml-2">Student</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Select Your College</label>
            <select 
              className="form-control w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            >
              <option value="">Select College</option>
              <option>Indian Institute of Technology (IIT) Bombay</option>
              <option>Indian Institute of Technology (IIT) Delhi</option>
              <option>Indian Institute of Technology (IIT) Kanpur</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Current Company/Organization</label>
            <input
              type="text"
              className="form-control w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Designation</label>
            <input
              type="text"
              className="form-control w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Graduating Batch</label>
            <select 
              className="form-control w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
              value={graduatingBatch}
              onChange={(e) => setGraduatingBatch(e.target.value)}
            >
              <option value="">Select Batch</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 rounded"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export { Dashboard };
