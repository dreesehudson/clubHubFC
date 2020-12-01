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
            })
            .catch(err => console.log('error: ', err));

            //console.log(user);
    }, [bearer]);

    console.log(user);

    return (
        <>
            {/* if user.players.length = 0 then show instructions to register a player */}
            {/* if user.players.length = 1 then show dashboard of players of team */}

            <Jumbotron className="mt-3 text-left">
                <h1 className="display-4">Team Name</h1>
                <p>Parent: {user.email}</p>
                <p>isAdmin: {user.isAdmin}</p>
                <Schedule />
                <hr className="my-2" />
            </Jumbotron>
        </>
    );
    //register link to add another child
    //schedule accordion
    //chat window
};

export default Dashboard;