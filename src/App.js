import React from 'react';

import Header from './Components/Header';
import RegisterPlayer from './Components/RegisterPlayer';
import FrontPage from './Components/FrontPage';
import Footer from './Components/Footer';
import { AppProvider } from './utilities/BearerContext'
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  
  return (
      <div className="App container-fluid">
        <AppProvider >
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
            <Footer />
          </Router>
        </AppProvider>
      </div>
  );
}

export default App;
