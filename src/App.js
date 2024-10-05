import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/User/Dashboard';
import UserRoleRequests from './components/User/RoleRequests';
import PrivateRoute from './components/PrivateRoute';
import RequestRole from './components/User/RequestRole';
import RoleRequests from './components/Admin/RoleRequests';
import Header from './components/Header'; 
import BOMPage from './components/User/BOMPage';
import PCFPage from './components/User/PCFPage';



const App = () => {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Header />  {/* Header will now be visible on all pages */}
                <main className="flex-grow">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Private Routes */}
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/role-requests" element={<PrivateRoute><UserRoleRequests /></PrivateRoute>} />
                    <Route path="/request-role" element={<PrivateRoute><RequestRole /></PrivateRoute>} />
                    <Route path="/admin-requests" element={<PrivateRoute><RoleRequests /></PrivateRoute>} />
                    {/* Add other protected routes here */}
                    <Route path="/bom" element={<PrivateRoute><BOMPage/></PrivateRoute>} />
                    <Route path="/pcf" element={<PrivateRoute><PCFPage/></PrivateRoute>} />

                    {/* Public home route */}
                    <Route path="/" element={<div>Home Component</div>} />
                </Routes>
            </main>
        </div>
        </Router >
    );
};

export default App;
