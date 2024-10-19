import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';
import ProfilePage from '.pages/ProfilePage';
import HomePage from './pages/HomePage';

import SignupPage from '.pages/Authentication/SignupPage';
import Register from '.pages/Authentication/register';
import WalletConnectPage from '.pages/Authentication/ThirdWebSDK/WalletConnectPage';
import LandingPage from './pages/LandingPage';
import PrivateRoute from './utils/PrivateRoute';

function createRouter() {
    return createBrowserRouter([
        {
            path: '/',
            element: <LandingPage />
        },
        {
            path: '/home',
            element: <PrivateRoute><HomePage /></PrivateRoute>,
            children: [
                {
                    path: '/profile',
                    element: <ProfilePage />
                },
            ]
        },
        {
            path: '/signup',
            element: <SignupPage />
        },
        {
            path: '/crytowallet',
            element: <WalletConnectPage />
        },
        {
            path: '/register',
            element: <Register />
        },
    ])
}

export default function Router() {
    return <RouterProvider router={createRouter()} />;
}
