import React, { useState, useEffect, useContext } from 'react';

const BearerContext = React.createContext({});

export const AppProvider = (props) => {
    const initialContext = BearerHelper()
    return (
        <BearerContext.Provider value={initialContext}>
            {props.children}
        </BearerContext.Provider>
    )
}

export default BearerContext;
export const useBearer = () => useContext(BearerContext);


function BearerHelper() {
    const [bearer, setBearer] = useState("");
    
    function saveBearer(newBearer){
        setBearer(newBearer)
        window.localStorage.setItem('bearer', newBearer)
    }

    function logOut(){
        setBearer("");
        window.localStorage.removeItem('bearer');
    }

    useEffect(()=>{
        const lsBearer = window.localStorage.getItem('bearer')
        //console.log(lsBearer);
        if(lsBearer){
            setBearer(lsBearer)
        }
    }, [])
    
    return {
        bearer, saveBearer, logOut
    };

}