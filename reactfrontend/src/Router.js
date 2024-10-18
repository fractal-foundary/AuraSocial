import { useState, useEffect } from 'react';
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';
import Home from './Home/home';
import Profile from './Profile/profile';
import Root from './Root';

import Signup from './Authentication/signup';
import LandingPage from './LandingPage';
import { SiRootme } from 'react-icons/si';

function createRouter() {
    return createBrowserRouter([
        {
            path: '/',
            element: <LandingPage />,

        },
        {
            path: '/account/signup',
            element: <Signup />
        },
        {
            path: '/home',
            element: <Root></Root>,
            children: [
                {
                    path: '/home/feed',
                    element: <Home />
                },
                {
                    path: '/home/profile',
                    element: <Profile />
                },
            ]
        }

    ])
}

export default function Router() {
    return <RouterProvider router={createRouter()} />;
}
