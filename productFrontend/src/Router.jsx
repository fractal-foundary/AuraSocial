import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';
// import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';

import SignupPage from './pages/Authentication/SignupPage';
import Register from './pages/Authentication/register';
import WalletConnectPage from './pages/Authentication/ThirdWebSDK/WalletConnectPage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/profile/ProfilePage.jsx';
import { AuthProvider } from './context/AuthContext'

function createRouter() {
    return createBrowserRouter([
        {
            path: '/',
            element: <LandingPage />
        },
        {
            path: '/home',
            element: <HomePage />,

        },
        {
            path: '/signup',
            element: <SignupPage />
        },
        {
            path: '/cryptowallet',
            element: <WalletConnectPage />
        },
        {
            path: '/register',
            element: <Register />
        },
        {
            path: '/home/profile',
            element: <ProfilePage></ProfilePage>
        }
    ])
}

export default function Router() {
    return <RouterProvider router={createRouter()} />;
}
