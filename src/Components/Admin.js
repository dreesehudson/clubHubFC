import React, { useState, useEffect } from "react";
import { useBearer } from '../utilities/BearerContext';
import { axiosHelper } from '../utilities/axiosHelper';
import {
    TabContent, TabPane, Nav, NavItem, NavLink, Table, Button, Row, Col,
    Modal, ModalHeader, ModalBody, Label, Input, Form, Container
} from 'reactstrap';
import classnames from 'classnames';
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
    const { className } = props;
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    const closeBtn = <button className="close" onClick={toggleModal}>&times;</button>;
    const [matchModal, setMatchModal] = useState(false);
    const toggleMatchModal = () => setMatchModal(!matchModal);
    const closeMatchBtn = <button className="close" onClick={toggleMatchModal}>&times;</button>;

    const [date, setDate] = useState('');
    const [home_team_id, setHome_Team_ID] = useState('');
    const [away_team_id, setAway_Team_ID] = useState('');
    const [time, setTime] = useState('');

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
    }]);
    const toggle = tab => { if (activeTab !== tab) setActiveTab(tab); }
    const storeTeams = (data) => { setTeams(data); }
    const storePlayers = (data) => { setPlayers(data); }
    const storeUsers = (data) => { setUsers(data); }
    const storeSchedules = (data) => { setSchedules(data) }

    useEffect(() => {
        axiosHelper({
            url: '/getSchedules',
            fun: props.storeSchedules
        })
    }, [matchModal])

    useEffect(() => {
        axiosHelper({
            url: '/getTeams',
            fun: props.storeTeams
        })
    }, [modal])


    function handleTeamSubmit(event) {
        event.preventDefault();
        axiosHelper(
            {
                method: 'post',
                url: '/createTeam',
                data: {
                    name: teamName,
                    color: color,
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

    function handleMatchSubmit(event) {
        event.preventDefault();
        axiosHelper(
            {
                method: 'post',
                url: '/createSchedule',
                data: {
                    date: date,
                    home_team_id: home_team_id,
                    away_team_id: away_team_id,
                    time: time
                },
                bearer
            }
        )
        axiosHelper({
            url: '/getSchedules',
            fun: storeSchedules
        })
        toggleMatchModal();
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
            <Container className='mt-4'>
                <Row>
                    <Col>
                        <Button className='btn btn-lg my-3' color="primary" onClick={toggleModal}>Create New Team</Button>
                        <Modal isOpen={modal} toggle={toggleModal} className={className}>
                            <ModalHeader toggle={toggleModal} close={closeBtn}>Create New Team</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <Row>
                                        <Col className="col-12 mt-3">
                                            <Label for="teamName">Team Name</Label>
                                            <Input name="Team Name" id="teamName"
                                                onChange={e => setTeamName(e.target.value)} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col-md-6 col-12 mt-3">
                                            <Label for="color">Color</Label>
                                            <Input name="color" id="color"
                                                onChange={e => setColor(e.target.value)} />
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
                                        <Col>
                                            <Button className="btn-primary" onClick={handleTeamSubmit}>Submit</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </ModalBody>
                        </Modal>
                    </Col>

                    <Col>
                        <Button color="primary" className="btn btn-lg my-3" onClick={toggleMatchModal}>Create New Match</Button>
                        <Modal isOpen={matchModal} toggle={toggleMatchModal} className={className}>
                            <ModalHeader toggle={toggleMatchModal} close={closeMatchBtn}>Create New Match</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <Row>
                                        <Col className='col-md-6 col-12'>
                                            <Label for="matchDay">Match Day</Label>
                                            <Input
                                                //className='text-center'
                                                type="date"
                                                name="matchDay"
                                                id="matchDay"
                                                onChange={e => setDate(e.target.value)} />
                                        </Col>
                                        <Col className="col-md-6 col-12">
                                            <Label for="time">Kickoff Time</Label>
                                            <Input type="select" name="time" id="timeSelect"
                                                onChange={e => setTime(e.target.value)}>
                                                <option>Choose One...</option>
                                                <option value='9:00 AM'>9:00 AM</option>
                                                <option value='11:00 AM'>11:00 AM</option>
                                                <option value='1:00 PM'>1:00 PM</option>
                                                <option value='3:00 PM'>3:00 PM</option>
                                                <option value='5:00 PM'>5:00 PM</option>
                                            </Input>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col-md-6 col-12 mt-3">
                                            <Label for="homeTeamSelect">Home Team</Label>
                                            <Input type="select" name="select" id="homeTeamSelect"
                                                onChange={e => setHome_Team_ID(e.target.value)}>
                                                <option>Pick a team...</option>
                                                {teams.map((item, idx) => {
                                                    return (
                                                        <option value={item.id} key={idx}>{item.name}</option>
                                                    )
                                                })}
                                            </Input>
                                        </Col>
                                        <Col className="col-md-6 col-12 mt-3">
                                            <Label for="awayTeamSelect">Away Team</Label>
                                            <Input type="select" name="select" id="awayTeamSelect"
                                                onChange={e => setAway_Team_ID(e.target.value)}>
                                                <option>Pick a team...</option>
                                                {teams.map((item, idx) => {
                                                    return (
                                                        <option value={item.id} key={idx}>{item.name}</option>
                                                    )
                                                })}
                                            </Input>
                                        </Col>
                                    </Row>

                                    <Row check className="mt-3 text-center">
                                        <Col>
                                            <Button type="submit" className="btn btn-primary" onClick={handleMatchSubmit}>Submit</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </ModalBody>
                        </Modal>
                    </Col>
                </Row>
            </Container>

            <div className="container-fluid text-center">
                <Nav className='nav-pills nav-justified mt-3'>
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
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            players.map((player, idx) => {
                                                return (
                                                    <PlayerRow
                                                        key={idx}
                                                        player={player}
                                                        teams={teams}
                                                        idx={idx}
                                                        storePlayers={storePlayers} />
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
                                        {
                                            teams.map((team, idx) => {
                                                return (
                                                    <TeamRow
                                                        key={idx}
                                                        team={team}
                                                        idx={idx}
                                                        storeTeams={storeTeams} />
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
                                        {
                                            schedules.map((schedule, idx) => {
                                                return (
                                                    <ScheduleRow
                                                        key={idx}
                                                        schedule={schedule}
                                                        teams={teams}
                                                        idx={idx}
                                                        storeSchedules={storeSchedules} />
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
                                        {
                                            users.map((user, idx) => {
                                                return (
                                                    <UserRow
                                                        key={idx}
                                                        user={user}
                                                        idx={idx}
                                                        storeUsers={storeUsers}
                                                    />
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
        </>
    );
}

export default Admin;