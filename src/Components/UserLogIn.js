import React, { useState } from 'react';

import {
    Col, Row, Button, Label, Input, Modal, ModalHeader, ModalBody,
    ModalFooter
} from 'reactstrap';

import {
    BrowserRouter as Router,
    // Switch,
    // Route,
    // Link
} from "react-router-dom";
import axios from 'axios';



function UserLogIn({bearer, setBearer}) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        const url = 'http://localhost:8000/v1/oauth/token'
        const method = 'post'
        const headers = {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
        const data = { 
            grant_type: "password",
            client_id: 2,
            client_secret: "PqPvySh7lgiQSAlH58Ag8xeapeCblT9MG5XtbTNN",
            password: userPassword,
            username: userEmail,
            scope: ""
        };
        axios({
            url,
            method,
            headers,
            data
        })
        .then(res => setBearer(prevBearer => prevBearer = res.data.access_token))
        .catch(err => console.log('error: ', err));
        console.log({bearer})
        }
    
    return (
        <>
            <Router>
                <Button className="mt-3 mr-2" color="danger" onClick={toggle}>Log In</Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Welcome Back, Log In</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col>
                                <Label className='mt-4'>Email</Label>
                                <Input className='mb-2' type="email" name="email" id="userEmail"
                                    onChange={e => setUserEmail(e.target.value)}
                                />
                                <Label className='mt-4'>Password</Label>
                                <Input className='mb-2' type="password" name="password" id="userPassword"
                                    onChange={e => setUserPassword(e.target.value)}
                                />

                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="danger" onClick={handleSubmit}>Log In</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Router>
        </>
    );
}

export default UserLogIn;
