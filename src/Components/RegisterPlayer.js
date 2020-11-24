import React, { useState } from 'react';
import { useBearer } from '../utilities/BearerContext'
import { axiosHelper } from '../utilities/axiosHelper'
import { Col, Row, Container, Button, Form, Label, Input, Jumbotron } from 'reactstrap';
import UserLogIn from './UserLogIn';
import RegisterUser from './RegisterUser';

function RegisterPlayer() {

    const [teams, setTeams] = useState([
        { "id": 1, "color": "Yellow", "practice": "Monday", "name": "Galaxy" },
        { "id": 2, "color": "Green", "practice": "Tuesday", "name": "Sounders" },
        { "id": 3, "color": "Blue", "practice": "Wednesday", "name": "Revolution" },
    ]);
    // const [ageGroup, setAgeGroup] = useState("");
    // const [gender, setGender] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [team_id, setTeamID] = useState("");
    const [user_obj, setUserObj] = useState({ user_id: "1" });
    const { bearer } = useBearer();

    function handleSubmit(event) {
        event.preventDefault();
        axiosHelper(
            'post',
            '/PlayerRegistration',
            {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + bearer
            },
            { first_name: firstName, last_name: lastName, ref_team_id: team_id, ref_user_id: user_obj.user_id },
        );
    }

    return (
        <>

            {!bearer && 
            <>
                <h1 className="display-5 pt-5 mt-5">You must be signed in to register a player.</h1>
                <UserLogIn className="mt-5"/>
                <RegisterUser className="mt-5" />
            </>
            }
            {bearer &&
                <Container className="App text-left">
                    <Jumbotron className="mt-5">
                        <h2 className="display-4" >New Player Sign-Up</h2>
                        <Form>
                            <Row>
                                <Col className="col-md-6 col-12 mt-3">
                                    <Label for="firstName">First Name</Label>
                                    <Input name="First Name" id="firstName"
                                        onChange={e => setFirstName(e.target.value)}
                                    />
                                </Col>
                                <Col className="col-md-6 col-12 mt-3">
                                    <Label for="lastName">Last Name</Label>
                                    <Input name="Last Name" id="lastName"
                                        onChange={e => setLastName(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            {/* <Row className="mt-3">
                                <Col className="col-6">
                                    <Label for="exampleSelect">Age Group</Label>
                                    <Input type="select" name="select" id="exampleSelect">
                                        <option>Open</option>
                                        <option>K-1st</option>
                                        <option>2nd-3rd</option>
                                        <option>4th-5th</option>
                                        <option>Middle School</option>
                                    </Input>
                                </Col>
                                <Col className="col-6">
                                    <Label for="exampleSelect">Gender</Label>
                                    <Input type="select" name="select" id="exampleSelect">
                                        <option>Choose One</option>
                                        <option >Boys</option>
                                        <option >Girls</option>
                                    </Input>
                                </Col>
                            </Row> */}
                            <Row>
                                <Col className="col-md-6 col-12 mt-3">
                                    <Label for="teamSelect">Team</Label>
                                    <Input type="select" name="select" id="teamSelect"
                                        onChange={e => setTeamID(e.target.value)}
                                    >
                                        <option>Pick a team...</option>
                                        {/* dynamic list of teams 
                                            THIS LOADS BEFORE AXIOS RETURNS WITH TEAM ARRAY
                                        */}
                                        {teams.map((item, idx) =>
                                            <option value={item.id} color={item.color} key={idx}>{item.name} - {item.color} - Practice: {item.practice}</option>
                                        )}
                                    </Input>
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
            }
        </>
    );
}

export default RegisterPlayer;
