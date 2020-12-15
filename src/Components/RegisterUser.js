import React, { useState } from 'react';
import axios from 'axios';
import { useBearer } from '../utilities/BearerContext'
import { Col, Row, Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function RegisterUser() {
    const { saveBearer } = useBearer();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");


    function HandleSubmit(event) {
        console.log('User Submitted');
        event.preventDefault();
        axios({
            method: 'post',
            // url: 'https://cors-anywhere.herokuapp.com/https://clubhubfc.herokuapp.com/register',
            url: 'http://localhost:8000/register',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "Accept": "application/json"
            },
            data: { name: userName, email: userEmail, password: userPassword }

        })
            .then(res => {
                console.log(res);
                saveBearer(res.data.data.token);
                toggle();
            })
            .catch(err => console.log('error: ', err));
    }

    return (
        <>
            <Button className="mx-2 my-1 btn-dark text-light" onClick={toggle}>Sign Up</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Register New User Account</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <Label>Full Name</Label>
                            <Input className='mb-2' id="userName" onChange={e => setUserName(e.target.value)} />
                            <Label className='mt-4'>Email</Label>
                            <Input className='mb-2' type="email" name="email" id="userEmail" placeholder=""
                                onChange={e => setUserEmail(e.target.value)}
                            />
                            <Label className='mt-4'>Password</Label>
                            <Input className='mb-2' type="password" name="password" id="userPassword" placeholder=""
                                onChange={e => setUserPassword(e.target.value)}
                            />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={HandleSubmit}>Register</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default RegisterUser;
