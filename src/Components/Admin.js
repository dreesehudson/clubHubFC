import React, { useState, useEffect } from "react";
import { useBearer } from '../utilities/BearerContext'
import { axiosHelper } from '../utilities/axiosHelper'
import {
    TabContent, TabPane, Nav, NavItem, NavLink, Table, Button, Row, Col,
    Modal, ModalHeader, ModalBody, Label, Input, Form
} from 'reactstrap';
import classnames from 'classnames';
import Switch from './Switch'
import axios from 'axios'

const Admin = (props) => {
    const [user, setUser] = useState({});
    const [activeTab, setActiveTab] = useState('1');
    const [teamName, setTeamName] = useState("");
    const [color, setColor] = useState("");
    const [practiceNight, setPracticeNight] = useState("");
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const [users, setUsers] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const { bearer } = useBearer();
    const [modal, setModal] = useState(false);
    const {
        className
    } = props;
    const toggleModal = () => setModal(!modal);
    const closeBtn = <button className="close" onClick={toggleModal}>&times;</button>;
    const [tabs, setTabs] = useState([{
        'name': 'Players',
        'num': '1'
    },
    {
        'name': 'Teams',
        'num': '2'
    },
    {
        'name': 'Matches',
        'num': '3'
    },
    {
        'name': 'Users',
        'num': '4'
    },
    {
        'name': 'Settings',
        'num': '5'
    }]);
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    const storeTeams = (response) => {
        setTeams(response.data)
        console.log(response.data)
    }
    const storePlayers = (response) => {
        setPlayers(response.data)
        console.log(response.data)
    }
    const storeUsers = (response) => {
        setUsers(response.data)
        console.log(response.data)
    }
    const storeSchedules = (response) => {
        console.log(response.data[0].date)
        setSchedules(response.data)
    }

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/user',
            data: {},
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${bearer}`
            }
        })
            .then(res => {
                setUser(res.data)
                console.log(user)
            })
            .catch(err => console.log('error: ', err));

    }, [bearer])

    function handleSubmit(event) {
        event.preventDefault();
        axiosHelper(
            'post',
            '/createTeam',
            {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + bearer
            },
            {
                name: teamName, color: color,
                practice_night: practiceNight
            },
            //TO DO: add element to page to tell user that player has been added.
        );
    }

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
        axiosHelper(
            'get',
            '/getPlayers',
            {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + bearer
            },
            {},
            storePlayers
        )
        axiosHelper(
            'get',
            '/getUsers',
            {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + bearer
            },
            {},
            storeUsers
        )
        axiosHelper(
            'get',
            '/getSchedules',
            {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + bearer
            },
            {},
            storeSchedules
        )
    }, [bearer]);

    return (
        <div className="mt-5 pt-5">
            <Nav tabs>
                {tabs.map((item, idx) => {
                    return (

                        <NavItem key={idx}>
                            <NavLink
                                className={classnames({ active: activeTab === item.num })}
                                onClick={() => { toggle(item.num); }}>
                                {item.name}
                            </NavLink>
                        </NavItem>
                    )
                })}

            </Nav>

            <TabContent activeTab={activeTab}>

                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <Table size="sm" hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Team</th>
                                        <th>Parent Name</th>
                                        <th>Parent Acct</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/*map function*/}
                                    {players.map((item, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <th scope="row">{item.id}</th>
                                                <td>{item.first_name}</td>
                                                <td>{item.last_name}</td>
                                                <td>{item.team.name}</td>
                                                <td>{item.user.name}</td>
                                                <td>{item.user.email}</td>
                                                <th><Button className="btn-warning">Edit</Button></th>
                                                <th><Button className="btn-danger">Delete</Button></th>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="2">
                    <Row>
                        <Col sm="12">
                            <Button color="danger" className="my-3" onClick={toggleModal}>Create New Team</Button>
                            <Modal isOpen={modal} toggle={toggleModal} className={className}>
                                <ModalHeader toggle={toggleModal} close={closeBtn}>Create New Team</ModalHeader>
                                <ModalBody>
                                    <Form>
                                        <Row>
                                            <Col className="col-12 mt-3">
                                                <Label for="teamName">Team Name</Label>
                                                <Input name="Team Name" id="teamName"
                                                    onChange={e => setTeamName(e.target.value)}
                                                />
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col className="col-md-6 col-12 mt-3">
                                                <Label for="color">Color</Label>
                                                <Input name="color" id="color"
                                                    onChange={e => setColor(e.target.value)}
                                                />
                                            </Col>
                                            <Col className="col-md-6 col-12 mt-3">
                                                <Label for="practiceNight">Practice Night</Label>
                                                <Input type="select" name="practiceNight" id="practiceNightSelect">
                                                    <option>Choose One...</option>
                                                    <option>Monday</option>
                                                    <option>Tuesday</option>
                                                    <option>Wednesday</option>
                                                    <option>Thursday</option>
                                                    <option>Friday</option>
                                                </Input>
                                            </Col>
                                        </Row>
                                        <Row check className="mt-3 text-center">
                                            <Col >
                                                <Button type="submit" className="btn btn-danger" onClick={handleSubmit}>Submit</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </ModalBody>
                            </Modal>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12">
                            <Table size="sm" hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Coach</th>
                                        <th>Color</th>
                                        <th>Practice Night</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teams.map((item, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <th scope="row">{item.id}</th>
                                                <td>{item.name}</td>
                                                <td>{item.coach}</td>
                                                <td>{item.color}</td>
                                                <td>{item.practice_night}</td>
                                                <td><Button className="btn-warning">Edit</Button></td>
                                                <td><Button className="btn-danger">Delete</Button></td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="3">
                    <Row>
                        <Col sm="12">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Type</th>
                                        <th>Date</th>
                                        <th>Home Team</th>
                                        <th></th>
                                        <th>Away Team</th>
                                        <th>Time</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                {schedules.map((item, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.type}</td>
                                            <td>{item.date}</td>
                                            <td>{item.ref_home_team_id}</td>
                                            <td>vs.</td>
                                            <td>{item.ref_away_team_id}</td>
                                            <td>{item.time}</td>
                                            <td><Button className="btn-warning">Edit</Button></td>
                                            <td><Button className="btn-danger">Delete</Button></td>
                                        </tr>
                                    )
                                })
                                }

                            </Table>
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="4">
                    <Row>
                        <Col sm="12">
                            <Table size="sm" hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Parent Name</th>
                                        <th>Email</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((item, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <th scope="row">{item.id}</th>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td><Button className="btn-warning">Edit</Button></td>
                                                <td><Button className="btn-danger">Delete</Button></td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="5">
                    <Row>
                        <Col sm="12">
                            <Switch />
                        </Col>
                    </Row>
                </TabPane>

            </TabContent>
        </div>
    );
}

export default Admin;