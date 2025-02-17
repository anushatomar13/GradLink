import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase"; 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-gray-700 text-white rounded border border-cyan-400/30"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-gray-700 text-white rounded border border-cyan-400/30"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-cyan-400 text-gray-900 rounded hover:bg-cyan-300 transition-colors duration-300 font-mono"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          New user? <a href="/register" className="text-cyan-400">Register Here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
