import React, { useState } from 'react';

// working signup page.ateast getting the auth_url from the rest_Api
const SignupPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleTwitterSignup = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/social_accounts/api/twitter_auth_url');
            const data = await response.json();
            window.location.href = data.auth_url;
        } catch (error) {
            console.error('Error fetching Twitter auth URL:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded shadow-md">
                <h1 className="mb-6 text-2xl font-bold text-center">Sign up for Our App</h1>
                <button
                    onClick={handleTwitterSignup}
                    disabled={isLoading}
                    className="w-full py-2 px-4 bg-blue-400 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:opacity-50"
                >
                    {isLoading ? 'Loading...' : 'Sign up with Twitter'}
                </button>
            </div>
        </div>
    );
};

export default SignupPage;