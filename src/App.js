import React, { useState } from 'react';

import Header from './Components/Header.js';
import RegisterPlayer from './Components/RegisterPlayer.js';
import FrontPage from './Components/FrontPage.js';
import FooterBar from './Components/FooterBar.js';
import { AppProvider } from './Utilities/AppContext.js'
import './App.css';

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
      <div className="App container-fluid">
        <AppProvider>
          <Router>
            <Header />
            <Switch>
              <Route path="/playerRegistration">
                <RegisterPlayer />
              </Route>
              <Route exact path="/">
                <FrontPage />
              </Route>
            </Switch>
            <FooterBar />
          </Router>
        </AppProvider>
      </div>
    </>
  );
}

export default App;
