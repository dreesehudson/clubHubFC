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
    const [isAdmin, setIsAdmin] = useState(false);
    //const [adminMode, setAdminMode] = useState("");

    function saveIsAdmin(newIsAdmin){
        setIsAdmin(newIsAdmin)
        window.sessionStorage.setItem('isAdmin', newIsAdmin)
    }

    useEffect(() => {
        const ssAdmin = window.sessionStorage.getItem('admin')
        if(ssAdmin){
            setIsAdmin(ssAdmin)
        }
    }, [])
    return {
        isAdmin, saveIsAdmin
    };

}