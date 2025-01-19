import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ onClose }) => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [website, setWebsite] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleDragStart = (e) => {
        // Only allow dragging from the header
        if (e.target.closest('.drag-handle')) {
            setIsDragging(true);
            // Store the initial touch/mouse position
            const startY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
            setDragOffset(startY);
        }
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;

        e.preventDefault();
        const currentY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
        const deltaY = currentY - dragOffset;

        // Apply the transformation
        const form = e.currentTarget;
        form.style.transform = `translateY(${Math.max(0, deltaY)}px)`;

        // Adjust opacity of backdrop based on drag distance
        const backdrop = form.parentElement;
        const opacity = Math.max(0, 1 - (deltaY / 400));
        backdrop.style.backgroundColor = `rgba(0, 0, 0, ${opacity * 0.5})`;
    };

    const handleDragEnd = (e) => {
        if (!isDragging) return;

        const form = e.currentTarget;
        const transformValue = form.style.transform;
        const currentY = parseInt(transformValue.replace('translateY(', ''));

        if (currentY > 200) {  // Threshold to dismiss
            handleClose();
        } else {
            // Reset position with animation
            form.style.transition = 'transform 0.3s ease-out';
            form.style.transform = 'translateY(0)';
            setTimeout(() => {
                form.style.transition = '';
            }, 300);
        }

        setIsDragging(false);
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: name,
            bio: bio,
            location: location,
            birth_date: birthDate,
            website: website
        };

        try {
            const response = await api.put('/api/user/profile/', formData);
            setSuccessMessage('Profile updated successfully!');
            setErrorMessage('');
            setTimeout(() => {
                handleClose();
            }, 2000);
        } catch (error) {
            setErrorMessage('Failed to update profile. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50 transition-opacity duration-300"
            style={{ opacity: isVisible ? 1 : 0 }}>
            <div
                className={`w-full max-w-2xl mx-4 transition-transform duration-300 transform ${isVisible ? 'translate-y-0' : 'translate-y-full'
                    } ${isDragging ? 'transition-none' : ''}`}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
            >
                <div className="bg-white rounded-t-lg shadow-xl overflow-hidden">
                    {/* Header - Now acts as drag handle */}
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between drag-handle cursor-grab active:cursor-grabbing">
                        {/* Drag indicator */}
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full" />

                        <h2 className="text-xl font-semibold text-gray-800 mt-2">Edit Profile</h2>
                        <button
                            onClick={handleClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Close dialog"
                        >
                            <svg className="w-5 h-5 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Form content remains the same */}
                    <form onSubmit={handleSubmit}>
                        <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your name"
                                />
                            </div>

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

                            {/* Wallet Address */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="wallet">
                                    Wallet Address
                                </label>
                                <input
                                    id="wallet"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50"
                                    value="0x3Db52357A1D45C00c53BD3331004DAB53e119B64"
                                    readOnly
                                />
                            </div>

                            {/* Social Score */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="score">
                                    Social Score
                                </label>
                                <input
                                    id="score"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50"
                                    value={Math.floor(Math.random() * 101)}
                                    readOnly
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
                                onClick={handleClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                onClick={handleClose}
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