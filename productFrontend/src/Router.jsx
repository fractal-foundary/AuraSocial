import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
// import { user } from './context/AuthContext';
const user = true;

// Page imports
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import Register from './pages/Authentication/register';
import WalletConnectPage from './pages/Authentication/ThirdWebSDK/WalletConnectPage';
import ProfilePage from './pages/profile/ProfilePage';
import Sidebar from './components/SideBar/sidebar';

// Layout Components
const RootLayout = () => (
    <div className="min-h-screen">
        <Outlet />
    </div>
);

const AuthenticatedLayout = () => (
    <div className="main flex container mx-8">
        <Sidebar />
        <Outlet />
    </div >
);

const AuthLayout = () => {
    return user ? <AuthenticatedLayout /> : <Navigate to="/" replace />;
};

const PublicOnlyLayout = () => {
    return !user ? <Outlet /> : <Navigate to="/home" replace />;
};

const routes = [
    {
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <LandingPage />,
            },
            // Public routes (only accessible when not authenticated)
            {
                element: <PublicOnlyLayout />,
                children: [
                    {
                        path: 'register',
                        element: <Register />,
                    },
                ],
            },
            // Protected routes (require authentication)
            {
                element: <AuthLayout />,
                children: [
                    {
                        path: 'home',
                        element: <HomePage />,
                    },
                    {
                        path: 'profile',
                        element: <ProfilePage />,
                    },
                    {
                        path: 'cryptowallet',
                        element: <WalletConnectPage />,
                    },
                ],
            },
            {
                path: '*',
                element: <Navigate to="/" replace />,
            },
        ],
    },
];

const Router = () => {
    return (
        <RouterProvider
            router={createBrowserRouter(routes)}
            fallbackElement={<div>Loading...</div>}
        />
    );
};

export default Router;