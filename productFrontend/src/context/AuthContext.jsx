import { createContext, useState } from 'react'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {

    let [user, setUser] = useState(null)
    let [authTokens, setAuthTokens] = useState(null)

    let loginUser = async (e) => {
        e.preventDefault()
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