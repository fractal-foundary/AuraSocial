// authcallback verifies the user's credentials...
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { exchangeTokens } from "../api"

const Authcallback = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        // code: is the code which indicates that jwt tokens are generated, and you can fetch them in next 5mins.
        const tokenfetchCode = params.get("code")

        if (tokenfetchCode) {
            exchangeTokens(tokenfetchCode)
                .then(response => {
                    localStorage.setItem('access_token', response.data.access_token);
                    localStorage.setItem('refresh_token', response.data.refresh_token);
                    navigate('/profile');
                })
                .catch(error => {
                    console.error('Token exchange failed:', error);
                    navigate('/account/signup');
                });
        } else {
            navigate('/account/signup');
        }
    }, [location, navigate])

    return <div>Processing authentication...</div>;
}

export default Authcallback;