import React from 'react';
import UserLogIn from './UserLogIn';
import RegisterUser from './RegisterUser';

function Anonymous() {
    return (
        <>
            <UserLogIn className="mt-5" />
            <RegisterUser className="mt-5" />
        </>

    )
}

export default Anonymous