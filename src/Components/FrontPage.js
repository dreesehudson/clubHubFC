import React, { } from 'react';
import UserLogIn from './UserLogIn'
import TeamSelector from './TeamSelector'
import RegisterUser from './RegisterUser'
import Dashboard from './Dashboard'
import shield from '../img/shield.png'
import { Row } from 'reactstrap'
import { useBearer } from '../utilities/BearerContext'

function FrontPage() {
    const { bearer } = useBearer();
    return (
        <>
            {bearer ?
                <>
                    { true ? 
                        /* if user has a player registered display dashboard */
                        <>
                            <TeamSelector />
                            <Dashboard className="mt-5" />
                        </>
                        :
                        /* else show instructions to register player */
                        <h3 className="mt-5 pt-5">Register Your Athlete!</h3>
                    }
                </>
                :
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
