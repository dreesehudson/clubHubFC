import React, { useContext } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import BearerContext from '../utilities/BearerContext';


function Dashboard() {
    return (
        <div>
            <Jumbotron className="text-left">
                <h1 className="display-4">Hello Name</h1>
                <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-2" />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <p className="lead">
                    <Button color="primary">Learn More</Button>
                </p>
            </Jumbotron>
        </div>
    );
    //register link to add another child
    //schedule accordion
    //chat window
};

export default Dashboard;