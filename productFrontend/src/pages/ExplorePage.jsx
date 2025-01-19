import React from 'react';
import PostCard from './profile/PostCard';

const ExplorePage = () => {
    // Sample data array
    const posts = [
        {
            id: 1,
            name: "Jane Cooper",
            username: "janecooper",
            content: "What's your favorite programming language and why?",
            score: 40,
            likes: 1200,
        },
        {
            id: 2,
            name: "Alex Johnson",
            username: "alexj",
            content: "Which framework do you prefer for building web applications - React, Vue, or Angular?",
            score: 50,
            likes: 2300,
        },
        {
            id: 3,
            name: "Sarah Wilson",
            username: "sarahw",
            content: "Share your most useful productivity tip for developers!",
            score: 52,
            likes: 4500,
        },
        {
            id: 4,
            name: "Mike Brown",
            username: "mikeb",
            content: "What's the most challenging bug you've ever fixed?",
            score: 56,
            likes: 3100,
        }
    ];

    return (
        <div className="max-w-2xl mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Explore</h1>
                <p className="text-gray-600 mt-2">Discover interesting discussions and questions</p>
            </div>

            <div className="space-y-6">
                {posts.map((post) => (
                    <PostCard
                        key={post.id}
                        name={post.name}
                        username={post.username}
                        content={post.content}
                        score={post.score}
                        likes={post.likes}
                        comments={post.comments}
                    />
                ))}
            </div>
        </div>
    );
};

export default ExplorePage;