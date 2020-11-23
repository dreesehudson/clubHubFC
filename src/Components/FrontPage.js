import React, { useState }from 'react';
import UserLogIn from './UserLogIn.js'
import RegisterUser from './RegisterUser.js'

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
            <p>logo</p>
            <UserLogIn
                bearer={bearer}
                setBearer={setBearer}
            />
            <RegisterUser />
        {/* //if user is not logged in, show league logo and sign in options (log in or sign up buttons) */}
        </>
    );
}

export default FrontPage;
