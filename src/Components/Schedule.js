import React, { useState, useEffect } from 'react';
import {
    CardBody, Card, Table
} from 'reactstrap';
import { useBearer } from '../utilities/BearerContext'
import { axiosHelper } from '../utilities/axiosHelper'

function Schedule(props) {

    const [schedule, setSchedule] = useState([]);
    const [player, setPlayer] = useState(props.player);
    //const [team, setTeam] = useState(props.player.team);
    // const storeTeam = (response) => {
    //     setTeam(response)
    // }

    // useEffect(() => {
    //         axiosHelper({
    //             url: `/getTeam/${team.id}`,
    //             fun: setTeam
    //         })
        
    // }, [player])

    return (
        <>
            <h3 className="mt-3 display-5" style={{ marginBottom: '1rem' }}>Schedule</h3>
            <Card>
                <CardBody>
                    <Table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Type</th>
                                <th scope="col">Date</th>
                                <th scope="col">Home</th>
                                <th scope="col"></th>
                                <th scope="col">Away</th>
                                <th scope="col">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!schedule ?
                                <tr>
                                    <td>
                                    <h3 className='mt-4'>
                                        No Events Scheduled Yet
                                    </h3>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                :
                                schedule.map((item, idx) =>
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
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </>
    )
}

export default Schedule