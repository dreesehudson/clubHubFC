import React, { useState, useEffect } from 'react';
import { useBearer } from '../utilities/BearerContext'
import { axiosHelper } from '../utilities/axiosHelper'
import { Col, Row, Container, Button, Form, Label, Input, Jumbotron } from 'reactstrap';
import UserLogIn from './UserLogIn';
import RegisterUser from './RegisterUser';

function RegisterPlayer() {

    const [teams, setTeams] = useState([]);
    // const [ageGroup, setAgeGroup] = useState("");
    // const [gender, setGender] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [team_id, setTeamID] = useState("");
    const [user_obj, setUserObj] = useState({ user_id: '1' });
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
            //TO DO: add element to page to tell user that player has been added.
        );
    }

    const storeTeams = (response) => {
        setTeams(response.data)
        console.log(response.data)
    }

    // const storeID = (response) => {
    //     //setUserObj(response.data)
    //     console.log(response.data)
    // }



    useEffect(() => {
        //axios call to get index of all teams
        axiosHelper(
            'get',
            '/getTeams',
            {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + bearer
            },
            {},
            storeTeams
        )
    }, [bearer]);

    return (
        <>
            {bearer ?
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
                            <Row>
                                <Col className="col-md-6 col-12 mt-3">
                                    <Label for="teamSelect">Team</Label>
                                    <Input type="select" name="select" id="teamSelect"
                                        onChange={e => setTeamID(e.target.value)}
                                    >
                                        <option>Pick a team...</option>
                                        {teams.map((item, idx) =>
                                            <option value={item.id} color={item.color} key={idx}>{item.name} - {item.color} - Practice: {item.practice_night}</option>
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
                :
                <>
                    <h1 className="display-5 pt-5 mt-5">You must be signed in to register a player.</h1>
                    <UserLogIn className="mt-5" />
                    <RegisterUser className="mt-5" />
                </>
            }
        </>
    );
}

export default RegisterPlayer;
