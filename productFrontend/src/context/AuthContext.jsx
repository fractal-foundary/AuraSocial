import { createContext, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext()

// export default AuthContext;

export const AuthProvider = ({ children }) => {

    let [user, setUser] = useState(null)
    let [authTokens, setAuthTokens] = useState(null)

    // I want this fetchJwtTokens method to just fetch jwt tokens, save them and set user.
    let fetchJwtTokens = async (e) => {
        e.preventDefault()
        const response = await axios.post('/api/user/token/');

        let data = await response.data;

        if (data) {
            localStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data)
            // decoding the access_token we got from the backend.
            // it contains the username of the user.So, setUser is just contains the username.
            setUser(jwtDecode(data.access))
        } else {
            alert('Something went wrong while "fetching the jwt tokens" and registering in the user!')
        }
    }

    // this method handles logout of the user.
    let logoutUser = (e) => {
        e.preventDefault()
        localStorage.removeItem('authTokens')
        setAuthTokens(null)
        setUser(null)
    }

    let contextData = {
        user: user,
        authTokens: authTokens,
        fetchJwtTokens: fetchJwtTokens,
        logoutUser: logoutUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => React.useContext(AuthContext)
