import React from 'react';
import shield from '../img/shield.png';
import { Row, Container, Col } from 'reactstrap';

function Anonymous() {
    return (
        <>
            <Container className="container-fluid">
                <Row className="d-flex justify-content-center">
                    <Col className='col-2'>
                    </Col>
                    <Col className='col-8'>
                        <img className=" pt-5 img-fluid mt-5" alt="logo" src={shield} />
                    </Col>
                    <Col className='col-2'>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Anonymous