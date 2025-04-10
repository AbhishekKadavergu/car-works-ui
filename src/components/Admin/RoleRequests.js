import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import { ToastContainer } from 'react-toastify';

const RoleRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true);
            setError('');
            setMessage('');

            try {
                const response = await axiosInstance.get(`/api/admin/requests`);

                // Ensure you're accessing the correct field containing the requests
                if (response.data.success) {
                    setRequests(response.data.data || []); // Use response.data.data instead of just response.data
                    setMessage(response.data.message);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError('Error fetching role requests');
                toast.error('Error fetching role requests');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleAction = async (id, action) => {
        setLoading(true);
        try {
            let url;
            if (action === 'approve') {
                url = `/api/admin/approve/${id}`;
            } else if (action === 'reject') {
                url = `/api/admin/reject/${id}`;
            } else if (action === 'revoke') {
                url = `/api/admin/revoke/${id}`;
            }

            await axiosInstance.post(url, {});

            setRequests(
                requests.map((req) =>
                    req._id === id
                        ? { ...req, status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'revoked' }
                        : req
                )
            );
            toast.success(`Role request ${action}d successfully.`);
        } catch (err) {
            toast.error(`Error performing action: ${action}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center mt-6 text-blue-500">Loading...</div>;
    }

    if (error) {
        return (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded" role="alert">
                <p className="font-bold">Error</p>
                <p>{error}</p>
            </div>
        );
    }

    if (!requests.length && message) {
        return (
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 rounded" role="alert">
                <p className="font-bold">Info</p>
                <p>{message || 'No requests available'}</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white min-h-screen">
            <h2 className="text-3xl mb-6 text-white font-semibold">Role Requests</h2>
            <div className="grid gap-6">
                {requests.map((req) => (
                    <div key={req._id} className="p-6  rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <p className="text-gray-800 mb-2">
                            <strong>User:</strong> {req.user.name}
                        </p>
                        <p className="text-gray-800 mb-2">
                            <strong>Role:</strong> {req.role ? req.role.name : 'No role assigned'}
                        </p>
                        <p className="text-gray-800 mb-2">
                            <strong>Status:</strong>{' '}
                            <span className={req.status === 'approved' ? 'text-green-500' : req.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'}>
                                {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                            </span>
                        </p>
                        <p className="text-gray-800 mb-2">
                            <strong>Comment:</strong> {req.comment || 'No comment provided'}
                        </p>
                        <p className="text-gray-800 mb-2">
                            <strong>Requested At:</strong> {new Date(req.createdAt).toLocaleString()}
                        </p>
                        <div className="mt-4 flex gap-4">
                            {req.status === 'pending' && (
                                <>
                                    <button
                                        onClick={() => handleAction(req._id, 'approve')}
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-all"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleAction(req._id, 'reject')}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all"
                                    >
                                        Reject
                                    </button>
                                </>
                            )}
                            {req.status === 'approved' && (
                                <button
                                    onClick={() => handleAction(req._id, 'revoke')}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-all"
                                >
                                    Revoke
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default RoleRequests;
