import React, { useState } from 'react';
import api from '../api';

const ProfilePage = () => {
    // Set up state to track form inputs
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [website, setWebsite] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create form data
        const formData = {
            bio: bio,
            location: location,
            birth_date: birthDate,
            website: website
        };

        try {
            // POST request to your Django API
            const response = await api.put('Users/api/profile/update/', formData);

            setSuccessMessage('Profile updated successfully!');
            setErrorMessage(''); // Clear previous errors
        } catch (error) {
            setErrorMessage('Failed to update profile. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full space-y-4">
                <h2 className="text-white text-3xl font-semibold text-center mb-4">Edit Profile</h2>

                {/* Bio */}
                <div>
                    <label className="block text-gray-300 text-sm mb-1" htmlFor="bio">Bio</label>
                    <textarea
                        id="bio"
                        className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself"
                        rows="4"
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block text-gray-300 text-sm mb-1" htmlFor="location">Location</label>
                    <input
                        id="location"
                        type="text"
                        className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Where do you live?"
                    />
                </div>

                {/* Date of Birth */}
                <div>
                    <label className="block text-gray-300 text-sm mb-1" htmlFor="birthDate">Date of Birth</label>
                    <input
                        id="birthDate"
                        type="date"
                        className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </div>

                {/* Website */}
                <div>
                    <label className="block text-gray-300 text-sm mb-1" htmlFor="website">Website</label>
                    <input
                        id="website"
                        type="url"
                        className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="Your personal website"
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg focus:outline-none focus:ring">
                    Save Profile
                </button>

                {/* Success and Error Messages */}
                {successMessage && <p className="text-green-400 text-center mt-2">{successMessage}</p>}
                {errorMessage && <p className="text-red-400 text-center mt-2">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default ProfilePage;
