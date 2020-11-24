import React, { useState } from 'react';
import {
    Collapse, Jumbotron, Button, CardBody, Card, Table,
    ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import BearerContext from '../utilities/BearerContext';

function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Jumbotron className="mt-5 text-left">
                <h1 className="display-4">Team Name</h1>
                <p className="ml-4 lead">Coach Smith</p>
                <Button className="mt-3" color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Schedule</Button>
                <Collapse isOpen={isOpen}>
                    <Card>
                        <CardBody>
                            <Table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td colspan="2">Larry the Bird</td>
                                        <td>@twitter</td>
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