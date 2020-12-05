import React, { useState } from "react";
import { useBearer } from '../utilities/BearerContext';
import { axiosHelper } from '../utilities/axiosHelper';
import {
    Button, Input
} from 'reactstrap';

const PlayerRow = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [id, setID] = useState(props.player.id);
    const [firstName, setFirstName] = useState(props.player.first_name);
    const [lastName, setLastName] = useState(props.player.last_name);
    const [refTeamID, setTeamID] = useState(props.player.team_id);
    const [refUserID, setRefUserID] = useState(props.player.user_id);
    const { bearer } = useBearer();

    function editPlayerRow({ firstName = `${props.player.first_name}`, lastName = `${props.player.last_name}`, refTeamID = `${props.player.team_id}`, refUserID = `${props.player.user_id}` }) {
        axiosHelper({
            method: 'put',
            url: `/editPlayer/${id}`,
            data: {
                first_name: firstName,
                last_name: lastName,
                team_id: refTeamID,
                user_id: refUserID,
            }
        })
            .then(axiosHelper({
                url: '/getPlayers',
                fun: props.storePlayers
            }))
    }

    function deletePlayerRow() {
        axiosHelper({
            method: 'delete',
            url: `/deletePlayer/${id}`,
            bearer,
        })
            .then(axiosHelper({
                url: '/getPlayers',
                fun: props.storePlayers
            }))
    }

    return (
        <>
            {!editMode ?
                <tr key={props.idx}>
                    <th scope="row">{props.player.id}</th>
                    <td>{props.player.first_name}</td>
                    <td>{props.player.last_name}</td>
                    <td>{props.player.team.name}</td>
                    <td>{props.player.user.name}</td>
                    <td>{props.player.user.email}</td>
                    <td><Button className="btn-warning"
                        onClick={() => setEditMode(true)}
                    >Edit</Button></td>
                    <td><Button className="btn-danger"
                        onClick={() => deletePlayerRow(props.player.id)}
                    >Delete</Button></td>
                </tr>
                :
                <>
                    <tr>
                        <th scope="row">{props.player.id}</th>
                        <td><Input defaultValue={props.player.first_name}
                            onChange={e => setFirstName(e.target.value)}></Input></td>
                        <td><Input defaultValue={props.player.last_name}
                            onChange={e => setLastName(e.target.value)}></Input></td>
                        <td>
                            <Input type="select" name="select" id="teamSelect"
                                onChange={e => setTeamID(e.target.value)}>
                                <option defaultValue={props.player.team_id}> {props.player.team.name} - {props.player.team.color} - Practice: {props.player.team.practice_night}</option>
                                {props.teams.map((team, idx) => {
                                    return (
                                        <option value={team.id} key={idx}>{team.name} - {team.color} - Practice: {team.practice_night}</option>
                                    )
                                })}
                            </Input>
                        </td>
                        <td>{props.player.user.name}</td>
                        <td>{props.player.user.email}</td>
                        <th><Button className="btn-success"
                            onClick={() => {
                                editPlayerRow({ firstName, lastName, refTeamID, refUserID })
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