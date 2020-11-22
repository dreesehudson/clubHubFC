import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
    Col, Row, Container, Button, Form, FormGroup, Label, Input, Jumbotron
} from 'reactstrap';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


function RegisterPlayer() {

    const [teams, setTeams] = useState([{ id: 1, name: "Galaxy", color: "Yellow", practice: "Monday" },
    { id: 2, name: "Sounders", color: "Green", practice: "Tuesday" },
    { id: 3, name: "Louisville City", color: "Purple", practice: "Wednesday" },
    { id: 4, name: "Crew", color: "Black", practice: "Thursday" },
    { id: 5, name: "Liverpool", color: "Red", practice: "Friday" }]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [team_id, setTeamID] = useState("");
    const [user_obj, setUserObj] = useState({user_id: "1"});



    // useEffect(() => {
    //     const url = 'http://localhost:8000/getTeams'
    //     const method = 'get'
    //     const headers = {
    //       'Content-Type': 'application/json;charset=UTF-8',
    //       'Access-Control-Allow-Origin': '*'
    //     }
    //     const body="";
    //     const data="";

    //     axios({
    //       url,
    //       method,
    //       headers,
    //       body,
    //       data
    //     })
    //       .then(res => console.log(res))
    //       .catch(err => console.log('error: ', err))
    //   })
    function handleSubmit(event) {
        console.log('Player Submitted');
        event.preventDefault();
        const url = 'http://localhost:8000/PlayerRegistration'
        const method = 'post'
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
        const body = { first_name: firstName, last_name: lastName, ref_team_id: team_id, ref_user_id: user_obj.user_id }
        const data = { first_name: firstName, last_name: lastName, ref_team_id: team_id, ref_user_id: user_obj.user_id }
        console.log({ body });
        axios({
            url,
            method,
            headers,
            body,
            data
        })
            .then(res => console.log(res))
            .catch(err => console.log('error: ', err))
    }

    return (
        <>
            <Router>
                <Container className="App text-left">
                    <Jumbotron>
                        <h2 className="display-4" >New Player Sign-Up</h2>
                        <Form className="mt-5">
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Label for="first">First Name</Label>
                                    <Input name="First Name" id="firstName"
                                        onChange={e => setFirstName(e.target.value)}

                                    />
                                </Col>
                                <Col className="col-6">
                                    <Label for="last">Last Name</Label>
                                    <Input name="Last Name" id="lastName"
                                        onChange={e => setLastName(e.target.value)}

                                    />
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Label for="exampleSelect">Age Group</Label>
                                    <Input type="select" name="select" id="exampleSelect">
                                        <option>Open</option>
                                        <option disabled>K-1st</option>
                                        <option disabled>2nd-3rd</option>
                                        <option disabled>4th-5th</option>
                                        <option disabled>Middle School</option>
                                    </Input>
                                </Col>
                                <Col className="col-6">
                                    <FormGroup className="form-check-inline" tag="fieldset">
                                        <FormGroup check>
                                            <Label check>
                                                <Input defaultChecked type="radio" name="radio1" />{' '} Co-ed</Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="radio2" disabled />{' '} Boys</Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="radio3" disabled />{' '} Girls</Label>
                                        </FormGroup>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Label for="teamSelect">Team</Label>
                                <Col className="col-6">
                                    <Input type="select" name="select" id="teamSelect"
                                        onChange={e => setTeamID(e.target.value)}
                                    >
                                            <option>Pick a team...</option>
                                        {/* dynamic list of teams */}
                                        {teams.map((item, idx) =>
                                            <option value={item.id} color={item.color} key={idx}>{item.name} - {item.color} - Practice: {item.practice}</option>
                                        )}

                                    </Input>
                                </Col>
                                <Col className="col-6">
                                </Col>

                            </Row>

                            <Row check className="mt-3 text-center">
                                <Col >
                                    <Button type="submit" className="btn btn-danger" onClick={handleSubmit}>Submit</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Jumbotron>
                </Container>
            </Router >
        </>
    );
}

export default RegisterPlayer;
