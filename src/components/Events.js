import { db, auth } from "../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState, useEffect } from "react";

const Events = () => {
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePostSubmit = async () => {
    if (text || image) {
      if (!user) return alert("Please log in to post");

      const post = {
        uid: user.uid,
        email: user.email,
        text,
        image: preview || null,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "events"), post);
      setText("");
      setImage(null);
      setPreview(null);
      fetchPosts();
    }
  };

  const fetchPosts = async () => {
    if (!user) return;

    const q = query(collection(db, "events"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const postsData = querySnapshot.docs.map((doc) => doc.data());
    setPosts(postsData);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold text-gray-200 mb-4">Create Event Post</h2>
      <div className="bg-gray-900 p-4 rounded-lg shadow-md">
        <textarea
          className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700"
          rows="3"
          placeholder="Share something about an event..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex items-center mt-3 space-x-3">
          <label className="cursor-pointer text-cyan-400 flex items-center space-x-2">
            <span>Upload Image</span>
            <input type="file" className="hidden" onChange={handleImageUpload} />
          </label>
          <button
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500"
            onClick={handlePostSubmit}
          >
            Post
          </button>
        </div>
        {preview && (
          <div className="mt-3">
            <img src={preview} alt="Preview" className="rounded-lg max-h-48" />
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold text-gray-200 mt-6">Your Events</h2>
      <div className="space-y-4 mt-3">
        {posts.map((post, index) => (
          <div key={index} className="bg-gray-900 p-4 rounded-lg shadow-md">
            <p className="text-white mb-2">{post.text}</p>
            {post.image && <img src={post.image} alt="Event" className="rounded-lg max-h-48" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
