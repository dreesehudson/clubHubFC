import React, { useState, useContext } from 'react';

import Header from './Components/Header.js';
import RegisterPlayer from './Components/RegisterPlayer.js';
import FrontPage from './Components/FrontPage.js';
import Footer from './Components/Footer.js';
import appContext, { AppProvider } from './Utilities/AppContext'
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  
  const initialContext = useContext(appContext);
  const [bearer, setBearer] = useState("");

  return (
    <>
      <div className="App container-fluid">
        <AppProvider value={initialContext}  >
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
    </>
  );
}

export default App;
