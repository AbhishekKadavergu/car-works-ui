import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';  // Import spinner component
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const api_url = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();

  const isAuthenticated = !!localStorage.getItem('authToken');
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start the loader
    setError('');  // Clear any previous error
    try {
      const response = await axios.post(`${api_url}/api/auth/login`, { email, password });
      const { token, user } = response.data;

      // Store the token in localStorage
      localStorage.setItem('authToken', token);

      // Optionally store user info
      localStorage.setItem('userInfo', JSON.stringify(user));
      console.log(user);
      dispatch(addUser(user));
      if (user !== null) {
        // Navigate to dashboard or home
        navigate('/dashboard');
      }
      else {
        navigate('/login')
      }

    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);  // Stop the loader after the request completes
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="mb-6 text-center text-2xl">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
          disabled={loading}  // Disable button when loading
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <ClipLoader size={20} color={"#ffffff"} loading={loading} />
              <span className="ml-2">Logging in...</span>
            </div>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
