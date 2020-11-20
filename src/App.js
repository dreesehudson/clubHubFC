import React, { useState } from 'react';

import Header from './Components/Header.js'
import Registration from './Components/Registration.js'
import Footer from './Components/Footer.js'
import './App.css';

import {
  Button, Modal, ModalHeader, ModalBody,
  ModalFooter, Input, Label
} from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <Router>
            <Button color="danger" onClick={toggle}>Sign In</Button>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>Register New User</ModalHeader>
              <ModalBody>
                <Label>Name</Label>
                <Input className='mb-2' />
                <Label className='mt-4'>Email</Label>
                <Input className='mb-2' type="email" name="email" id="exampleEmail" placeholder="" />
                <Label className='mt-4'>Password</Label>
                <Input className='mb-2' type="password" name="password" id="examplePassword" placeholder="" />
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="primary" onClick={toggle}>Register</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
            <Registration />

            {/* <Switch>
              <Route path="/playerRegistration">
              </Route>
              <Route path="/">
              </Route>
            </Switch> */}
          </Router>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
