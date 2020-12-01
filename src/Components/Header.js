import React, { useState, useEffect } from 'react';
import { useBearer } from '../utilities/BearerContext'
import axios from 'axios';
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
    const [user, setUser] = useState({});
    const toggle = () => setIsOpen(!isOpen);
    const { bearer, logOut} = useBearer();

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/user',
            data: {},
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${bearer}`
            }
        })
            .then(res => {
                setUser(res.data)
                //console.log(res)
                console.log(user)
            })
            .catch(err => console.log('error: ', err));

    }, [bearer])

    return (
        <>
            <Navbar className="mb-3 fixed-top" color="danger" light expand="md">
                <NavbarBrand href="/"><h1><b>League Name</b></h1></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {user.isAdmin &&
                            <>
                                <NavItem>
                                    <Button className="mx-2 my-1 btn-dark" href="/admin">Admin</Button>
                                </NavItem>
                            </>
                        }
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

                        {bearer && 
                        <NavItem>
                            <Button className="mx-2 my-1 btn-dark text-light" onClick={logOut}>Log Out</Button>
                        </NavItem>}
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
}

export default Header;
