import Timeline from '../components/TimeLine/Timeline';
import Trending from '../components/Trending/Trending';
import React from 'react';

const HomePage = () => {

    return (
        <div className='ml-[23%] flex'>
            <Timeline />
            <Trending />
        </div>
    );
}

export default HomePage;