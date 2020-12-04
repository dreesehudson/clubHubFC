import React, { useState, useEffect } from 'react';
import {
    Col, Jumbotron

} from 'reactstrap';
import Schedule from '../Components/Schedule'
import { useBearer } from '../utilities/BearerContext'
import { axiosHelper } from '../utilities/axiosHelper'


function PlayerJumbotron(props) {
    const { bearer } = useBearer();
    const [player, setPlayer] = useState(props.player);
    const [teams, setTeams] = useState({});
    const [team_id, setTeamID] = useState(props.player.ref_team_id);

    const storePlayers = (response) => {
        setTeams(response)
    }

    useEffect(() => {
        axiosHelper({
            url: `/getPlayer/`,
            fun: storePlayers
        })
    }, [bearer])

    return (
        <Col className="col-12 mt-3">
            <Jumbotron className="mt-3 text-left">
                <h1 className="display-4">{player.first_name} {player.last_name}</h1>
                {/* <h1 className="display-5">{team.name}</h1> */}
                <Schedule
                />
            </Jumbotron>
        </Col>

    )
}

export default PlayerJumbotron