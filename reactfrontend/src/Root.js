import './App.css';
import Sidebar from './SideBar/sidebar';
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <div className="main flex container mx-8">
            {/* Sidebar is basically controlling navigation of whole website, so not included in routes. */}
            <Sidebar />
            <Outlet />
        </div >
    );
}

export default App;
