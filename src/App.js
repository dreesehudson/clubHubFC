import React, { useState } from 'react';

import Header from './Components/Header.js';
import RegisterPlayer from './Components/RegisterPlayer.js';
import FrontPage from './Components/FrontPage.js';
import Footer from './Components/Footer.js';
//import axios from 'axios';
import { AppProvider } from './Utilities/AppContext.js'

import './App.css';

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


function App() {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="App">
        <AppProvider>
          <Router>
            {/* <Header /> */}
            <Navbar color="danger" light expand="md">
              <NavbarBrand href="/"><img src='../img/IA3_Wordmark_Black.png' alt='wordmark' /></NavbarBrand>
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <Link to="/">Home</Link>
                  </NavItem>
                  <NavItem>
                    <Link to='/playerRegistration'>Register</Link>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>

            <Switch>
              <Route path="/playerRegistration">
                <RegisterPlayer />
              </Route>
              <Route exact path="/">
                <FrontPage />
              </Route>
            </Switch>
            <Footer />
          </Router>

        </AppProvider>
      </div>
    </>
  );
}

export default App;
