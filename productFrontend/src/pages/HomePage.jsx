import Timeline from '../components/TimeLine/Timeline';
import Trending from '../components/Trending/Trending';
// import Sidebar from '../components/SideBar/sidebar';
// import { Outlet } from 'react-router-dom';
import React, { useContext } from 'react'

const HomePage = () => {
    return (
        <div className='ml-[20%] flex'>
            <Timeline />
            <Trending />
        </div>
    );
}

export default HomePage;