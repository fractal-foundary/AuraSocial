import { useState, useEffect } from 'react';
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';
import Home from './Home/home';
import Profile from './Profile/profile';
import Root from './Root';

import Signup from './Authentication/signup';
import Authcallback from './Authentication/AuthCallback';

function createRouter() {
    return createBrowserRouter([
        {
            path: '/',
            element: <Root />,
            children: [
                {
                    path: '/home',
                    element: <Home />
                },
                {
                    path: '/profile',
                    element: <Profile />
                },
            ]
        },
        {
            path: '/account/signup',
            element: <Signup />
        },
        {
            path: '/account/authcallback',
            element: <Authcallback />
        },
    ])
}

export default function Router() {
    return <RouterProvider router={createRouter()} />;
}
