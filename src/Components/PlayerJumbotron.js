import React, { useState, useEffect } from 'react';
import {
    Col, Jumbotron

} from 'reactstrap';
import Schedule from '../Components/Schedule'
import { axiosHelper } from '../utilities/axiosHelper'
import { colors } from '../utilities/colors'

function PlayerJumbotron(props) {
    const [player, setPlayer] = useState(props.player);
    const [team, setTeam] = useState({});
    const bgColor = team.color;
    //const textcolor = TEXTColor.findTextColor(bgColor);
    const storeTeam = (response) => { setTeam(response) }
    // const bgR = colors.bgColor[0]; //R value of team color
    // const bgG = colors.bgColor[1]; //G value of team color
    // const bgB = colors.bgColor[2]; //B value of team color

    // if (colors.hasOwnProperty(bgColor)) {
        
    // }
    //     //invert RGB values to give proper text contrasting color
    //     const iR = (255 - bgR);
    //     const iG = (255 - bgG);
    //     const iB = (255 - bgB);


    // const styles = {
    //     color: `rgb(${iR}, ${iG}, ${iB})`,
    //     background: `${team.color}`
    // }

    // $('#test').css('color', 'rgb(' + ir + ',' + ig + ',' + ib + ')');
    useEffect(() => {
        if (player.team_id) {
            axiosHelper({
                url: `/getTeam/${player.team_id}`,
                fun: storeTeam
            })
        }
    }, [player.length])

    return (
        <Col className="col-12 mt-3">
            <Jumbotron className="mt-3 text-left">
                <h2 className="display-4">{player.first_name} {player.last_name}</h2>
                <h3 className="display-5">{team.name}</h3>
                {team.id &&
                    <Schedule
                        team={team}
                    />
                }
            </Jumbotron>
        </Col>

    )
}

export default PlayerJumbotron