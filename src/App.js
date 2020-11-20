import React, { useState } from 'react';

import Header from './Components/Header.js';
import RegisterPlayer from './Components/RegisterPlayer.js';
import RegisterUser from './Components/RegisterUser.js';
import UserLogIn from './Components/UserLogIn.js';
import Footer from './Components/Footer.js';
//import axios from 'axios';
import './App.css';

import {
  BrowserRouter as Router,
//  Switch,
//  Route,
//  Link
} from "react-router-dom";


function App() {

  const [bearer, setBearer] = useState("");


  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <Router>
            <UserLogIn
              bearer={bearer}
              setBearer={setBearer}
            />
            <RegisterUser />
            <RegisterPlayer />

            {/* <Switch>
              <Route path="/playerRegistration">
              </Route>
              <Route path="/">
              </Route>
            </Switch> */}
          </Router>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;