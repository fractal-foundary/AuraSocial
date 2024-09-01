import React, { useState, useEffect } from 'react';
import api from '../api';
// api: is customized instance of axios

function Profile() {
    const [profile, setProfile] = useState(null);
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const profileResponse = await api.get('/api/profile/');
                setProfile(profileResponse.data);

                const tweetsResponse = await api.get('/api/tweets/');
                setTweets(tweetsResponse.data);

                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleLike = async (tweetId) => {
        try {
            await api.post(`/api/tweet/${tweetId}/like/`);
            const updatedTweets = tweets.map(tweet =>
                tweet.id === tweetId
                    ? { ...tweet, is_liked: !tweet.is_liked, likes_count: tweet.is_liked ? tweet.likes_count - 1 : tweet.likes_count + 1 }
                    : tweet
            );
            setTweets(updatedTweets);
        } catch (err) {
            console.error('Failed to like tweet', err);
        }
    };

    if (loading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
    if (!profile) return null;

    return (
        <div className="max-w-2xl mx-auto bg-black text-white">
            {/* Cover Photo */}
            <div className="h-48 bg-gray-700">
                {profile.image && (
                    <img src={profile.image} alt="Cover" className="w-full h-full object-cover" />
                )}
            </div>

            {/* Profile Info */}
            <div className="relative px-4">
                <img
                    src={profile.image || '/default.png'}
                    alt={profile.name}
                    className="absolute -top-16 left-4 w-32 h-32 rounded-full border-4 border-black"
                />
                <div className="pt-20">
                    <h1 className="text-xl font-bold">{profile.name}</h1>
                    <p className="text-gray-500">@{profile.user.username}</p>
                    <p className="mt-2">{profile.bio}</p>

                    <div className="flex mt-4 space-x-4 text-gray-500">
                        {profile.location && (
                            <span>
                                <i className="fas fa-map-marker-alt mr-1"></i>
                                {profile.location}
                            </span>
                        )}
                        {profile.website && (
                            <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-400">
                                <i className="fas fa-link mr-1"></i>
                                Website
                            </a>
                        )}
                        <span>
                            <i className="far fa-calendar mr-1"></i>
                            Joined {new Date(profile.joined).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="flex mt-4 space-x-4">
                        <span><strong>{profile.following_count}</strong> Following</span>
                        <span><strong>{profile.followers_count}</strong> Followers</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-700 mt-4">
                <button className="flex-1 py-4 font-semibold border-b-2 border-blue-500">Tweets</button>
                <button className="flex-1 py-4 text-gray-500">Replies</button>
                <button className="flex-1 py-4 text-gray-500">Media</button>
                <button className="flex-1 py-4 text-gray-500">Likes</button>
            </div>

            {/* Tweets */}
            <div className="tweets">
                {tweets.map(tweet => (
                    <div key={tweet.id} className="border-b border-gray-700 p-4">
                        <div className="flex items-center mb-2">
                            <img src={profile.image || '/default.png'} alt={profile.name} className="w-10 h-10 rounded-full mr-3" />
                            <div>
                                <span className="font-bold">{profile.name}</span>
                                <span className="text-gray-500 ml-2">@{profile.user.username}</span>
                            </div>
                        </div>
                        <p>{tweet.content}</p>
                        <div className="mt-2 text-gray-500 flex items-center">
                            <span>{new Date(tweet.created_at).toLocaleString()}</span>
                            <button
                                onClick={() => handleLike(tweet.id)}
                                className={`ml-4 flex items-center ${tweet.is_liked ? 'text-red-500' : ''}`}
                            >
                                <i className={`${tweet.is_liked ? 'fas' : 'far'} fa-heart mr-1`}></i>
                                {tweet.likes_count}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Profile;