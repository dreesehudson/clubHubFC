import React, { useState } from 'react';
import { useBearer } from '../utilities/BearerContext'
import axios from 'axios'
import {
    Col, Row, Button, Label, Input, Modal, ModalHeader, ModalBody,
    ModalFooter
} from 'reactstrap';

function UserLogIn() {
    const { saveBearer } = useBearer();

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function HandleSubmit() {
        axios({
            method: 'post',
            url: 'http://localhost:8000/v1/oauth/token',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "Accept": "application/json"
            },
            data: {
                grant_type: "password",
                client_id: 2,
                client_secret: "tvPgcMUI6FQ5BA0qbH76y7HKIprmYiNKTzgVcpqa",
                password: password,
                username: email,
                scope: ""
            },
        })
            .then(res => {
                saveBearer(res.data.access_token)
                toggle()
            })
            .catch(err => console.log('error: ', err));
    }


    return (
        <>
            <Button className="btn-lg mt-3 mr-2" color="primary" onClick={toggle}>Log In</Button>
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
                    <Button type="submit" color="primary" onClick={HandleSubmit}>Log In</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default UserLogIn;
