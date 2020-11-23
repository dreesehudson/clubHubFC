import React, { useState } from 'react';
// import wordmark from 'ßaotc_react/src/img/IA3_Wordmark_Black.png'
//import  from './Components/'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);



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
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        </div>
    );
}

export default Header;
