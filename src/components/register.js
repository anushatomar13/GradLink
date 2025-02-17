import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Register = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const auth = getAuth();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: firstName, // Store first name as displayName
            });
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Register</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="w-full p-3 bg-gray-700 text-white rounded border border-cyan-400/30"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="w-full p-3 bg-gray-700 text-white rounded border border-cyan-400/30"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
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
                        Create Account
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-400">
                    Already a user? <a href="/login" className="text-cyan-400">Log In Here</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
