import { Navigate } from 'react-router-dom'
import { useState } from 'react'

const PrivateRoute = ({ children, ...rest }) => {
    let [user, setUser] = useState(null)

    return !user ? <Navigate to='/landingPage' /> : children;
}

export default PrivateRoute;