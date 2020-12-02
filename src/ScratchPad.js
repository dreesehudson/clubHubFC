import React, { useState, useEffect } from 'react';
import { useBearer } from '../utilities/BearerContext';

import { axiosHelper } from './utilities/axiosHelper'
import './App.css';



function ScratchPad() {
    const [user, setUser] = useState({});

    useEffect(() => {
        axiosHelper({
            url: '/api/user',
            bearer,
            setUser
        });
    },[])
        return (
        <div className="App container-fluid">

        </div>
    );

}
export default ScratchPad;
