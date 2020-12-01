import React, { useState, useEffect } from 'react';
import TeamSelector from './TeamSelector'
import Anonymous from './Anonymous'
import Dashboard from './Dashboard'
import Admin from './Admin'
import shield from '../img/shield.png'
import { Row } from 'reactstrap'
import { useBearer } from '../utilities/BearerContext'
import axios from 'axios';


function FrontPage() {
    const { bearer } = useBearer();
    const [user, setUser] = useState();

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/user',
            data: {},
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${bearer}`
            }
        })
            .then(res => {
                setUser(res.data)
                //console.log(res)
                console.log(user)
            })
            .catch(err => console.log('error: ', err));

    }, [bearer])

    return (
        <>
            {bearer ?

                <>
                    <TeamSelector />
                    <Dashboard className="mt-5" />


                </>
                :
                <>
                    {/* else show the log in screen */}
                    <Row className="mt-5 d-flex justify-content-center">
                        <img className=" pt-5 w-50 m-5 mt-5" alt="logo" src={shield} />
                    </Row>
                    <Row className="d-flex justify-content-center mb-5">
                        <Anonymous />
                    </Row>
                </>
            }
        </>
    );
}

export default FrontPage;
