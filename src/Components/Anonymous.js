import React from 'react';
import UserLogIn from './UserLogIn';
import RegisterUser from './RegisterUser';
import shield from '../img/shield.png';
import { Row } from 'reactstrap';

function Anonymous() {
    return (
        <>
            <Row className="mt-5 d-flex justify-content-center">
                <img className=" pt-5 w-50 m-5 mt-5" alt="logo" src={shield} />
            </Row>
            <UserLogIn className="mt-5" />
            <RegisterUser className="mt-5" />
        </>

    )
}

export default Anonymous