import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
    const { loginWithRedirect, isAuthenticated, logout, user, isLoading, error } = useAuth0();
    const [myUser, setMyUser] = useState(null);

    localStorage.setItem('user', JSON.stringify(user))

    useEffect(() => {
        setMyUser(user)
    }, [user]);

  return (
    <UserContext.Provider value={{
        loginWithRedirect, isAuthenticated, logout, myUser, isLoading, error
    }}>
        {children}
    </UserContext.Provider>
  )
}


export const useUserContext = () => {
    return useContext(UserContext)
}