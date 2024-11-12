import axios from 'axios';

const api = axios.create({
    baseURL: '/api/',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

api.interceptors.request.use(
    async (config) => {
        try {
            // Fetch access and refresh tokens from localStorage
            let { access: accessToken, refresh: refreshToken } = JSON.parse(localStorage.getItem('authTokens')) || {};

            // Verify the access token
            let response = await axios.post('/api/user/token/verify/', { token: accessToken });
            if (response.status !== 200) {
                // Access token is expired, refresh it
                response = await axios.post('/api/user/token/refresh/', { refresh: refreshToken });
                const { access, refresh } = response.data;

                // Update the tokens in localStorage
                localStorage.setItem('authTokens', JSON.stringify({ access, refresh }));

                // Update the access token in the request config
                config.headers['Authorization'] = `Bearer ${access}`;
            } else {
                // Access token is valid, no need to refresh
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
        } catch (error) {
            // Handle error during token verification or refresh
            console.error('Error refreshing access token:', error);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;