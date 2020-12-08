import React from 'react';
import { Row, Col } from 'reactstrap';

function Footer() {
    return (
        <footer className="bg-primary mt-5 fixed-bottom">
            <Row className='p-2'>
                <Col>
                    <p><a href='https://github.com/dreesehudson' className='text-dark'>Github</a></p>
                </Col>
                <Col>
                    <p><a href='https://www.linkedin.com/in/dreesehudson/' className='text-dark'>LinkedIn</a></p>
                </Col>
                <Col>
                    <p><a href='' className='text-dark'>Portfolio</a></p>
                </Col>
            </Row>
        </footer>
    );
}

export default Footer;
