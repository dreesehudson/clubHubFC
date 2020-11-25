import React, { useState } from 'react';
import { useBearer } from '../utilities/BearerContext'
import { useAdmin } from '../utilities/AdminContext'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button
} from 'reactstrap';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { bearer, logOut } = useBearer();
    const { adminMode, toggleAdminMode } = useAdmin();

    return (
        <>


            <Navbar className="mb-3 fixed-top" color="danger" light expand="md">
                <NavbarBrand href="/"><h1><b>League Name</b></h1></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {!isAdmin &&
                            <NavItem>
                                <Button className="mx-2 my-1 btn-dark" href="/admin">Admin</Button>
                            </NavItem>}
                        {!isAdmin &&
                            <NavItem>
                                <Button className="mx-2 my-1 btn-dark" onClick={toggleAdminMode} >Admin Mode</Button>
                            </NavItem>}
                        <NavItem>
                            <Button className="mx-2 my-1 btn-dark text-light" href="/">Home</Button>
                        </NavItem>
                        <NavItem>
                            <Button className="mx-2 my-1 btn-dark text-light" href="/about">About</Button>
                        </NavItem>
                        {bearer &&
                            <NavItem>
                                <Button className="mx-2 my-1 btn-dark text-light" href='/playerRegistration'>Register</Button>
                            </NavItem>}
                        <NavItem>
                            <Button target="_blank" rel="noreferrer" className="mx-2 my-1 btn-dark" href='https://www.iam3rd.org/wp-content/uploads/2020/08/Fall-2020-Rules.pdf'>Rules</Button>
                        </NavItem>

                        {bearer && <NavItem>
                            <Button className="mx-2 my-1 btn-dark text-light" onClick={logOut}>Log Out</Button>
                        </NavItem>}
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
}

export default Header;
