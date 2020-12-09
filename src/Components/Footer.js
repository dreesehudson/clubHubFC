import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
function Footer() {
    return (
        <footer className="bg-primary mt-5 fixed-bottom">
            <Row className='p-2'>
                <Col>
                    <a href='https://github.com/dreesehudson' className='text-dark'><FontAwesomeIcon className='fa-2x mt-2' style={{ color: '#000000' }} icon={faGithub}/><p>Github</p></a>
                </Col>
                <Col>
                    <a href='https://www.linkedin.com/in/dreesehudson/' className='text-dark'><FontAwesomeIcon className='fa-2x mt-2' style={{ color: '#000000' }} icon={faLinkedin}/><p>LinkedIn</p></a>
                </Col>
                <Col>
                    <a href='https://portfolio-hudson.web.app/' className='text-dark'><FontAwesomeIcon className='fa-2x mt-2' style={{ color: '#000000' }} icon={faLayerGroup}/><p>Portfolio</p></a>
                </Col>
            </Row>
        </footer>
    );
}

export default Footer;
