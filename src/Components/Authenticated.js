import React, { useState, useEffect } from 'react';
import { axiosHelper } from '../utilities/axiosHelper';
import Admin from './Admin';
import Dashboard from './Dashboard';
import { useBearer } from '../utilities/BearerContext'



function Authenticated() {

    const { bearer } = useBearer();
    const [user, setUser] = useState({})

    const storeUser = (response) => {
        setUser(response)
        console.log(response)
    }

    useEffect(() => {
        axiosHelper({
            url: '/api/user',
            fun: storeUser,
            bearer
        })
    }, [bearer])

    return (
        <>
            {user.isAdmin ?
                <Admin className="mt-5"/>
                :
                <Dashboard className="mt-5" />
            }
        </>

    )
}

export default Authenticated