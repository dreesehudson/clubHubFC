import React, { useState, useEffect } from "react";
import { useBearer } from '../utilities/BearerContext';
import { axiosHelper } from '../utilities/axiosHelper';
import {
    TabContent, TabPane, Nav, NavItem, NavLink, Table, Button, Row, Col,
    Modal, ModalHeader, ModalBody, Label, Input, Form
} from 'reactstrap';
import classnames from 'classnames';
import Anonymous from './Anonymous';
import PlayerRow from './PlayerRow';
import TeamRow from './TeamRow';
import ScheduleRow from './ScheduleRow';
import UserRow from './UserRow';

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
    }
    ]);
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    const storeTeams = (data) => {
        if (data !== teams) {
            setTeams(data);
            console.log(data);
        }
    }
    const storePlayers = (data) => {
        if (data !== players) {
            setPlayers(data);
            console.log(data);
        }
    }
    const storeUsers = (data) => {
        if (data !== users) {
            setUsers(data);
            console.log(data);
        }
    }
    const storeSchedules = (data) => {
        if (data !== schedules) {
            setSchedules(data);
            console.log(data);
        }
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
        axiosHelper({
            url: '/getSchedules',
            fun: storeSchedules
        })
    }, [bearer]);

    return (
        <>
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
                                        {players.map((player, idx) => {
                                            return (
                                                <PlayerRow
                                                    player={player}
                                                    teams={teams}
                                                    idx={idx}
                                                    storePlayers={storePlayers}
                                                />
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
                                        {teams.map((team, idx) => {
                                            return (
                                                <TeamRow
                                                    team={team}
                                                    idx={idx}
                                                    storeTeams={storeTeams}
                                                />
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
                                <Table size="sm" hover>
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
                                    <tbody>
                                        {schedules.map((schedule, idx) => {
                                            return (
                                                <ScheduleRow
                                                    schedule={schedule}
                                                    teams={teams}
                                                    idx={idx}
                                                    storeSchedules={storeSchedules}
                                                />
                                            )
                                        })
                                        }
                                    </tbody>

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
                                            <th>Admin</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, idx) => {
                                            return (
                                                <UserRow
                                                    user={user}
                                                    idx={idx}
                                                    storeUsers={storeUsers}
                                                />
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>



        </>
    );
}

export default Admin;