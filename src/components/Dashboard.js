import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import {collection, addDoc} from "firebase/firestore";
import {db} from "../firebase"
import firebase from 'firebase/compat/app';


const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [studentOrAlumni, setStudentOrAlumni] = useState("")
  const [college, setCollege] = useState("")
  const [company, setCompany] = useState("")
  const [desgination, setDesignation] = useState("")
  const [graduatingBatch, setGraduatingBatch] = useState("")

  const [submittedData, setSubmittedData] = useState(null); // Store submitted details

const onSubmit = async (e) => {
  e.preventDefault();

  const userData = {
    studentOrAlumni,
    college,
    company,
    desgination,
    graduatingBatch,
  };

  try {
    await addDoc(collection(db, "users"), userData);

    // Store submitted data in state to display it
    setSubmittedData(userData);

    // Clear form inputs
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
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Panel */}
        <div className="hidden md:block md:col-span-3 bg-gray-800 p-6 rounded-lg border border-cyan-400/20">
          <h4 className="text-lg font-bold text-white mb-4">Profile</h4>
          <ProfileContent />
        </div>

        {/* Main Form Section */}
        <div className="md:col-span-9">
          <div className="bg-gray-800 rounded-lg p-6 border border-cyan-400/20 min-h-[527px]">
            <h3 className="text-xl font-bold text-white mb-4">
              Welcome, {user ? user.displayName || user.email?.split("@")[0] : "Guest"}!
            </h3>

            <form onSubmit={onSubmit} className="space-y-6 text-white">
              {/* Form Group: Alumni or Student Selection */}
              <div className="form-group">
                <label className="block text-sm font-medium mb-2">Who are you?</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="role"
                      className="form-radio text-cyan-400"
                      value={studentOrAlumni}
                      onChange={(e) => setStudentOrAlumni(e.target.value)}
                    />
                    <span className="ml-2">Alumni</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                    type="radio" 
                    name="role" className="form-radio text-cyan-400" 
                    value={studentOrAlumni}
                    onChange={(e) => setStudentOrAlumni(e.target.value)}
                    />
                    <span className="ml-2">Student</span>
                  </label>
                </div>
              </div>

              {/* Form Group: College Dropdown */}
              <div className="form-group">
                <label className="block text-sm font-medium mb-2">Select Your College</label>
                <select 
                className="form-control w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
                value={college}
                onChange={(e) =>  setCollege(e.target.value)}
                >
                  <option>Indian Institute of Technology (IIT) Bombay</option>
                  <option>Indian Institute of Technology (IIT) Delhi</option>
                  <option>Indian Institute of Technology (IIT) Kanpur</option>
                </select>
              </div>

              {/* Form Group: Current Company/Organization */}
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

              {/* Form Group: Current Designation */}
              <div className="form-group">
                <label className="block text-sm font-medium mb-2">Designation</label>
                <input
                  type="text"
                  placeholder="For example: Junior Developer, SDE-2, etc"
                  className="form-control w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
                  value={desgination}
                  onChange={(e) => setDesignation(e.target.value)}
                />
              </div>

              {/* Form Group: Graduating Batch Dropdown */}
              <div className="form-group">
                <label className="block text-sm font-medium mb-2">Graduating Batch</label>
                <select className="form-control w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
                value={graduatingBatch}
                onChange={(e) => setGraduatingBatch(e.target.value)}
                >
                  <option>Select Batch</option>
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
          </div>
        </div>
      </div>
    </div>
  );

};


export { Dashboard };