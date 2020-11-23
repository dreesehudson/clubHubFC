import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function FooterBar() {
    return (
        <footer className="bg-danger fixed-bottom">
            <div>
                <p>Footer</p>
            </div>
        </footer>
    );
}

export default FooterBar;
