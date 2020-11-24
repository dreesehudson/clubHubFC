import React, { useState } from 'react';
import { useBearer } from '../utilities/BearerContext'
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
    const toggle = () => setIsOpen(!isOpen);
    const {bearer, logOut} = useBearer();


    return (
        <div>
            <header className="fixed-top">
                {/* <Header /> */}
                <Navbar color="danger" light expand="md">
                    <NavbarBrand href="/"><h1 className="display-5"><b>League Name</b></h1></NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Button className="m-2 btn-dark text-light" to="/">Home</Button>
                            </NavItem>
                            <NavItem>
                                <Button className="m-2 btn-dark text-light" to="/about">About</Button>
                            </NavItem>
                            {bearer &&
                                <NavItem>
                                    <Button className="m-2 btn-dark text-light" to='/playerRegistration'>Register</Button>
                                </NavItem>}
                            <NavItem>
                                <Button target="_blank" rel="noreferrer" className="m-2 btn-dark" href='https://www.iam3rd.org/wp-content/uploads/2020/08/Fall-2020-Rules.pdf'>Rules</Button>
                            </NavItem>
                            
                            {bearer && <NavItem>
                                <Button className="m-2 btn-dark text-light" onClick={logOut}>Log Out</Button>
                            </NavItem>}
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        </div>
    );
}

export default Header;
