import React from 'react';
import { Row, Col } from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-danger mt-5 fixed-bottom">
            <Row>
                <Col>
                </Col>
                <Col>
                    <p>Footer</p>
                </Col>
                <Col>
                </Col>
            </Row>
        </footer>
    );
}

export default Footer;
