import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        const loggedInStatus = JSON.parse(localStorage.getItem("loggedIn"));
        const storedAuth = JSON.parse(localStorage.getItem("auth"));
        const storedUserID = localStorage.getItem("userID");
    
        if (loggedInStatus && storedAuth && storedUserID) {
          // console.log("UserID in AuthProvider: ", storedUserID); // Add this line to check the value of userID
          setLoggedIn(loggedInStatus);
          setAuth(storedAuth);
          setUserID(storedUserID);
        }
      }, []);
      
    return (
        <AuthContext.Provider value={{auth, setAuth, loggedIn, setLoggedIn, userID, setUserID }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;