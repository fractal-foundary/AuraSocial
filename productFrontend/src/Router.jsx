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
import { AuthProvider } from './context/AuthContext.jsx';
import SigninPage from './pages/Authentication/Signin.jsx';
// import { AuthProvider } from './context/AuthContext'

function createRouter() {
    return createBrowserRouter([
        {
            path: '/',
            element: <AuthProvider><LandingPage /></AuthProvider>
        },
        {
            path: '/home',
            element: <AuthProvider><HomePage /></AuthProvider>,

        },
        {
            path: '/signup',
            element: <AuthProvider><SignupPage /></AuthProvider>
        },
        {
            path: '/cryptowallet',
            element: <AuthProvider><WalletConnectPage /></AuthProvider>
        },
        {
            path: '/register',
            element: <AuthProvider><Register /></AuthProvider>
        },
        {
            path: '/home/profile',
            element: <AuthProvider><ProfilePage /></AuthProvider>
        },
        {
            path: '/login',
            element: <AuthProvider><SigninPage /></AuthProvider>
        }
    ])
}

export default function Router() {
    return <RouterProvider router={createRouter()} />;
}
