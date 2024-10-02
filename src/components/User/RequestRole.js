import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserRoleRequests from './RoleRequests'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles


const RoleRequest = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [comment, setComment] = useState(''); // New state for the comment
  const [loading, setLoading] = useState(false);
  const api_url = process.env.REACT_APP_API_URL;


  useEffect(() => {
    fetchRoles();
  }, []);
  // Fetch roles from the API
  const fetchRoles = async () => {
    const token = localStorage.getItem('authToken'); // Get token from localStorage
    try {
      const response = await axios.get(`${api_url}/api/roles`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      });
      setRoles(response.data);
    } catch (err) {
      toast.error('Failed to fetch roles', {
        position: 'bottom-right',
      });
    }
  };

  const handleRoleRequest = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('authToken'); // Get token from localStorage
      const requestBody = {
        roleId: selectedRole,   // Role ID
        comment: comment        // Comment for the role request
      };

      // Make POST request to the backend with the token in the Authorization header
      const response = await axios.post(`${api_url}/api/request/role-request`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token for authentication
        },
      });

      // Show success toast message
      toast.success(response.data.message, {
        position: 'bottom-right',
      });

      // Reset form fields
      setSelectedRole('');
      setComment('');
    } catch (err) {
      // Extract error message from the response or set a default error message
      const errorMessage = err.response?.data?.message || 'Failed to submit role request';

      // Show error toast message
      toast.error(errorMessage, {
        position: 'bottom-right',
      });
    }

    setLoading(false);
  };


  return (
    <div className="flex items-center justify-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-6xl flex justify-between space-x-4">
        {/* Request Role Form */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="mb-6 text-center text-2xl">Request a Role</h2>
          <form onSubmit={handleRoleRequest}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Select Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg w-full cursor-pointer"
                required
              >
                <option value="" disabled>Select a role</option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>{role.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Why are you requesting this role?</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter your reason..."
                className="border border-gray-300 p-2 w-full rounded-lg"
                rows="4"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className={`bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 w-full ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={loading || !selectedRole || !comment}
            >
              {loading ? 'Requesting...' : 'Request Role'}
            </button>
          </form>
        </div>

        {/* User Role Requests */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="mb-6 text-center text-2xl">Your Requests</h2>
          <UserRoleRequests />
        </div>
      </div>
      <ToastContainer /> {/* Add this to enable toasts */}
    </div>
  );

};

export default RoleRequest;
