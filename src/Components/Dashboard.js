import React, { useState, useEffect } from 'react';
import {
    Jumbotron, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { useBearer } from '../utilities/BearerContext'
import Schedule from '../Components/Schedule'
import { axiosHelper } from '../utilities/axiosHelper'

function Dashboard() {
    const { bearer } = useBearer();
    const [user, setUser] = useState({})
    const [players, setPlayers] = useState({})
    const [selectedPlayer, setSelectedPlayer] = useState({})
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);

    useEffect(() => {
        axiosHelper({
            url: 'api/user',
            bearer,
            setUser
        })
    }, [bearer]);

    useEffect(() => {
        axiosHelper({
            url: 'http://localhost:8000/getPlayers/',
            setPlayers
        })
    }, [selectedPlayer]);

    console.log(players);

    return (
        <>
            {/* if user.players.length = 0 then show instructions to register a player */}
            {/* if user.players.length = 1 then show dashboard of players of team */}

            { selectedPlayer &&
                <Jumbotron className="mt-3 text-left">
                    <h1 className="display-4">Team Name</h1>
                    <p>Parent: {user.email}</p>
                    <p>isAdmin: {user.isAdmin}</p>
                    <Schedule />
                    <hr className="my-2" />
                </Jumbotron>
            }
        </>
    );
    //register link to add another child
    //schedule accordion
    //chat window
};

export default Dashboard;
