// src/components/Auth/Register.js
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import { ToastContainer } from 'react-toastify';


const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const api_url = process.env.REACT_APP_API_URL;

    const isAuthenticated = !!localStorage.getItem('authToken');

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Reset error message

        try {
            const response = await fetch(`${api_url}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, username, email, password, country, mobile }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Handle successful registration (e.g., redirect to login page)
            console.log('Registration successful:', data);
            toast.success(`Registration successful! you will be redirected to login page.`);
            setTimeout(() => {
                navigate('/login');                
            }, 3000);
            // Redirect the user or show a success message here
        } catch (err) {
            toast.error(`${err.message}`);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="mb-6 text-center text-2xl">Register</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 p-2 mb-4 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-gray-300 p-2 mb-4 w-full"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 p-2 mb-4 w-full"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 p-2 mb-4 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="border border-gray-300 p-2 mb-4 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="border border-gray-300 p-2 mb-4 w-full"
                    required
                />
                <button 
                    type="submit" 
                    className={`bg-blue-500 text-white p-2 rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <ToastContainer position='bottom-right' transition={Bounce}/>
        </div>
    );
};

export default Register;
