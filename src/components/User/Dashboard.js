import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const Dashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false); // To check if user is admin
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate


    useEffect(() => {
        // Fetch user roles to determine if they have an admin role
        const fetchUserRole = () => {
            //   const token = localStorage.getItem('authToken');
            try {
                // const response = await axios.get('http://localhost:5000/api/user/roles', {
                //   headers: {
                //     Authorization: `Bearer ${token}`,
                //   },
                // });

                // const roles = response.data.roles; // Assuming the roles come in the response
                // if (roles.includes('admin')) {
                setIsAdmin(true);
                // }
            } catch (err) {
                setError('Error fetching user roles');
            } finally {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Handle navigation to Request Role page
    const handleRequestRoleNavigation = (url) => {
        navigate(url); // Navigate to the request role page
    };

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-6">Dashboard</h1>

            {/* Authorization Modules */}
            <div className="mb-10 w-full max-w-4xl">
                <h2 className="text-3xl font-semibold text-gray-700 mb-4">Authorization Modules</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Request Role Card */}
                    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Request Role</h3>
                        <p className="text-gray-600 mb-4">Request access to specific roles for enhanced features.</p>
                        <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-700 transition-colors duration-200" onClick={() => handleRequestRoleNavigation('/request-role')}>
                            Request Role
                        </button>
                    </div>

                    {/* Admin Card - Visible only if the user is admin */}
                    {isAdmin && (
                        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Admin</h3>
                            <p className="text-gray-600 mb-4">Manage user role requests and approvals.</p>
                            <button className="bg-red-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-red-700 transition-colors duration-200" onClick={() => handleRequestRoleNavigation('/admin-requests')}>
                                View User Requests
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Business Modules */}
            <div className="w-full max-w-4xl">
                <h2 className="text-3xl font-semibold text-gray-700 mb-4">Business Modules</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Bill of Materials (BOM) Card */}
                    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Bill of Materials (BOM)</h3>
                        <p className="text-gray-600 mb-4">Access the Bill of Materials module.</p>
                        <button className="bg-green-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-700 transition-colors duration-200" onClick={() => navigate('/bom')}>
                            Go to BOM
                        </button>
                    </div>

                    {/* Product Carbon Footprint (PCF) Card */}
                    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Product Carbon Footprint (PCF)</h3>
                        <p className="text-gray-600 mb-4">View and manage the Product Carbon Footprint data.</p>
                        <button className="bg-green-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-700 transition-colors duration-200" onClick={() => navigate('/pcf')}>
                            Go to PCF
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Dashboard;
