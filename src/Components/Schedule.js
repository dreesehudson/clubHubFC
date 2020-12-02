import React, { useState, useEffect } from 'react';
import {
    Collapse, Button, CardBody, Card, Table
} from 'reactstrap';
import { useBearer } from '../utilities/BearerContext'

function Schedule() {

    const [isOpen, setIsOpen] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Button className="mt-3" color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Schedule</Button>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody>
                        <Table className="table table-hover">
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
                                {schedule.map((item, idx) =>
                                    <tr key={idx}>
                                        <td>{item.type}</td>
                                        <td>{item.date}</td>
                                        <td>{item.home_team}</td>
                                                if ({item.type} = 'Match')
                                                    {<td>'vs.'</td>}
                                                    else {<td></td>}
                                        <td>{item.away_team}</td>
                                        <td>{item.time}</td>
                                    </tr>
                                )}

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
        </>
    )
}

export default Schedule