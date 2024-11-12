import React from 'react';
import Search from "./Search";
import WhatsHappening from "./WhatsHappening";
import WhotoFollow from "./whotofollow";
import './scroll.css'
const Trending = () => {
    return (
        <aside className="trending hidden lg:flex flex-col sticky top-2 h-screen border-l-2 border-gray-200 w-[30%]">
            <div className="">
                <Search />
            </div>

            <div className="flex flex-col gap-4">
                <WhatsHappening />
                <WhotoFollow />
            </div>
        </aside>
    );
};

export default Trending;