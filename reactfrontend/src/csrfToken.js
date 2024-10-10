/* 
import axios from 'axios';

let csrfToken = null;
let tokenPromise = null;

// TODO: I need to figure out why "fetchCsrfToken" is fetching the csrfToken only one time.
export const fetchCsrfToken = async () => {
    if (csrfToken) return csrfToken;

    if (!tokenPromise) {
        tokenPromise = axios.get('http://127.0.0.1:8000/csrfToken/', { withCredentials: true })
            .then(response => {
                csrfToken = response.data.csrfToken;
                return csrfToken;
            })
            .catch(error => {
                console.error('Error fetching CSRF token:', error);
                tokenPromise = null;
                throw error;
            });
    }

    return tokenPromise;
};

export const getCsrfToken = () => csrfToken; 
*/