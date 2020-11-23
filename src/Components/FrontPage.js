import React, { useState } from 'react';
import UserLogIn from './UserLogIn.js'
import RegisterUser from './RegisterUser.js'
import Dashboard from './Dashboard.js'
import shield from '../img/shield.png'
import { Row } from 'reactstrap'

// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
// } from "react-router-dom";

function FrontPage() {
    return (
        <>
            if (bearer) {
                <Dashboard className="mt-5" />
            } else {
                <>
                    <Row className="mt-5 d-flex justify-content-center">
                        <img className="w-25 m-2 mt-5" alt="logo" src={shield} />
                    </Row>
                    <Row className="d-flex justify-content-center">
                        <UserLogIn />
                        <RegisterUser />
                    </Row>
                </>
            }
        </>
    );
}

export default FrontPage;
