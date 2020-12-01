import React, { useState } from 'react';
import { axiosHelper } from '../utilities/axiosHelper';

import {
    Col, Row, Button, Label, Input, Modal, ModalHeader, ModalBody,
    ModalFooter
} from 'reactstrap';

function RegisterUser() {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    function handleSubmit(event) {
        console.log('User Submitted');
        event.preventDefault();

        axiosHelper({
            url: '/register',
            method: 'post',
            data: { name: userName, email: userEmail, password: userPassword }
        })
    }

    return (
        <>
            <Button className="btn-lg mt-3 ml-2" color="danger" onClick={toggle}>Sign Up</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Register New User Account</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <Label>Name</Label>
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
                    <Button type="submit" color="danger" onClick={handleSubmit}>Register</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default RegisterUser;
