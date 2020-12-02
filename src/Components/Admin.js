import React, { useState, useEffect } from "react";
import { useBearer } from '../utilities/BearerContext';
import { axiosHelper } from '../utilities/axiosHelper';
import {
    TabContent, TabPane, Nav, NavItem, NavLink, Table, Button, Row, Col,
    Modal, ModalHeader, ModalBody, Label, Input, Form
} from 'reactstrap';
import classnames from 'classnames';
import Anonymous from './Anonymous';

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
    const [team_id, setTeamID] = useState("");

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
    }
    ]);
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    const storeTeams = (data) => {
        setTeams(data)
        console.log(data)
    }
    const storePlayers = (data) => {
        setPlayers(data)
        console.log(data)
    }
    const storeUsers = (data) => {
        setUsers(data)
        console.log(data)
    }
    const storeSchedules = (data) => {
        console.log(data[0].date)
        setSchedules(data)
    }

    useEffect(() => {
        if (bearer.length > 0) {
            axiosHelper({
                url: '/api/user',
                bearer,
                fun: setUser
            })
        }
    }, [bearer])

    function handleSubmit(event) {
        event.preventDefault();
        axiosHelper(
            {
                method: 'post',
                url: '/createTeam',
                data: {
                    name: teamName, color: color,
                    practice_night: practiceNight
                },
                bearer
            }
        )

        axiosHelper({
            url: '/getTeams',
            fun: storeTeams
        })
        toggleModal();
    }

    useEffect(() => {
        axiosHelper({
            url: '/getTeams',
            fun: storeTeams
        })
        axiosHelper({
            url: '/getPlayers',
            fun: storePlayers
        })
        axiosHelper({
            url: '/getUsers',
            fun: storeUsers
        })
        // axiosHelper({
        //     url: '/getSchedules',
        //     fun: storeSchedules
        // })
    }, [bearer]);

    function editPlayerRow(id) {
        axiosHelper({
            method: 'put',
            url: `/editPlayer/${id}`,
            fun: axiosHelper({
                url: '/getPlayers',
                storePlayers
            })
        })
    }

    function editTeamRow(id) {
        axiosHelper({
            method: 'put',
            url: `/editTeam/${id}`,
            fun: axiosHelper({
                url: '/getTeams',
                storeTeams
            })
        })
    }

    function editScheduleRow(id) {
        axiosHelper({
            method: 'put',
            url: `/editSchedule/${id}`,
            fun: axiosHelper({
                url: '/getSchedules',
                storeSchedules
            })
        })
    }

    function editUserRow(id) {
        axiosHelper({
            method: 'put',
            url: `/editUser/${id}`,
            fun: axiosHelper({
                url: '/getUsers',
                storeUsers
            })
        })
    }

    function deletePlayerRow(id) {
        axiosHelper({
            method: 'delete',
            url: `/deletePlayer/${id}`,
            bearer,
        }).then(
            axiosHelper({
                url: '/getPlayers',
                storePlayers,

            })
        )
    }

    function deleteTeamRow(id) {
        axiosHelper({
            method: 'delete',
            url: `/deleteTeam/${id}`,
            fun: axiosHelper({
                url: '/getTeams',
                fun: storeTeams
            })
        })
    }

    function deleteScheduleRow(id) {
        axiosHelper({
            method: 'delete',
            url: `/deleteSchedule/${id}`,
            fun: axiosHelper({
                url: '/getSchedules',
                fun: storeSchedules
            })
        })
    }

    function deleteUserRow(id) {
        axiosHelper({
            method: 'delete',
            url: `/deleteUser/${id}`,
            fun: axiosHelper({
                url: '/getUsers',
                fun: storeUsers
            })
        })
    }

    return (
        <>
            { user.isAdmin ?
                <div className="container-fluid mt-5 pt-5">
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
                                            {players.map((item, idx) => {
                                                return (
                                                    <>
                                                        <tr key={idx}>
                                                            <th scope="row">{item.id}</th>
                                                            <td>{item.first_name}</td>
                                                            <td>{item.last_name}</td>
                                                            <td>{item.team.name}</td>
                                                            <td>{item.user.name}</td>
                                                            <td>{item.user.email}</td>
                                                            <th><Button className="btn-warning"
                                                            // onClick={swapToEditRow}
                                                            >Edit</Button></th>
                                                            <th><Button className="btn-danger"
                                                                onClick={() => deletePlayerRow(item.id)}
                                                            >Delete</Button></th>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">{item.id}</th>
                                                            <td><Input defaultValue={item.first_name}></Input></td>
                                                            <td><Input defaultValue={item.last_name}></Input></td>
                                                            <td>
                                                                <Input type="select" name="select" id="teamSelect"
                                                                    onChange={e => setTeamID(e.target.value)}
                                                                >
                                                                    <option value={item.team.id}>{item.team.name} - {item.team.color} - Practice: {item.team.practice_night}</option>
                                                                    {teams.map((item, idx) => {
                                                                        return (
                                                                            <option value={item.id} key={idx}>{item.name} - {item.color} - Practice: {item.practice_night}</option>
                                                                        )
                                                                    })}
                                                                </Input>

                                                            </td>
                                                            <td>{item.user.name}</td>
                                                            <td>{item.user.email}</td>
                                                            <th><Button className="btn-success"
                                                                onClick={() => editPlayerRow(item.id)}
                                                            >Submit</Button></th>
                                                            <th><Button className="btn-secondary"
                                                            // onClick={()=>toggleToDisplay}
                                                            >Cancel</Button></th>
                                                        </tr>
                                                    </>
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
                                                        <Input type="select" name="practiceNight" id="practiceNightSelect"
                                                            onChange={e => setPracticeNight(e.target.value)}>
                                                            <option>Choose One...</option>
                                                            <option value='Monday'>Monday</option>
                                                            <option value='Tuesday'>Tuesday</option>
                                                            <option value='Wednesday'>Wednesday</option>
                                                            <option value='Thursday'>Thursday</option>
                                                            <option value='Friday'>Friday</option>
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
                                                <th>Color</th>
                                                <th>Practice Night</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {teams.map((item, idx) => {
                                                return (
                                                    <>
                                                        <tr key={idx}>
                                                            <th scope="row">{item.id}</th>
                                                            <td>{item.name}</td>
                                                            <td>{item.color}</td>
                                                            <td>{item.practice_night}</td>
                                                            <td><Button className="btn-warning"
                                                            // onClick={()=>swapToEditRow}
                                                            >Edit</Button></td>

                                                            <td><Button className="btn-danger"
                                                                onClick={() => deleteTeamRow(item.id)}>Delete</Button></td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">{item.id}</th>
                                                            <td><Input value={item.name}></Input></td>
                                                            <td><Input value={item.color}></Input></td>
                                                            <td>
                                                                <Input type="select" value={item.practice_night} name="practiceNight" id="practiceNightSelect"
                                                                    onChange={e => setPracticeNight(e.target.value)}>
                                                                    <option value='Monday'>Monday</option>
                                                                    <option value='Tuesday'>Tuesday</option>
                                                                    <option value='Wednesday'>Wednesday</option>
                                                                    <option value='Thursday'>Thursday</option>
                                                                    <option value='Friday'>Friday</option>
                                                                </Input>

                                                            </td>
                                                            <th><Button className="btn-success"
                                                                onClick={() => editTeamRow(item.id)}
                                                            >Submit</Button></th>
                                                            <th><Button className="btn-secondary"
                                                            //onClick={toggleToDisplay}
                                                            >Cancel</Button></th>
                                                        </tr>
                                                    </>
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
                                                <>
                                                    <tr key={idx}>
                                                        <th scope="row">{item.id}</th>
                                                        <td>{item.type}</td>
                                                        <td>{item.date}</td>
                                                        <td>{item.ref_home_team_id}</td>
                                                        <td>vs.</td>
                                                        <td>{item.ref_away_team_id}</td>
                                                        <td>{item.time}</td>
                                                        <td><Button className="btn-warning"
                                                        // onClick={()=>swapToEditRow}
                                                        >Edit</Button></td>
                                                        <td><Button className="btn-danger"
                                                            onClick={() => deleteScheduleRow(item.id)}
                                                        >Delete</Button></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">{item.id}</th>
                                                        <td>{item.type}</td>
                                                        <td><Input value={item.date}></Input></td>
                                                        <td>
                                                            <Input type="select" name="select" id="teamSelect"
                                                                onChange={e => setTeamID(e.target.value)}
                                                            >
                                                                <option>{item.team.name}</option>
                                                                {teams.map((item, idx) => {
                                                                    return (
                                                                        <option value={item.id} key={idx}>{item.name}</option>
                                                                    )
                                                                })}
                                                            </Input>

                                                        </td>
                                                        <td>vs.</td>
                                                        <td>
                                                            <Input type="select" name="select" id="teamSelect"
                                                                onChange={e => setTeamID(e.target.value)}
                                                            >
                                                                <option>{item.team.name}</option>
                                                                {teams.map((item, idx) => {
                                                                    return (
                                                                        <option value={item.id} key={idx}>{item.name}</option>
                                                                    )
                                                                })}
                                                            </Input>

                                                        </td>
                                                        <td><Input value={item.time}></Input></td>

                                                        <th><Button className="btn-success"
                                                            onClick={() => editScheduleRow(item.id)}
                                                        >Submit</Button></th>
                                                        <th><Button className="btn-secondary"
                                                        //onClick={switchToDisplayRow}
                                                        >Cancel</Button></th>
                                                    </tr>
                                                </>
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
                                                    <>
                                                        <tr key={idx}>
                                                            <th scope="row">{item.id}</th>
                                                            <td>{item.name}</td>
                                                            <td>{item.email}</td>
                                                            <td><Button className="btn-warning"
                                                            // onClick={swapToEditRow}
                                                            >Edit</Button></td>
                                                            <td><Button className="btn-danger"
                                                                onClick={() => deleteUserRow(item.id)}
                                                            >Delete</Button></td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">{item.id}</th>
                                                            <td><Input value={item.name}></Input></td>
                                                            <td><Input value={item.email}></Input></td>
                                                            <th><Button className="btn-success"
                                                                onClick={() => editUserRow(item.id)}
                                                            >Submit</Button></th>
                                                            <th><Button className="btn-secondary"
                                                            //onClick={swapToDisplayRow}
                                                            >Cancel</Button></th>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>
                :
                <>
                    <Anonymous className="mt-5 pt-5" />
                    <h1 className="mt-5">You must be an Administrator to access this page.</h1>
                </>
            }
        </>
    );
}

export default Admin;