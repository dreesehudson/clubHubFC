import React, { useState } from 'react';
import rules from '../pdf/Fall-2020-Rules.pdf'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button
} from 'reactstrap';
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    Link
} from "react-router-dom";


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    //function logOut() {
    //  setBearer="";
    //}

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
                                <Link className="m-2 text-light" to="/">Home</Link>
                            </NavItem>
                            <NavItem>
                                <Link className="m-2 text-light" to='/playerRegistration'>Register</Link>
                            </NavItem>
                            <NavItem>
                                <a target="_blank" rel="noreferrer" className="m-2 text-light" href='https://www.iam3rd.org/wp-content/uploads/2020/08/Fall-2020-Rules.pdf'>Rules</a>
                            </NavItem>
                            if (userLoggedIn) {
                                <NavItem>
                                    <Button className="m-2 bg-dark" onClick="logOut">Log Out</Button>
                                </NavItem>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        </div>
    );
}

export default Header;
