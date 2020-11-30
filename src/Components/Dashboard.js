import React, { useState, useEffect } from 'react';
import {
    Jumbotron
} from 'reactstrap';
import { useBearer } from '../utilities/BearerContext'
import Schedule from '../Components/Schedule'
import axios from 'axios';

function Dashboard() {
    const { bearer } = useBearer();
    const [user, setUser] = useState({}) 
    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     }
    // }, [input])

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/user',
            data: { },
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${bearer}`
            }
        }
        )
            .then(res => setUser(res.data))
            .catch(err => console.log('error: ', err));

    }, [bearer]);

    return (
        <>
            <Jumbotron className="mt-3 text-left">
                <h1 className="display-4">Team Name</h1>
                <p className="ml-4 lead">Coach Smith</p>
                <p>Parent: {user.email}</p>
                <Schedule />
                {/* <Chat/> */}
                <hr className="my-2" />

            </Jumbotron>
        </>
    );
    //register link to add another child
    //schedule accordion
    //chat window
};

export default Dashboard;