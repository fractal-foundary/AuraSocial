// This creates a customized instance of axios with some default settings:
// baseURL: '/api/': All requests will be prefixed with this URL.
// headers: Sets the default Content-Type to JSON.
// withCredentials: true: Allows the browser to send cookies with cross-origin requests.

import axios from 'axios';

const api = axios.create({
    baseURL: 'api/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

api.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const exchangeTokens = (code) => {
    // { code } == {code: code}
    return api.post("social_accounts/api/token/new/", { code });
}

export const renewTokens = (refreshToken) => {
    return api.post("social_accounts/api/token/refresh/", { "refresh_token": refreshToken });
}


export default api;