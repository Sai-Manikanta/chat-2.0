import { createContext, useState } from 'react'

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [loginDetails, setLoginDetails] = useState({
        name: null,
        isLogin: false
    });

    return (
        <AuthContext.Provider value={{
            ...loginDetails,
            setLoginDetails
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
