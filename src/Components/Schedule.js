import React, { useState, useEffect } from 'react';
import { useBearer } from '../utilities/BearerContext';
import {
    CardBody, Card, Table
} from 'reactstrap';
import { axiosHelper } from '../utilities/axiosHelper'

function Schedule(props) {
    const { bearer } = useBearer();

    const [allGames, setAllGames] = useState([]);
    const [homeGames, setHomeGames] = useState([]);
    const [awayGames, setAwayGames] = useState([]);
    const [teamSchedule, setTeamSchedule] = useState([]);

    function storeAllData(data){
        setAllGames(data)
        const tempHomeGames = data.filter((game) =>  game.home_team_id === props.team.id )
        const tempAwayGames = data.filter((game) =>  game.away_team_id === props.team.id )
        setHomeGames(tempHomeGames)
        setAwayGames(tempAwayGames)
        setTeamSchedule([...tempHomeGames, ...tempAwayGames])
    }

    useEffect(() => {
        axiosHelper({
            url: '/getSchedules',
            fun: storeAllData
        });
    }, [allGames.length])

    return (
        <>
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
        </>
    )
}

export default Schedule
