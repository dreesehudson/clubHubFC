import React, { useState } from 'react';
import { useBearer } from '../utilities/BearerContext'
import { useUser } from '../utilities/UserContext'
import { axiosHelper } from '../utilities/axiosHelper'
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




function UserLogIn() {
    const { saveBearer } = useBearer();
    const { saveUser } = useUser();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [email, setUserEmail] = useState("");
    const [password, setUserPassword] = useState("");

    function handleSubmit(event) {
        const url = "http://localhost:8000/v1/oauth/token"
        const method = 'post'
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
        const data = {
            grant_type: "password",
            client_id: 2,
            client_secret: "2ZSVMlwsAc4ogHGrkZ1c4A5ZewKNXgVXmi6gHrbm",
            password: password,
            username: email,
            scope: ""
        };
        
        //axiosHelper('post', '/v1/oath/token', headers, data, saveBearer);
        
        axios({
            url,
            method,
            data,
            headers
        })
            .then(res => saveBearer(res.data.access_token))
            .catch(err => console.log('error: ', err));

        //saveUser(email)
    }

    return (
        <>
            <Router>
                <Button className="btn-lg mt-3 mr-2" color="danger" onClick={toggle}>Log In</Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Welcome Back, Log In</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col>
                                <Label className='mt-4'>Email</Label>
                                <Input className='mb-2' type="email" name="email" id="email"
                                    onChange={e => setUserEmail(e.target.value)}
                                />
                                <Label className='mt-4'>Password</Label>
                                <Input className='mb-2' type="password" name="password" id="password"
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
