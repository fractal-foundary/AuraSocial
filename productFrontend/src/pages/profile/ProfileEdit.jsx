import React, { useState } from 'react';
import api from '../../api';

const ProfilePage = ({ onClose }) => {
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [website, setWebsite] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            bio: bio,
            location: location,
            birth_date: birthDate,
            website: website
        };

        try {
            const response = await api.put('Users/api/profile/update/', formData);
            setSuccessMessage('Profile updated successfully!');
            setErrorMessage('');
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (error) {
            setErrorMessage('Failed to update profile. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="w-full max-w-2xl mx-4">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Close dialog"
                        >
                            <svg className="w-5 h-5 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Body */}
                    <form onSubmit={handleSubmit}>
                        <div className="p-6 space-y-6">
                            {/* Bio */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="bio">
                                    Bio
                                </label>
                                <textarea
                                    id="bio"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Tell us about yourself"
                                    rows="4"
                                />
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="location">
                                    Location
                                </label>
                                <input
                                    id="location"
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Where do you live?"
                                />
                            </div>

                            {/* Date of Birth */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="birthDate">
                                    Date of Birth
                                </label>
                                <input
                                    id="birthDate"
                                    type="date"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                />
                            </div>

                            {/* Website */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="website">
                                    Website
                                </label>
                                <input
                                    id="website"
                                    type="url"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    placeholder="Your personal website"
                                />
                            </div>

                            {/* Messages */}
                            {successMessage && (
                                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm">
                                    {successMessage}
                                </div>
                            )}
                            {errorMessage && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                                    {errorMessage}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;