import React, { useState, useEffect } from 'react';
import {
    Col, Jumbotron

} from 'reactstrap';
import Schedule from '../Components/Schedule'
import { axiosHelper } from '../utilities/axiosHelper'


function PlayerJumbotron(props) {
    const [player, setPlayer] = useState(props.player);
    const [team, setTeam] = useState({});
    const [teamID, setTeamID] = useState(props.player.team_id);

    const storeTeam = (response) => { setTeam(response) }

    useEffect(() => {
        if (player.team_id) {
            axiosHelper({
                url: `/getTeam/${player.team_id}`,
                fun: storeTeam
            })
        }
    }, [player])

    //console.log({team})

return (
    <Col className="col-12 mt-3">
        <Jumbotron className="mt-3 text-left">
            <h2 className="display-4">{player.first_name} {player.last_name}</h2>
            <h3 className="display-5">{team.name}</h3>
            <Schedule
                team={team}
            />
        </Jumbotron>
    </Col>

)
}

export default PlayerJumbotron