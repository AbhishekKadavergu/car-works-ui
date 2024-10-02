import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserRoleRequests = () => {
  const [roleRequests, setRoleRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const api_url = process.env.REACT_APP_API_URL;


  useEffect(() => {
    fetchRoleRequests();
  }, []);

  const fetchRoleRequests = async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('authToken'); // Get token from localStorage

    try {
      const response = await axios.get(`${api_url}/api/request/role-requests`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      });
      setRoleRequests(response.data);
    } catch (err) {
      setError('Failed to fetch role requests');
    }
    setLoading(false);
  };

  return (
    <div className="p-8">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : roleRequests.length === 0 ? (
        <p>No role requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-6 text-left text-gray-600 font-bold">Role Name</th>
                <th className="py-3 px-6 text-left text-gray-600 font-bold">Creation Date</th>
                <th className="py-3 px-6 text-left text-gray-600 font-bold">Status</th>
                <th className="py-3 px-6 text-left text-gray-600 font-bold">Comment</th>
              </tr>
            </thead>
            <tbody>
              {roleRequests.map((request) => (
                <tr key={request._id} className="border-b border-gray-200">
                  <td className="py-4 px-6 text-gray-700">{request.role.name}</td>
                  <td className="py-4 px-6 text-gray-700">{new Date(request.createdAt).toLocaleDateString()}</td>
                  <td className={`py-4 px-6 font-semibold 
                    ${request.status === 'pending' ? 'text-yellow-500' :
                      request.status === 'approved' ? 'text-green-500' :
                        request.status === 'rejected' ? 'text-red-500' :
                          request.status === 'revoked' ? 'text-gray-500' : ''}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </td>
                  <td className="py-4 px-6 text-gray-700">{request.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserRoleRequests;
