import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { db} from "../firebase"; 


const Dashboard = () => {
  //const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [user, setUser] = useState(null);
  const [studentOrAlumni, setstudentOrAlumni] = useState("alumni");
  const [college, setCollege] = useState("")
  const [company, setCompany] = useState("")
  const [designation, setDesignation] = useState("")
  const [graduatingBatch, setGrraduatingBatch] = useState(2021);

  const[message, setMessage] = useState({error: false, msg:""})

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
  
    // Check if fields are empty
    if (college === "" || company === "") {
      setMessage({ error: true, msg: "All fields are mandatory" });
      return;
    }
  
    if (!user) {
      setMessage({ error: true, msg: "User not logged in!" });
      return;
    }
  
    // Create user data object
    const userData = {
      uid: user.uid,  // Unique user ID from Firebase Auth
      name: user.displayName || user.email.split("@")[0],
      email: user.email,
      studentOrAlumni,
      college,
      company,
      designation,
      graduatingBatch,
      createdAt: new Date(),
    };
  
    try {
      // Store data in Firestore under "users" collection with user ID as the document ID
      await setDoc(doc(db, "users", user.uid), userData);
  
      setMessage({ error: false, msg: "Profile updated successfully!" });
      console.log("User data saved successfully in Firestore!");
    } catch (error) {
      console.error("Error storing user data:", error);
      setMessage({ error: true, msg: "Failed to save data!" });
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

            <form onSubmit={handleSubmit} className= "space-y-6 text-white">
              {/* Form Group: Alumni or Student Selection */}
              <div className="form-group">
                <label className="block text-sm font-medium mb-2">Who are you?</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value={studentOrAlumni}
                      onChange={(e) => setstudentOrAlumni(e.target.value) }
                      className="form-radio text-cyan-400" />
                    <span className="ml-2">Alumni</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="role" value={studentOrAlumni
                    } onChange={(e) =>setstudentOrAlumni(e.target.value)} className="form-radio text-cyan-400" />
                    <span className="ml-2">Student</span>
                  </label>
                </div>
              </div>

              {/* Form Group: College Dropdown */}
              <div className="form-group">
                <label className="block text-sm font-medium mb-2">Select Your College</label>
                <select className="form-control w-full p-2 border border-gray-600 rounded bg-gray-900 text-white">
                  <option value={college}>Indian Institute of Technology (IIT) Bombay</option>
                  <option value={college}>Indian Institute of Technology (IIT) Delhi</option>
                  <option value={college}>Indian Institute of Technology (IIT) Kanpur</option>
                </select>
              </div>

              {/* Form Group: Current Company/Organization */}
              <div className="form-group">
                <label className="block text-sm font-medium mb-2">Current Company/Organization</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="For example: Tech Corp, Cognizant"
                  className="form-control w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
                />
              </div>

              {/* Form Group: Current Designation */}
              <div className="form-group">
                <label className="block text-sm font-medium mb-2">Designation</label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="For example: Junior Developer, SDE-2, etc"
                  className="form-control w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
                />
              </div>

              {/* Form Group: Graduating Batch Dropdown */}
              <div className="form-group">
                <label className="block text-sm font-medium mb-2">Graduating Batch</label>
                <select className="form-control w-full p-2 border border-gray-600 rounded bg-gray-900 text-white">
                  <option value={graduatingBatch}>Select Batch</option>
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