import axios from 'axios';

let csrfToken = null;

export const fetchCsrfToken = async () => {
    if (csrfToken === null) {
        const response = await axios.get('http://127.0.0.1:8000/csrfToken/');
        csrfToken = response.data.csrfToken;
    }
    return csrfToken;
};

export const getCsrfToken = () => csrfToken;