import React, { useState, useEffect } from 'react';
import {
    Jumbotron
} from 'reactstrap';
import { useBearer } from '../utilities/BearerContext'
import Schedule from '../Components/Schedule'
//import Chat from '../Components/Chat'

function Dashboard() {

    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     }
    // }, [input])


    return (
        <>
            <Jumbotron className="mt-3 text-left">
                <h1 className="display-4">Team Name</h1>
                <p className="ml-4 lead">Coach Smith</p>
                <Schedule/>
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