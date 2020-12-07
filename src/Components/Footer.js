import React from 'react';
import { Row, Col } from 'reactstrap';

function Footer() {
    return (
        <footer className="bg-primary mt-5 fixed-bottom">
            <Row className='p-2'>
                <Col>
                    <p>Github</p>
                </Col>
                <Col>
                    <p>LinkedIn</p>
                </Col>
                <Col>
                    <p>Portfolio</p>
                </Col>
            </Row>
        </footer>
    );
}

export default Footer;
