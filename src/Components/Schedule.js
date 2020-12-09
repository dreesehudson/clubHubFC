import React, { useState, useEffect } from 'react';
import {
    CardBody, Card, Table
} from 'reactstrap';
import { axiosHelper } from '../utilities/axiosHelper'

function Schedule(props) {

    const [team, setTeam] = useState(props.team);
    const [teamSchedule, setTeamSchedule] = useState([]);
    const [canRender, setCanRender] = useState(false);

    function storeAllData(data) {
        const tempHomeGames = data.filter((game) => game.home_team_id === props.team.id)
        const tempAwayGames = data.filter((game) => game.away_team_id === props.team.id)
        setTeamSchedule([...tempHomeGames, ...tempAwayGames])
        console.log(teamSchedule)
        //      teamSchedule.map((game) => { return game.date = new Date(`${game.date}Z`)})
        teamSchedule.sort(function (a, b) {
            a = a.date.split('/').reverse().join('');
            b = b.date.split('/').reverse().join('');
            // return a > b ? 1 : a < b ? -1 : 0;
            return a.localeCompare(b); 
            console.log('hi')
        })
        console.log(teamSchedule)
    }

    useEffect(() => {
        axiosHelper({
            url: '/getSchedules',
            fun: storeAllData
        });

    }, [team.id])

    useEffect(() => {
        console.log('can render switch')
        setCanRender(true)
    }, [teamSchedule[0]]);

    return (
        <>
            {canRender &&
                <div style={{ opacity: .85 }}>
                    <h3 className="mt-3 display-5" style={{ marginBottom: '1rem' }}>Schedule</h3>
                    <Card>
                        <CardBody>
                            <Table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Home</th>
                                        <th scope="col"></th>
                                        <th scope="col">Away</th>
                                        <th scope="col">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teamSchedule.map((item, idx) =>
                                        <tr key={idx}>
                                            <td>{item.date}</td>
                                            <td>{item.home_team.name}</td>
                                            <td>vs.</td>
                                            <td>{item.away_team.name}</td>
                                            <td>{item.time}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </div>
            }
        </>
    )
}

export default Schedule