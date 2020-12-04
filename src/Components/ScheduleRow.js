import React, { useState } from "react";
import { useBearer } from '../utilities/BearerContext';
import { axiosHelper } from '../utilities/axiosHelper';
import {
    Button, Input
} from 'reactstrap';

const ScheduleRow = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [id, setID] = useState(props.schedule.id);
    const [date, setDate] = useState(props.schedule.date);
    const [homeTeamID, setHomeTeamID] = useState(props.schedule.home_team.id);
    const [awayTeamID, setAwayTeamID] = useState(props.schedule.away_team.id);
    const [time, setTime] = useState(props.schedule.time);
    const { bearer } = useBearer();

    function editScheduleRow({ date = `${props.schedule.date}`, homeTeamID = `${props.schedule.home_team.id}`, awayTeamID = `${props.schedule.away_team.id}`, time = `${props.schedule.time}` }) {
        axiosHelper({
            method: 'put',
            url: `/editSchedule/${id}`,
            data: {
                date: date,
                ref_home_team_id: homeTeamID,
                ref_away_team_id: awayTeamID,
                time: time
            }
        })
            .then(axiosHelper({
                url: '/getSchedules',
                fun: props.storeSchedules
            }))
    }
    function deleteScheduleRow(id) {
        axiosHelper({
            method: 'delete',
            url: `/deleteSchedule/${id}`,
            bearer,
        })
            .then(axiosHelper({
                url: '/getSchedules',
                fun: props.storeSchedules
            }))
    }
    return (
        <>
            {!editMode ?
                <tr key={props.idx}>
                    <th scope="row">{props.schedule.id}</th>
                    <td>{props.schedule.type}</td>
                    <td>{props.schedule.date}</td>
                    <td>{props.schedule.home_team.name}</td>
                    <td>vs.</td>
                    <td>{props.schedule.away_team.name}</td>
                    <td>{props.schedule.time}</td>
                    <td><Button className="btn-warning"
                        onClick={() => setEditMode(true)}>Edit</Button></td>
                    <td><Button className="btn-danger"
                        onClick={() => deleteScheduleRow(props.schedule.id)}>Delete</Button></td>
                </tr>
                :
                <>
                    <tr>
                        <th scope="row">{props.schedule.id}</th>
                        <td>{props.schedule.type}</td>
                        <td><Input defaultValue={props.schedule.date}
                            onChange={e => setDate(e.target.value)}></Input></td>
                        <td>
                            <Input type="select" name="select" id="homeTeamSelect"
                                onChange={(e) => {
                                    setHomeTeamID(e.target.value)
                                }}>
                                <option value={props.schedule.home_team.id}>{props.schedule.home_team.name}</option>
                                {props.teams.map((team, idx) => {
                                    return (
                                        <option value={team.id} key={idx}>{team.name}</option>
                                    )
                                })}
                            </Input>
                        </td>
                        <td>vs.</td>
                        <td>
                            <Input type="select" name="select" id="awayTeamSelect"
                                onChange={(e) => { setAwayTeamID(e.target.value) }}>
                                <option value={props.schedule.away_team.id}>{props.schedule.away_team.name}</option>
                                {props.teams.map((team, idx) => {
                                    return (<option value={team.id} key={idx}>{team.name}</option>)
                                })}
                            </Input>
                        </td>
                        <td><Input value={props.schedule.time}
                            onChange={e => setTime(e.target.value)}></Input></td>
                        <th><Button className="btn-success"
                            onClick={() => {
                                editScheduleRow({ date, homeTeamID, awayTeamID, time })
                                setEditMode(false)
                            }}>Submit</Button></th>
                        <th><Button className="btn-secondary"
                            onClick={() => {
                                setEditMode(false)
                                setDate(props.schedule.date)
                                setHomeTeamID(props.schedule.ref_home_team_id)
                                setAwayTeamID(props.schedule.ref_away_team_id)
                                setTime(props.schedule.time)
                            }}>Cancel</Button></th>
                    </tr>
                </>
            }
        </>
    )
}
export default ScheduleRow