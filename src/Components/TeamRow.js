import React, { useState, useEffect } from "react";
import { useBearer } from '../utilities/BearerContext';
import { axiosHelper } from '../utilities/axiosHelper';
import { Button, Input } from 'reactstrap';

const TeamRow = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [deleter, setDeleter] = useState(false);
    const [id, setID] = useState(props.team.id);
    const [teamName, setTeamName] = useState(props.team.name);
    const [teamColor, setTeamColor] = useState(props.team.color);
    const [teamPracticeNight, setTeamPracticeNight] = useState(props.team.practice_night);
    const { bearer } = useBearer();

    useEffect(() => {
        axiosHelper({
            url: '/getTeams',
            fun: props.storeTeams
        })
        setDeleter(false)
    }, [editMode, deleter])
    
    function editTeamRow({ teamName = `${props.teams.name}`, teamColor = `${props.teams.color}`, teamPracticeNight = `${props.teams.practice_night}`, bearer }) {
        axiosHelper({
            method: 'put',
            url: `/editTeam/${id}`,
            data: {
                name: teamName,
                color: teamColor,
                practice_night: teamPracticeNight,
            }
        })
        setEditMode(false)
    }
   
    function cancelEdit() {
        setEditMode(false)
        setTeamName(props.team.name)
        setTeamColor(props.team.color)
        setTeamPracticeNight(props.team.practice_night)
    }

    function deleteTeamRow(id) {
        axiosHelper({
            method: 'delete',
            url: `/deleteTeam/${id}`,
            bearer,
        })
        setDeleter(true)
    }

    return (
        <>
            {!editMode ?
                <tr key={props.idx}>
                    <th scope="row">{props.team.id}</th>
                    <td>{props.team.name}</td>
                    <td>{props.team.color}</td>
                    <td>{props.team.practice_night}</td>
                    <td><Button className="btn-warning"
                        onClick={() => setEditMode(true)}
                    >Edit</Button></td>
                    <td><Button className="btn-danger"
                        onClick={() => deleteTeamRow(props.team.id)}>Delete</Button></td>
                </tr>
                :
                <tr>
                    <th scope="row">{props.team.id}</th>
                    <td><Input defaultValue={props.team.name}
                        onChange={e => setTeamName(e.target.value)}
                    ></Input></td>
                    <td><Input defaultValue={props.team.color}
                        onChange={e => setTeamColor(e.target.value)}
                    ></Input></td>
                    <td>
                        <Input type="select" defaultValue={props.team.practice_night} name="practiceNight" id="practiceNightSelect"
                            onChange={e => setTeamPracticeNight(e.target.value)}>
                            <option value='Monday'>Monday</option>
                            <option value='Tuesday'>Tuesday</option>
                            <option value='Wednesday'>Wednesday</option>
                            <option value='Thursday'>Thursday</option>
                            <option value='Friday'>Friday</option>
                        </Input>
                    </td>
                    <th><Button className="btn-success"
                        onClick={() => {
                            editTeamRow({ teamName, teamColor, teamPracticeNight })
                            setEditMode(false);
                        }}
                    >Submit</Button></th>
                    <th><Button className="btn-secondary"
                        onClick={() => {
                            setEditMode(false)
                            setTeamName(props.team.name)
                            setTeamColor(props.team.color)
                            setTeamPracticeNight(props.team.practice_night)
                        }}>Cancel</Button></th>
                </tr>
            }
        </>
    )
}
export default TeamRow;