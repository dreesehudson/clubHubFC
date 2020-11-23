import React, { useState } from 'react';
import UserLogIn from './UserLogIn.js'
import RegisterUser from './RegisterUser.js'
import Dashboard from './Dashboard.js'
import shield from '../img/shield.png'
import { Row, Col } from 'reactstrap'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function FrontPage() {

    const [bearer, setBearer] = useState("");

    return (
        <>
            {/* //if user is logged in, show dashboard */}
            <Dashboard className="mt-5" />
            {/* //else user is not logged in, show league logo and sign in options (log in or sign up buttons) */}
            <Row className="mt-5 d-flex justify-content-center">
                <img className="w-25 m-2 mt-5" alt="logo" src={shield} />
            </Row>
            <Row className="d-flex justify-content-center">
                <UserLogIn
                    bearer={bearer}
                    setBearer={setBearer}
                />
                <RegisterUser />
            </Row>
        </>
    );
}

export default FrontPage;
