import Timeline from '../components/TimeLine/Timeline';
import Trending from '../components/Trending/Trending';
import { Outlet } from 'react-router-dom';
import './App.css';

const HomePage = () => {
    const isAuthenticated = false;
    return (
        isAuthenticated ? (
            <div className="main flex container mx-8">
                <Sidebar />
                <Timeline />
                <Trending />
                <Outlet />
            </div >
        ) : (
            <div className="main flex container mx-8">
                <p>You are not logged in, redirecting...</p>
            </div>
        )
    );
}

export default HomePage;