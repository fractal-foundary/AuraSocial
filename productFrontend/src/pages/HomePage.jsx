import Timeline from '../components/TimeLine/Timeline';
import Trending from '../components/Trending/Trending';
import Sidebar from '../components/SideBar/sidebar';
import { Outlet } from 'react-router-dom';
import React, { useContext } from 'react'
// import AuthContext from '../context/AuthContext';

const HomePage = () => {
    // let { user } = useContext(AuthContext)
    const user = true;
    return (
        user ? (
            <div className="main flex container mx-8">
                <Sidebar />
                <div className='ml-[25%] flex'>
                    <Timeline />
                    <Trending />
                    <Outlet />
                </div>
            </div >
        ) : (
            <div className="main flex container mx-8">
                <p>You are not logged in, redirecting...</p>
            </div>
        )
    );
}

export default HomePage;