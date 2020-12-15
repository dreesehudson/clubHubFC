import React, { useState, useEffect } from 'react';
import { useBearer } from '../utilities/BearerContext';
import { axiosHelper } from '../utilities/axiosHelper';
import UserLogIn from './UserLogIn';
import RegisterUser from './RegisterUser';
import RegisterPlayer from '../Components/RegisterPlayer'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button, Modal, ModalHeader, ModalBody, Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol } from '@fortawesome/free-solid-svg-icons'

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({});
    const toggle = () => setIsOpen(!isOpen);
    const { bearer, logOut } = useBearer();
    const [modal, setModal] = useState(false);
    const { className } = props;
    const toggleModal = () => setModal(!modal);
    const closeBtn = <button className="close" onClick={toggleModal}>&times;</button>;


    useEffect(() => {
        axiosHelper({
            url: '/api/user',
            bearer,
            setUser
        })
    }, [bearer])

    return (
        <>
            <Navbar className="mb-3 fixed-top"
                color="primary"
                expand="md"
                light>
                <NavbarBrand href="/">
                    <Container>
                        <Row>
                            <Col>
                                <FontAwesomeIcon className='fa-3x ml-auto mr-0 pr-0' icon={faFutbol} />
                            </Col>
                            <Col>
                                <h1 className='ml-0 my-auto mr-auto pr-0'><b>ClubHubFC</b></h1>
                            </Col>
                        </Row>
                    </Container>

                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button target="_blank"
                                rel="noreferrer"
                                className="btn mx-2 my-1 btn-dark text-light"
                                href='https://www.iam3rd.org/wp-content/uploads/2020/08/Fall-2020-Rules.pdf'>Rules</Button>
                        </NavItem>
                        {bearer ?
                            <>
                                <NavItem>
                                    <Button className='btn mx-2 my-1 btn-dark text-light' onClick={toggleModal}>Register</Button>
                                    <Modal isOpen={modal} toggle={toggleModal} className={className}>
                                        <ModalHeader toggle={toggleModal} close={closeBtn} />
                                        <ModalBody>
                                            <RegisterPlayer />
                                        </ModalBody>
                                    </Modal>
                                </NavItem>
                                <NavItem>
                                    <Button className="btn mx-2 my-1 btn-dark text-light"
                                        onClick={logOut}>Log Out</Button>
                                </NavItem>
                            </>
                            :
                            <>
                                <UserLogIn />
                                <RegisterUser />
                            </>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
}

export default Header;
