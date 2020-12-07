import React, { useState, useEffect } from "react";
import { axiosHelper } from '../utilities/axiosHelper';
import { Button, Input
} from 'reactstrap';

const PlayerRow = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [deleter, setDeleter] = useState(false);
    const [id, setID] = useState(props.player.id);
    const [firstName, setFirstName] = useState(props.player.first_name);
    const [lastName, setLastName] = useState(props.player.last_name);
    const [teamID, setTeamID] = useState(props.player.team_id);

    useEffect(() => {
        axiosHelper({
            url: '/getPlayers',
            fun: props.storePlayers
        })
        setDeleter(false)
    }, [editMode, deleter])


    function editPlayerRow({ firstName = `${props.player.first_name}`, lastName = `${props.player.last_name}`, teamID = `${props.player.team_id}` }) {
        axiosHelper({
            method: 'put',
            url: `/editPlayer/${id}`,
            data: {
                first_name: firstName,
                last_name: lastName,
                team_id: teamID,

            }
        })
        setEditMode(false)
    }

    function cancelEdit() {
        setEditMode(false)
        setFirstName(props.player.first_name)
        setLastName(props.player.last_name)
        setTeamID(props.player.team_id)
    }

    function deletePlayerRow(id) {
        axiosHelper({
            method: 'delete',
            url: `/deletePlayer/${id}`,
        })
        setDeleter(true)
    }

    return (
        <>
            {!editMode ?
                <tr key={props.idx}>
                    <th scope="row">{props.player.id}</th>
                    <td>{props.player.first_name}</td>
                    <td>{props.player.last_name}</td>
                    <td>{props.player.name}</td>
                    <td><Button className="btn-warning"
                        onClick={() => setEditMode(true)}>Edit</Button></td>
                    <td><Button className="btn-danger"
                        onClick={() => deletePlayerRow(props.player.id)}>Delete</Button></td>
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
                                <option defaultValue={props.player.team_id}> {props.player.name} - {props.player.color} - Practice: {props.player.practice_night}</option>
                                {props.teams.map((team, idx) => {
                                    return (
                                        <option value={team.id} key={idx}>{team.name} - {team.color} - Practice: {team.practice_night}</option>
                                    )
                                })}
                            </Input>
                        </td>
                        <th><Button className="btn-success"
                            onClick={() => {
                                editPlayerRow({ firstName, lastName, teamID })
                            }}>Submit</Button></th>
                        <th><Button className="btn-secondary"
                            onClick={() => { cancelEdit() }}>Cancel</Button></th>
                    </tr>
                </>
            }
        </>
    )
}

export default PlayerRow;