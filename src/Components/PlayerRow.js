import React, { useState } from "react";
import { axiosHelper } from '../utilities/axiosHelper';
import {
    Button, Input
} from 'reactstrap';

const PlayerRow = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [player, setPlayer] = useState(props.player);
    const [id, setID] = useState(props.player.id);
    const [firstName, setFirstName] = useState(props.player.first_name);
    const [lastName, setLastName] = useState(props.player.last_name);
    const [teamID, setTeamID] = useState(props.player.team_id);
    const [userID, setUserID] = useState(props.player.user_id);

    const [teams, setTeams] = useState(props.teams);
    const [playerTeam, setPlayerTeam] = useState({});

    function editPlayerRow({ firstName, lastName, teamID, userID }) {
        axiosHelper({
            method: 'put',
            url: `/editPlayer/${id}`,
            data: {
                first_name: firstName,
                last_name: lastName,
                team_id: teamID,
                user_id: userID
            }
        })
            .then(
                setPlayer({
                    first_name: firstName,
                    last_name: lastName,
                    team_id: teamID,
                    user_id: userID
                })
            )
    }

    function deletePlayerRow() {
        axiosHelper({
            method: 'delete',
            url: `/deletePlayer/${id}`,
        })
    }

    return (
        <>
            {!editMode ?
                <tr key={props.idx}>
                    <th scope="row">{props.player.id}</th>
                    <td>{player.first_name}</td>
                    <td>{player.last_name}</td>
                    <td>{player.name}</td>
                    <td></td>
                    {/* <td>{user.name}</td> */}
                    {/* <td>{user.email}</td> */}
                    <td><Button className="btn-warning"
                        onClick={() => setEditMode(true)}
                    >Edit</Button></td>
                    <td><Button className="btn-danger"
                        onClick={() => deletePlayerRow(player.id)}
                    >Delete</Button></td>
                </tr>
                :
                <>
                    <tr>
                        <th scope="row">{player.id}</th>
                        <td><Input defaultValue={player.first_name}
                            onChange={e => setFirstName(e.target.value)}></Input></td>
                        <td><Input defaultValue={player.last_name}
                            onChange={e => setLastName(e.target.value)}></Input></td>
                        <td>
                            <Input type="select" name="select" id="teamSelect"
                                onChange={e => setTeamID(e.target.value)}>
                                <option defaultValue={player.team_id}> {player.name} - {player.color} - Practice: {player.practice_night}</option>
                                {props.teams.map((team, idx) => {
                                    return (
                                        <option value={team.id} key={idx}>{team.name} - {team.color} - Practice: {team.practice_night}</option>
                                    )
                                })}
                            </Input>
                        </td>
                        <td></td>
                        <td></td>
                        <th><Button className="btn-success"
                            onClick={() => {
                                editPlayerRow({ firstName, lastName, teamID, userID })
                                setEditMode(false)
                            }}>Submit</Button></th>
                        <th><Button className="btn-secondary"
                            onClick={() => {
                                setEditMode(false)
                                setFirstName(props.player.first_name)
                                setLastName(props.player.last_name)
                                setTeamID(props.player.team_id)
                            }}>Cancel</Button></th>
                    </tr>
                </>
            }
        </>
    )
}

export default PlayerRow;