// This creates a customized instance of axios with some default settings:
// baseURL: '/api/': All requests will be prefixed with this URL.
// headers: Sets the default Content-Type to JSON.
// withCredentials: true: Allows the browser to send cookies with cross-origin requests.

import axios from 'axios';
import { fetchCsrfToken, getCsrfToken } from './lib/csrfToken';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

api.interceptors.request.use(async (config) => {
    if (!getCsrfToken()) {
        await fetchCsrfToken();
    }
    config.headers['X-CSRFToken'] = getCsrfToken();
    return config;
});

export default api;