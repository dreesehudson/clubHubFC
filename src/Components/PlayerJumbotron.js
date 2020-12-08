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
    const [bgColor, setBGColor] = useState("");
    const [textColor, setTextColor] = useState("");
    const [canRender, setCanRender] = useState(false);

    function storeTeam(data){
        setTeam(data);
        setBGColor(data.color);
        determineColors(data.color.toLowerCase());
    }

    function determineColors(bg) {
        const text = pickTextColor(colors[bg], 'white', 'black');
        setTextColor(text);
        setCanRender(true);
    }

    function pickTextColor(bg, lightColor, darkColor) {
        let color = (bg.charAt(0) === '#') ? bg.substring(1, 7) : bgColor;
        let r = parseInt(color.substring(0, 2), 16); // hexToR
        let g = parseInt(color.substring(2, 4), 16); // hexToG
        let b = parseInt(color.substring(4, 6), 16); // hexToB
        return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 100) ?
            darkColor : lightColor;
    }
    
    useEffect(() => {
        setCanRender(true)
    }, [textColor]);

    useEffect(() => {
        if (player.team_id) {
            axiosHelper({
                url: `/getTeam/${player.team_id}`,
                fun: storeTeam
            })
        }
    }, [Object.keys(player).length])

    const dynamicStyles = {
        color: `${textColor}`,
        background: `${bgColor}`
    }


    return (
        <>
            { canRender &&
                <Col className="col-12 mt-3">
                    <Jumbotron style={dynamicStyles} className="mt-3 text-left">
                        <h2 className="display-4">{player.first_name} {player.last_name}</h2>
                        <h3 className="display-5">{team.name}</h3>
                        {team.id &&
                            <Schedule
                                team={team}
                            />
                        }
                    </Jumbotron>
                </Col>
            }
        </>
    )
}

export default PlayerJumbotron