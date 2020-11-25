import React, { useState, useEffect, useContext } from 'react';

const UserContext = React.createContext({});

export const AppProvider = (props) => {
    const initialContext = UserHelper()
    return (
        <UserContext.Provider value={initialContext}>
            {props.children}
        </UserContext.Provider>

    )
}

export default UserContext;
export const useUser = () => useContext(UserContext);

function UserHelper() {
    const [user, setUser] = useState("");
    function saveUser(newUser){
        setUser(newUser)
        window.localStorage.setItem('User', newUser)
    }

    function userLogOut(){
        setUser("");
        window.localStorage.removeItem('User');
    }

    useEffect(()=>{
        const lsUser = window.localStorage.getItem('User')
        console.log(lsUser);
        if(lsUser){
            setUser(lsUser)
        }
    }, [])
    return {
        user, saveUser, userLogOut
    };

}