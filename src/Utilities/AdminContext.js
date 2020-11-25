import React, { useState, useEffect, useContext } from 'react';

const AdminContext = React.createContext({});

export const AppProvider = (props) => {
    const initialContext = AdminHelper()
    return (
        <AdminContext.Provider value={initialContext}>
            {props.children}
        </AdminContext.Provider>

    )
}

export default AdminContext;
export const useAdmin = () => useContext(AdminContext);

function AdminHelper() {
    const [adminMode, setAdminMode] = useState("");

    function saveAdminMode(newAdminMode){
        setAdminMode(newAdminMode)
        window.localStorage.setItem('adminMode', newAdminMode)
    }

    function toggleAdminMode(){
        setAdminMode(!adminMode);
        console.log(adminMode);
        saveAdminMode(adminMode);
    }

    useEffect(() => {
        const lsAdminMode = window.localStorage.getItem('adminMode')
        if(lsAdminMode){
            setAdminMode(lsAdminMode)
        }
    }, [])
    return {
        adminMode, saveAdminMode, toggleAdminMode
    };

}