import React from 'react';
import { FaUser, FaComment, FaHeart } from 'react-icons/fa';

function PostCard({ name, username, content, score, likes }) {
    return (
        <div className="mx-4 bg-white rounded-xl shadow-md overflow-hidden p-4 border-2 border-gray-100 mt-4">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <FaUser className="text-gray-600" size={24} />
                    </div>
                </div>
                <div className="ml-4 flex-grow">
                    <div className="flex items-center">
                        <h2 className="text-lg font-bold">{name}</h2>
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                            {score}
                        </span>
                    </div>
                    <p className="text-gray-500">@{username}</p>
                </div>
            </div>
            <p className="mt-2">
                {content}
            </p>
            <div className="mt-4 flex items-center text-gray-500">
                {/* <div className="flex items-center mr-6">
                    <FaComment className="mr-2" />
                    <span>{comments?.toLocaleString() || '0'}</span>
                </div> */}
                <div className="flex items-center">
                    <FaHeart className="mr-2" />
                    <span>{likes?.toLocaleString() || '0'}</span>
                </div>
            </div>
        </div>
    );
}

export default PostCard;