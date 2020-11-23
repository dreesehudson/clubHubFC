import React, { useState } from 'react';
// import Wordmark from 'aotc_react/src/img/IA3_Wordmark_Black.png'
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
import Wordmark from '../img/IA3_Wordmark_Black.png'


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);


    
    return (
        <div>
            <header>

            </header>
        </div>
    );
}

export default Header;
