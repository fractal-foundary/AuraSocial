import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {

    let [user, setUser] = useState(null)
    let [username, setUsername] = useState(null)
    let [authtokens, setauthtokens] = useState(null)

    // I want this fetchJwtTokens method to just fetch jwt tokens, save them and set user.
    let fetchJwtTokens = async (e, username) => {
        e.preventDefault()

        const response = await axios.get('/api/user/token/');

        let data = await response.data;

        if (data) {
            localStorage.setItem('authTokens', data);
            setUser(jwtDecode(data.access));
            setauthtokens(data)
            setUsername(username);
            return data;
        } else {
            throw new Error('Something went wrong while "fetching the jwt tokens" and registering in the user!')
        }
    }

    // this method handles logout of the user.
    let logoutUser = (e) => {
        e.preventDefault()
        localStorage.removeItem('authTokens')
        setauthtokens(null)
        setUser(null)
    }

    const updateToken = async () => {
        const response = await fetch('/api/user/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: authtokens?.refresh })
        })

        const data = await response.json()
        if (response.status === 200) {
            setauthtokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

        if (loading) {
            setLoading(false)
        }
    }


    let contextData = {
        user: user,
        username: username,
        authtokens: authtokens,
        fetchJwtTokens: fetchJwtTokens,
        logoutUser: logoutUser,
    }

    useEffect(() => {
        const REFRESH_INTERVAL = 1000 * 60 * 4 // 4 minutes
        let interval = setInterval(() => {
            if (authtokens) {
                updateToken()
            }
        }, REFRESH_INTERVAL)
        return () => clearInterval(interval)

    }, [authtokens])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
