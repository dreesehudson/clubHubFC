import React from 'react';
import Header from './Components/Header';
import FrontPage from './Components/FrontPage';
import Footer from './Components/Footer';
import { AppProvider } from './utilities/BearerContext'
import './App.css';

import {
    BrowserRouter as Router,
} from "react-router-dom";


function App() {

    return (
        <div className="App container-fluid">
            <AppProvider >
                <Router>
                    <Header />
                    <FrontPage />
                    <Footer />
                </Router>
            </AppProvider>
        </div>
    );
}

export default App;
