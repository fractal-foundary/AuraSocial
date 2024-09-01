import './App.css';
import Sidebar from './SideBar/sidebar';
import { useEffect } from 'react';
import { fetchCsrfToken } from './csrfToken';
import { Outlet } from 'react-router-dom';

function App() {
    useEffect(() => {
        fetchCsrfToken();
    }, []);
    return (
        <div className="main flex container mx-8">
            {/* Sidebar is basically controlling navigation of whole website, so not included in routes. */}
            <Sidebar />
            <Outlet />
        </div >
    );
}

export default App;
