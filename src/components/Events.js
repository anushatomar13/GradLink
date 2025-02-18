import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Events = () => {
  const [user] = useAuthState(auth);
  const [role, setRole] = useState(null);
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [editPreview, setEditPreview] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) return;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setRole(querySnapshot.docs[0].data().role);
      }
    };
    fetchUserRole();
  }, [user]);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "events"));
      const querySnapshot = await getDocs(q);
      setPosts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchPosts();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePostSubmit = async () => {
    if (!user) return alert("Please log in to post");
    if (role === "student") return alert("Students cannot post events.");

    if (text || image) {
      await addDoc(collection(db, "events"), {
        uid: user.uid,
        email: user.email,
        text,
        image: preview || null,
        createdAt: new Date(),
      });
      setText("");
      setImage(null);
      setPreview(null);
      alert("Event posted successfully!");
    }
  };

  const handleDeletePost = async (postId) => {
    if (!user) return alert("Please log in");
    await deleteDoc(doc(db, "events", postId));
    setPosts(posts.filter((post) => post.id !== postId));
    alert("Post deleted successfully!");
  };

  const handleEditPost = (post) => {
    setEditingPostId(post.id);
    setEditText(post.text);
    setEditPreview(post.image);
  };

  const handleEditImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEditImage(file);
      setEditPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveEdit = async () => {
    if (!editingPostId) return;

    await updateDoc(doc(db, "events", editingPostId), {
      text: editText,
      image: editPreview || null,
    });

    setPosts(
      posts.map((post) =>
        post.id === editingPostId ? { ...post, text: editText, image: editPreview } : post
      )
    );

    setEditingPostId(null);
    setEditText("");
    setEditImage(null);
    setEditPreview(null);
    alert("Post updated successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {!user ? (
        <div className="text-center bg-gray-900 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-cyan-400 mb-2">Welcome to Alumni Events!</h2>
          <p className="text-gray-300">Log in to create and view event posts.</p>
          <Link to="/login" className="mt-4 inline-block px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500">
            Login / Sign Up
          </Link>
        </div>
      ) : (
        <>
          {role !== "student" && (
            <>
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
                  <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500" onClick={handlePostSubmit}>
                    Post
                  </button>
                </div>
                {preview && <img src={preview} alt="Preview" className="mt-3 rounded-lg max-h-48" />}
              </div>
            </>
          )}

          <h2 className="text-xl font-bold text-gray-200 mt-6">Event Posts</h2>
          <div className="space-y-4 mt-3">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="bg-gray-900 p-4 rounded-lg shadow-md">
                  {editingPostId === post.id ? (
                    <>
                      <textarea className="w-full p-2 bg-gray-800 text-white rounded-lg" rows="3" value={editText} onChange={(e) => setEditText(e.target.value)} />
                      <input type="file" className="mt-2" onChange={handleEditImageUpload} />
                      {editPreview && <img src={editPreview} alt="Edit" className="mt-2 rounded-lg max-h-48" />}
                      <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg" onClick={handleSaveEdit}>
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-white mb-2">{post.text}</p>
                      {post.image && <img src={post.image} alt="Event" className="rounded-lg max-h-48" />}
                      {user.uid === post.uid && (
                        <div className="flex space-x-3 mt-2">
                          <button className="text-yellow-400" onClick={() => handleEditPost(post)}>Edit</button>
                          <button className="text-red-500" onClick={() => handleDeletePost(post.id)}>Delete</button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-400">No events posted yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Events;