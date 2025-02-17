import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Profile = () => {
  const { id } = useParams(); 
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return;
      try {
        const userDocRef = doc(db, "users", id);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  if (!userData) return <div className="text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md border border-cyan-400/20">
        <h2 className="text-2xl font-bold text-cyan-400">{userData.displayName}</h2>
        <p className="text-gray-300 mt-2"><strong>Email:</strong> {userData.email}</p>
        <p className="text-gray-300"><strong>College:</strong> {userData.college}</p>
        <p className="text-gray-300"><strong>Company:</strong> {userData.company}</p>
        <p className="text-gray-300"><strong>Designation:</strong> {userData.designation}</p>
        <p className="text-gray-300"><strong>Graduating Batch:</strong> {userData.graduatingBatch}</p>
      </div>
    </div>
  );
};

export default Profile;
