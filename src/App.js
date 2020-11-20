import React, { useState } from 'react';

import Header from './Components/Header.js';
import Registration from './Components/Registration.js';
import Footer from './Components/Footer.js';
import axios from 'axios';
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
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  function handleSubmit(event){
    console.log('User Submitted');
    event.preventDefault();
    const url = 'http://localhost:8000/register'
    const method = 'post'
    const headers = {
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*'
    }
    const body ={name:userName, email:userEmail, password:userPassword}
    const data ={name:userName, email:userEmail, password:userPassword}
    console.log({body});
    axios({
        url,
        method,
        headers,
        body,
        data
    })
    .then(res => console.log(res))
    .catch(err => console.log('error: ', err))
  }


  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <Router>
            <Button color="danger" onClick={toggle}>Sign In</Button>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>Register New User Account</ModalHeader>
              <ModalBody>
                <Label>Name</Label>
                <Input className='mb-2' id="userName" onChange={e => setUserName(e.target.value)}/>
                <Label className='mt-4'>Email</Label>
                <Input className='mb-2' type="email" name="email" id="userEmail" placeholder="" 
                  onChange={e => setUserEmail(e.target.value)}
                />
                <Label className='mt-4'>Password</Label>
                <Input className='mb-2' type="password" name="password" id="userPassword" placeholder="" 
                  onChange={e => setUserPassword(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="primary" onClick={handleSubmit}>Register</Button>{' '}
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
