import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);

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
        <div className="hidden md:block md:col-span-3 bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-2xl border border-cyan-400/30 shadow-lg">
          <h4 className="text-lg font-semibold text-white mb-4 text-center">Your Profile</h4>

          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-cyan-500 shadow-md">
              <img src="user.jpeg" alt="Profile" className="w-full h-full object-cover" />
            </div>

            {/* User Name */}
            <h2 className="text-xl font-bold text-white mt-4">
  {user ? (user.displayName ? user.displayName : user.email?.split("@")[0]) : "Guest"}
</h2>

          </div>

          {/* User Details */}
          <div className="mt-6 space-y-4">
            {/* College & Batch */}
            <div className="bg-gray-800 rounded-lg p-4 border border-cyan-500/20 text-center shadow-md">
              <p className="text-lg text-gray-300 font-medium underline">College</p>
              <h3 className="text-sm font-semibold text-white">{submittedData?.college || "Your College"}</h3>

              <p className="text-sm text-gray-300 font-medium mt-2 underline">Graduating Batch</p>
              <h4 className="text-md font-semibold text-cyan-400">{submittedData?.graduatingBatch ? `${submittedData.graduatingBatch}` : "Your Batch"}</h4>
            </div>

            {/* Company & Designation */}
            <div className="bg-gray-800 rounded-lg p-4 border border-cyan-500/20 text-center shadow-md">
              <p className="text-sm text-cyan-400 font-medium">
                {submittedData ? `${submittedData.designation} @ ${submittedData.company}` : "Your current company"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Section (Form or Submitted Data) */}
        <div className="md:col-span-9">
          <div className="bg-gray-800 rounded-lg p-6 border border-cyan-400/20 min-h-[527px]">
            <h3 className="text-xl font-bold text-white mb-4">
              Welcome, {user ? user.displayName || user.email?.split("@")[0] : "Guest"}!
            </h3>

            {submittedData ? (
              <div className="space-y-6 text-white">
                {/* Display submitted data */}
                <div className="bg-gray-800 rounded-lg p-4 border border-cyan-400/20 shadow-md">
                  <p><strong className="text-cyan-500">Role:</strong> {submittedData.studentOrAlumni}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 border border-cyan-400/20 shadow-md">
                  <p><strong className="text-cyan-500">College:</strong> {submittedData.college}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 border border-cyan-400/20 shadow-md">
                  <p><strong className="text-cyan-500">Company:</strong> {submittedData.company}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 border border-cyan-400/20 shadow-md">
                  <p><strong className="text-cyan-500">Designation:</strong> {submittedData.designation}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 border border-cyan-400/20 shadow-md">
                  <p><strong className="text-cyan-500">Graduating Batch:</strong> {submittedData.graduatingBatch}</p>
                </div>

                {/* Button to Edit */}
                <button
                  onClick={() => setSubmittedData(null)} // Allows editing data
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 rounded transition-all"
                >
                  Edit Details
                </button>
              </div>
            ) : (
              // If no data is submitted, show the form
              <form onSubmit={onSubmit} className="space-y-6 text-white">
                {/* Role Selection */}
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
                    <option>Indian Institute of Technology (IIT) Madras</option>
                    <option>Indian Institute of Technology (IIT) Kharagpur</option>
                  </select>
                </div>

                {/* Other Inputs */}
                <div className="form-group">
                  <label className="block text-sm font-medium mb-2">{studentOrAlumni === "Student" ? "Tech Stack" : "Current Company"}</label>
                  <input
                    type="text"
                    placeholder="For example: Tech Corp, Cognizant"
                    className="form-control w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium mb-2">{studentOrAlumni === "Student" ? "What are you looking for?" : "Designation"}</label>
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
