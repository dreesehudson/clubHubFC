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
                client_secret: "N0ZOVXYovxStYb7JWWTu8ctr6K0vkfaeJU0oYqPU",
                password: password,
                username: email,
                scope: ""
            },
        })
            .then(res => {
                saveBearer(res.data)
                console.log(res.data)
            })
            .catch(err => console.log('error: ', err));
    }


    return (
        <>
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
        </>
    );
}

export default UserLogIn;
