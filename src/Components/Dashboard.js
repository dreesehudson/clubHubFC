import React, { useState, useEffect } from 'react';
import {
    Jumbotron, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input
} from 'reactstrap';
import { useBearer } from '../utilities/BearerContext'
import { axiosHelper } from '../utilities/axiosHelper'
import Schedule from '../Components/Schedule'

function Dashboard() {
    const { bearer } = useBearer();
    const [user, setUser] = useState({})
    const [players, setPlayers] = useState({})
    const [selectedPlayer, setSelectedPlayer] = useState({})
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);


    const storeUser = (response) => {
        setUser(response)
        console.log(response)
    }
    const storePlayers = (response) => {
        setPlayers(response)
        console.log(response)
    }

    useEffect(() => {
        axiosHelper({
            url: '/api/user',
            fun: storeUser,
            bearer
        })
    }, [bearer])

    useEffect(() => {
        axiosHelper({
            url: '/getPlayers/',
            storePlayers
        })
    }, [selectedPlayer]);

    return (
        <>
            {/* HELP TO USE HIDDEN INPUT WITH DROPDOWN */}
            <Input hidden value={setSelectedPlayer} />
            <ButtonDropdown className="mt-5" isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle className="mt-5" caret>
                    Select Your Player
                </DropdownToggle>
                <DropdownMenu>
                    {(Object.keys(user).length > 0) &&
                        user.players.map((item, idx) => {
                            return (
                                <DropdownItem key={idx}>
                                    {item.first_name} {item.last_name}
                                </DropdownItem>
                            )
                        })}
                </DropdownMenu>
            </ButtonDropdown>

            { selectedPlayer &&
                <Jumbotron className="mt-3 text-left">
                    <h1 className="display-4">Selected Player's Team</h1>
                    {/* <p>Team Color: {selectedPlayer.team.color}</p>
                    <p>Practice Night: {selectedPlayer.team.practice_night}</p> */}
                    {/* <p>Parent: {user.email}</p>
                    <p>isAdmin: {user.isAdmin}</p> */}
                    <Schedule />
                    <hr className="my-2" />
                </Jumbotron>
            }
        </>
    );
};

export default Dashboard;



