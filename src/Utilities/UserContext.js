import React, { useState, useContext, createContext } from "react";

const userContext = createContext({});

export default userContext;

export function UserProvider({ children }) {
    const user = UserHelper();
    return <userContext.Provider value={user}>{children}</userContext.Provider>;
}

export const useUser = () => useContext(userContext);


function UserHelper() {
    const [userDetails, setUserDetails] = useState({});

    return {
        userDetails, setUserDetails

    }
}