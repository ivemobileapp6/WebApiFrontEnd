import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [userType, setUserType] = useState(localStorage.getItem('userType'));

  const value = {
    authToken,
    setAuthToken,
    username,
    setUsername,
    userType,
    setUserType,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};