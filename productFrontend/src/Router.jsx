import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import React, { useContext } from 'react';
import AuthContext from './context/AuthContext';

// Page imports
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import Register from './pages/Authentication/register';
import WalletConnectPage from './pages/Authentication/ThirdWebSDK/WalletConnectPage';
import ProfilePage from './pages/profile/ProfilePage';
import Marketplace from './pages/marketplace';
import Sidebar from './components/SideBar/sidebar';
import Notifications from './pages/Notifications';

// Layout Components
const RootLayout = () => (
    <div className="min-h-screen">
        <Outlet />
    </div>
);

const AuthenticatedLayout = () => (
    <div className="">
        <Sidebar />
        <Outlet />
    </div >
);

const AuthLayout = () => {
    // TODO: temporarily using auth jwt tokens to be logged in, there must be a better way.
    let tokens = localStorage.getItem("authTokens")
    return tokens ? <AuthenticatedLayout /> : <Navigate to="/" replace />;
};

const PublicOnlyLayout = () => {

    let tokens = localStorage.getItem("authTokens")
    return !tokens ? <Outlet /> : <Navigate to="/home" replace />;
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
                        path: 'marketplace',
                        element: <Marketplace />,
                    },
                    {
                        path: 'cryptowallet',
                        element: <WalletConnectPage />,
                    },
                    {
                        path: 'notifications',
                        element: <Notifications />,
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