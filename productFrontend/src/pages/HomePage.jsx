import Timeline from '../components/TimeLine/Timeline';
import Trending from '../components/Trending/Trending';
import React from 'react';

const HomePage = () => {

    return (
        <div className='ml-[20%] flex'>
            <Timeline />
            <Trending />
        </div>
    );
}

export default HomePage;