// authcallback verifies the user's credentials...
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Register = () => {
    const AuthContext = useAuthContext()
    let { fetchJwtTokens, authTokens } = useContext(AuthContext)

    // States to hold form data
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const status = params.get("status")

    if (status !== "success") {
        setError('Failed to register. Please try again later.');
    }

    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // basically the function to fetch the jwttokens is called in AuthContext.
        if (authTokens) {
            // fetchJwtTokens is only going to called once, as if tokens are already fetched no need to call again.
            fetchJwtTokens(e);
        }

        try {
            // so, now we have jwt tokens so, we can add them to the header while sending the data.
            const response = await axios.put('/api/user/register/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    // jwtTokens.access: is the access token we fetched.
                    'Authorization': `Bearer ${authTokens.access}`
                },
                withCredentials: true
            });

            if (response.status === 200) {
                setSuccess('Registration successful!');
                setError('');
                navigate('/home');
            } else {
                const data = await response.json();
                setError(data.detail || 'Something went wrong.');
            }
        } catch (err) {
            setError('Failed to register. Please try again later.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
