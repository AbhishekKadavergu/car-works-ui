import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-500 p-4 shadow-lg w-full">
      <div className="flex justify-between items-center w-full">
        <Link to="/" className="text-white text-3xl font-bold">
          Car Works
        </Link>
        <nav className="flex space-x-4">
          {isAuthenticated ? (
            <button 
              onClick={handleLogout} 
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition">
              Logout
            </button>
          ) : (
            <>
              <Link 
                to="/login" 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition">
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
