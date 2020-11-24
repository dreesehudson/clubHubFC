import React, { useState } from 'react';
import {
    Collapse, Jumbotron, Button, CardBody, Card, Table
} from 'reactstrap';
import BearerContext from '../utilities/BearerContext';

function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Jumbotron className="mt-3 text-left">
                <h1 className="display-4">Team Name</h1>
                <p className="ml-4 lead">Coach Smith</p>
                <Button className="mt-3" color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Schedule</Button>
                <Collapse isOpen={isOpen}>
                    <Card>
                        <CardBody>
                            <Table class="table table-hover">
                                <thead>
                                    <tr>
                                        {/* <th scope="col">Number</th> */}
                                        <th scope="col">Type</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Home</th>
                                        <th scope="col"></th>
                                        <th scope="col">Away</th>
                                        <th scope="col">Time</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Match</td>
                                        <td>11/24/20</td>
                                        <td>Galaxy</td>
                                        <td>vs.</td>
                                        <td>United</td>
                                        <td>12:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td>Practice</td>
                                        <td>11/27/20</td>
                                        <td>Galaxy</td>
                                        <td></td>
                                        <td></td>
                                        <td>12:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td>Match</td>
                                        <td>11/30/20</td>
                                        <td>Galaxy</td>
                                        <td>vs.</td>
                                        <td>United</td>
                                        <td>12:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td>Match</td>
                                        <td>12/4/20</td>
                                        <td>Galaxy</td>
                                        <td>vs.</td>
                                        <td>United</td>
                                        <td>12:00 PM</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Collapse>
                <hr className="my-2" />

            </Jumbotron>
        </ >
    );
    //register link to add another child
    //schedule accordion
    //chat window
};

export default Dashboard;