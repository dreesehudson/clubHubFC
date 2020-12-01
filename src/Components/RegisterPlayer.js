import React, { useState, useEffect } from 'react';
import { useBearer } from '../utilities/BearerContext'
import { axiosHelper } from '../utilities/axiosHelper'
import { Col, Row, Container, Button, Form, Label, Input, Jumbotron } from 'reactstrap';
import UserLogIn from './UserLogIn';
import RegisterUser from './RegisterUser';

function RegisterPlayer() {

    // const [loading, setLoading] = useState(true);
    const [teams, setTeams] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [team_id, setTeamID] = useState("");
    const [user_obj, setUserObj] = useState({});
    const { bearer } = useBearer();


    const storeTeams = (response) => {
        setTeams(response)
        console.log(response)
    }
    const storeUser = (response) => {
        setUserObj(response.data)
        console.log(response.data)
    }

    useEffect(() => {
        //axios call to get index of all teams
        axiosHelper(
            'get',
            '/getTeams',
            {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                //'Authorization': 'Bearer ' + bearer
            },
            {},
            )
            .then(res => {
                console.log(res.data);
                storeTeams(res.data)
            })
            .catch(err => {
                console.log('error: ', err)
            });
    }, [bearer]);

    useEffect(() => {
        axiosHelper(
            'get',
            '/api/user',
            {
                "Accept": "application/json",
                "Authorization": `Bearer ${bearer}`
            },
            {},
        )
            .then(res => {
                console.log(res);
                if (res.data) {
                    storeUser(res);
                }
                //setLoading(false);
            })
            .catch(err => {
                console.log('error: ', err)
                //setLoading(false);

            });

    }, [bearer]);

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
            { first_name: firstName, last_name: lastName, ref_team_id: team_id, ref_user_id: user_obj.id },
            //TO DO: add element to page to tell user that player has been added.
        );
    }

    return (
        <>
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
                            <Row>
                                <Col className="col-md-6 col-12 mt-3">
                                    <Label for="teamSelect">Team</Label>
                                    <Input type="select" name="select" id="teamSelect"
                                        onChange={e => setTeamID(e.target.value)}
                                    >
                                        <option>Pick a team...</option>
                                        {teams.map((item, idx) => {
                                            return (
                                                <option value={item.id} key={idx}>{item.name} - {item.color} - Practice: {item.practice_night}</option>
                                            )
                                        })}
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
                </Container>}
            { !bearer &&
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
