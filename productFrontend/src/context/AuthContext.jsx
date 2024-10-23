import { createContext, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

// export default AuthContext;

export const AuthProvider = ({ children }) => {

    let [user, setUser] = useState(null)
    let [authTokens, setAuthTokens] = useState(null)

    const navigate = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault()
        const response = await fetch('/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: e.target.username.value, password: e.target.password.value })
        });

        let data = await response.json();

        if (data) {
            localStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            navigate('/')
        } else {
            alert('Something went wrong while loggin in the user!')
        }
    }

    let logoutUser = (e) => {
        e.preventDefault()
    }

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => React.useContext(AuthContext)
