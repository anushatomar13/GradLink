import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [submittedData, setSubmittedData] = useState(null); // Stores submitted user details

  // Form fields
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
          const userDocRef = doc(db, "users", user.uid); // Reference to the user's document
          const userDocSnap = await getDoc(userDocRef);
  
          if (userDocSnap.exists()) {
            setSubmittedData(userDocSnap.data()); // Load stored data into state
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  // Handle form submission
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
      const userDocRef = doc(db, "users", user.uid); // Set document ID as user UID
      await setDoc(userDocRef, userData, { merge: true }); // Merge to prevent overwriting
  
      setSubmittedData(userData); // Update state with saved data
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Panel (Profile) */}
        <div className="hidden md:block md:col-span-3 bg-gray-800 p-6 rounded-lg border border-cyan-400/20">
          <h4 className="text-lg font-bold text-white mb-4">Profile</h4>
          <div className="bg-gray-800 rounded-lg p-6 border border-cyan-400/20 text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-cyan-400/20">
              <img src="user.jpeg" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">
              {user ? user.displayName || user.email?.split("@")[0] : "Guest"}
            </h2>
            <p className="text-cyan-400 text-sm">{submittedData ? `Class of ${submittedData.graduatingBatch}` : "Your Graduating Batch"}</p>
            
            <p className="text-cyan-400 text-sm mt-2">
  {submittedData ? `${submittedData.designation} @ ${submittedData.company}` : "Your current company"}
</p>
          </div>
        </div>

        {/* Main Section (Submitted Data) */}
        <div className="md:col-span-9">
          <div className="bg-gray-800 rounded-lg p-6 border border-cyan-400/20 min-h-[527px]">
            <h3 className="text-xl font-bold text-white mb-4">
              Welcome, {user ? user.displayName || user.email?.split("@")[0] : "Guest"}!
            </h3>

            {submittedData ? (
  <div className="space-y-6 text-white">
    {/* Role Box */}
    <div className="bg-gray-800 rounded-lg p-4 border border-cyan-400/20 shadow-md">
      <p><strong className="text-cyan-500">Role:</strong> {submittedData.studentOrAlumni}</p>
    </div>

    {/* College Box */}
    <div className="bg-gray-800 rounded-lg p-4 border border-cyan-400/20 shadow-md">
      <p><strong className="text-cyan-500">College:</strong> {submittedData.college}</p>
    </div>

    {/* Company Box */}
    <div className="bg-gray-800 rounded-lg p-4 border border-cyan-400/20 shadow-md">
      <p><strong className="text-cyan-500">Company:</strong> {submittedData.company}</p>
    </div>

    {/* Designation Box */}
    <div className="bg-gray-800 rounded-lg p-4 border border-cyan-400/20 shadow-md">
      <p><strong className="text-cyan-500">Designation:</strong> {submittedData.designation}</p>
    </div>

    {/* Graduating Batch Box */}
    <div className="bg-gray-800 rounded-lg p-4 border border-cyan-400/20 shadow-md">
      <p><strong className="text-cyan-500">Graduating Batch:</strong> {submittedData.graduatingBatch}</p>
    </div>

    {/* Button to Edit */}
    <button
      onClick={() => setSubmittedData(null)}
      className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 rounded transition-all"
    >
      Edit Details
    </button>
  </div>
) : (
              // Show form if no data is submitted
              <form onSubmit={onSubmit} className="space-y-6 text-white">
                
                {/* Alumni or Student Selection */}
                <div className="form-group">
                  <label className="block text-sm font-medium mb-2">Who are you?</label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="role"
                        className="form-radio text-cyan-400"
                        value="Alumni"
                        checked={studentOrAlumni === "Alumni"}
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
                        checked={studentOrAlumni === "Student"}
                        onChange={(e) => setStudentOrAlumni(e.target.value)}
                      />
                      <span className="ml-2">Student</span>
                    </label>
                  </div>
                </div>

                {/* College Dropdown */}
                <div className="form-group">
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

                {/* Company */}
                <div className="form-group">
                  <label className="block text-sm font-medium mb-2">Current Company/Organization</label>
                  <input
                    type="text"
                    placeholder="For example: Tech Corp, Cognizant"
                    className="form-control w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                {/* Designation */}
                <div className="form-group">
                  <label className="block text-sm font-medium mb-2">Designation</label>
                  <input
                    type="text"
                    placeholder="For example: Junior Developer, SDE-2, etc"
                    className="form-control w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </div>

                {/* Graduating Batch Dropdown */}
                <div className="form-group">
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

                {/* Submit Button */}
                <div className="form-group">
                  <button
                    type="submit"
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Dashboard };
