import React, { useState } from 'react';
import UserLogIn from './UserLogIn'
import TeamSelector from './TeamSelector'
import RegisterUser from './RegisterUser'
import Dashboard from './Dashboard'
import shield from '../img/shield.png'
import { Row } from 'reactstrap'
import { useBearer } from '../utilities/BearerContext'
import { useAdmin } from '../utilities/AdminContext'

// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
// } from "react-router-dom";

function FrontPage() {
    const { bearer } = useBearer();
    return (
        <>

            {bearer &&
                <>
                    <TeamSelector />
                    <Dashboard className="mt-5" />
                </>}
            {!bearer &&
                <>
                    <Row className="mt-5 d-flex justify-content-center">
                        <img className=" pt-5 w-50 m-5 mt-5" alt="logo" src={shield} />
                    </Row>
                    <Row className="d-flex justify-content-center mb-5">
                        <UserLogIn />
                        <RegisterUser />
                    </Row>
                </>
            }
        </>
    );
}

export default FrontPage;
