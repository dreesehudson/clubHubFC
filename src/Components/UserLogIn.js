import React, { useState, useEffect } from 'react';
import { useBearer } from '../utilities/BearerContext'
import { axiosHelper } from '../utilities/axiosHelper'
import {
    Col, Row, Button, Label, Input, Modal, ModalHeader, ModalBody,
    ModalFooter
} from 'reactstrap';

import {
    BrowserRouter as Router,
} from "react-router-dom";
import axios from 'axios';

function UserLogIn() {
    const { saveBearer } = useBearer();
 
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function HandleSubmit(event, bearer) {
        const url = "http://localhost:8000/v1/oauth/token"
        const method = 'post'
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
        const data = {
            grant_type: "password",
            client_id: 2,
            client_secret: "UK1NM2cI4ahsm3a11378jX2t3UepkkdSrl8qHW7X",
            password: password,
            username: email,
            scope: ""
        };
        
        //axiosHelper('post', '/v1/oath/token', headers, data, res => saveBearer(res.data.access_token));
        
        axios({
            method,
            url,
            data,
            headers
        })
            .then(res => saveBearer(res.data.access_token))
            .catch(err => console.log('error: ', err));

        //once axios call completes get User Info

        useEffect(() => {
            axios({
                method: 'get',
                url:'http://localhose:8000/getUserByEmail/',
                data: email,
                headers:''
            }
            )
            .then(res => console.log(res.data.access_token))
            .catch(err => console.log('error: ', err));
        }, [bearer]);
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
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <Label className='mt-4'>Password</Label>
                                <Input className='mb-2' type="password" name="password" id="password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="danger" onClick={HandleSubmit}>Log In</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Router>
        </>
    );
}

export default UserLogIn;
