import React, { useState, useRef, useEffect } from 'react';
import { BsEmojiSmile, BsFiletypeGif } from 'react-icons/bs';
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Post from './Post.jsx';

const EMOJI_LIST = ['😊', '😂', '🥰', '😍', '😎', '🤩', '😋', '🤗', '😄', '👍', '❤️', '🎉', '✨', '🔥', '💯'];

const Newpost = () => {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const [showGifPicker, setShowGifPicker] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedGif, setSelectedGif] = useState(null);
    const textareaRef = useRef(null);
    const gifPickerRef = useRef(null);
    const emojiPickerRef = useRef(null);

    // Fetch posts when component mounts
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/getTimeLinePosts', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }

            const data = await response.json();
            setPosts(data);
            setIsLoading(false);
        } catch (err) {
            setError('Failed to load posts. Please try again later.');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (gifPickerRef.current && !gifPickerRef.current.contains(event.target)) {
                setShowGifPicker(false);
            }
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ((!content.trim() && !selectedGif)) return;

        setIsPosting(true);

        try {
            // Create new post object
            const newPost = {
                content: content.trim(),
                gifUrl: selectedGif,
                timestamp: new Date().toISOString()
            };

            // Send POST request to create new post
            const response = await fetch('/api/newPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(newPost)
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            const createdPost = await response.json();

            // Add new post to the beginning of the posts array
            setPosts(prevPosts => [createdPost, ...prevPosts]);

            // Reset form
            setContent('');
            setSelectedGif(null);
            setIsPosting(false);
            setIsFocused(false);
        } catch (err) {
            setError('Failed to create post. Please try again.');
            setIsPosting(false);
        }
    };

    const insertEmoji = (emoji) => {
        const cursorPosition = textareaRef.current.selectionStart;
        const newContent = content.slice(0, cursorPosition) + emoji + content.slice(cursorPosition);
        setContent(newContent);
    };

    const selectGif = (gifUrl) => {
        setSelectedGif(gifUrl);
        setShowGifPicker(false);
    };

    if (isLoading) {
        return <div className="text-center py-4">Loading posts...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-500">{error}</div>;
    }

    return (
        <div className="space-y-4">
            <div className={`w-[100%] rounded-xl border bg-white 
        shadow-sm transition-all duration-200 relative
        ${isFocused ? 'border-blue-200 shadow-lg' : 'border-gray-100'}
      `}>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="p-4">
                        <div className="flex space-x-3">
                            <div className="w-12 h-12 flex-shrink-0 text-gray-400">
                                <FaRegUserCircle size="100%" />
                            </div>

                            <div className="">
                                <textarea
                                    ref={textareaRef}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    placeholder="What's on your mind?"
                                    className="w-full resize-none border-none focus:outline-none text-lg placeholder-gray-400 p-0 min-h-[120px]"
                                />

                                {selectedGif && (
                                    <div className="relative mt-2 rounded-lg overflow-hidden border border-gray-200">
                                        <img
                                            src={selectedGif}
                                            alt="Selected GIF"
                                            className="w-full h-48 object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setSelectedGif(null)}
                                            className="absolute top-2 right-2 p-1 bg-gray-800/70 rounded-full text-white hover:bg-gray-800"
                                        >
                                            <IoMdClose size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={`
            flex items-center justify-between px-4 py-3
            border-t border-gray-100 bg-gray-50/40
            transition-colors duration-200 relative
            ${isFocused ? 'bg-blue-50/20' : ''}
          `}>
                        <div className="flex space-x-1">
                            <div ref={gifPickerRef} className="relative">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowGifPicker(!showGifPicker);
                                        setShowEmojiPicker(false);
                                    }}
                                    className={`
                    p-2 rounded-full transition-colors
                    ${showGifPicker
                                            ? 'bg-blue-100 text-blue-600'
                                            : 'text-blue-500 hover:bg-blue-100/50'
                                        }
                  `}
                                >
                                    <BsFiletypeGif size={20} />
                                </button>

                                {showGifPicker && (
                                    <div className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 w-72">
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                type="button"
                                                onClick={() => selectGif('/api/placeholder/150/150')}
                                                className="aspect-square bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                                            >
                                                Sample GIF
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => selectGif('/api/placeholder/150/150')}
                                                className="aspect-square bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                                            >
                                                Sample GIF
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div ref={emojiPickerRef} className="relative">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEmojiPicker(!showEmojiPicker);
                                        setShowGifPicker(false);
                                    }}
                                    className={`
                    p-2 rounded-full transition-colors
                    ${showEmojiPicker
                                            ? 'bg-blue-100 text-blue-600'
                                            : 'text-blue-500 hover:bg-blue-100/50'
                                        }
                  `}
                                >
                                    <BsEmojiSmile size={20} />
                                </button>

                                {showEmojiPicker && (
                                    <div className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 w-72">
                                        <div className="grid grid-cols-5 gap-2">
                                            {EMOJI_LIST.map((emoji, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => insertEmoji(emoji)}
                                                    className="p-2 text-xl hover:bg-gray-100 rounded transition-colors"
                                                >
                                                    {emoji}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-400">
                                {content.length > 0 && `${content.length} characters`}
                            </span>
                            <button
                                type="submit"
                                disabled={(!content.trim() && !selectedGif) || isPosting}
                                className={`
                  rounded-full px-6 py-2 font-medium text-white
                  transition-all duration-200 text-sm
                  ${(!content.trim() && !selectedGif) || isPosting
                                        ? 'bg-blue-300 cursor-not-allowed opacity-70'
                                        : 'bg-blue-500 hover:bg-blue-600 shadow-sm hover:shadow-md'
                                    }
                `}
                            >
                                {isPosting ? 'Posting...' : 'Post'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Posts Timeline */}
            <div className="space-y-4">
                {posts.map(post => (
                    <Post
                        key={post.id}
                        content={post.content}
                        gifUrl={post.gifUrl}
                        timestamp={post.timestamp}
                    />
                ))}
            </div>
        </div>
    );
};

export default Newpost;