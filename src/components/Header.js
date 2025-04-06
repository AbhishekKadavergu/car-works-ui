import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../utils/userSlice';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user);
  
  if (user === null) {
    console.log("user not found!");
  }
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    console.log("Dispatching user to redux:", user);
    dispatch(removeUser());
    setTimeout(() => navigate('/login'), 100);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-500 p-4 shadow-lg w-full">
      <div className="flex justify-between items-center w-full">
        <Link to="/" className="text-white text-3xl font-bold">
          Car Works
        </Link>
        <nav className="flex space-x-4">
          {user ? (<div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition">
              Logout
            </button>
          </div>
          ) : (
            <div className='mx-3'>
              <Link
                to="/login"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mx-3 rounded transition">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition">
                Signup
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

