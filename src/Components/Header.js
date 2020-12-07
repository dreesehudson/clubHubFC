import React, { useState, useEffect } from 'react';
import { useBearer } from '../utilities/BearerContext';
import { axiosHelper } from '../utilities/axiosHelper';
import RegisterPlayer from '../Components/RegisterPlayer'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';

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
                    <h1><b>ClubHubFC</b></h1>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {user.isAdmin &&
                            <>
                                <NavItem>
                                    <Button className="mx-2 my-1 btn-dark"
                                        href="/admin">Admin</Button>
                                </NavItem>
                            </>
                        }
                        <NavItem>
                            <Button className="mx-2 my-1 btn-dark text-light"
                                href="/">Home</Button>
                        </NavItem>
                        {bearer &&
                            <NavItem>
                                <Button className='mx-2 my-1 btn-dark text-light' onClick={toggleModal}>Register</Button>
                                <Modal isOpen={modal} toggle={toggleModal} className={className}>
                                    <ModalHeader toggle={toggleModal} close={closeBtn} />
                                    <ModalBody>
                                        <RegisterPlayer />
                                    </ModalBody>
                                </Modal>
                            </NavItem>}
                        <NavItem>
                            <Button target="_blank"
                                rel="noreferrer"
                                className="mx-2 my-1 btn-dark"
                                href='https://www.iam3rd.org/wp-content/uploads/2020/08/Fall-2020-Rules.pdf'>Rules</Button>
                        </NavItem>

                        {bearer &&
                            <NavItem>
                                <Button className="mx-2 my-1 btn-dark text-light"
                                    onClick={logOut}>Log Out</Button>
                            </NavItem>}
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
}

export default Header;
