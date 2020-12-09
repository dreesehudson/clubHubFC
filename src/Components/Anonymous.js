import React from 'react';
import shield from '../img/shield.png';
import { Row, Container, Col } from 'reactstrap';

function Anonymous() {
    return (
        <>
            <Container className="container-fluid">
                <Row className="d-flex justify-content-center">
                    <Col className='col-3'>
                    </Col>
                    <Col className='col-6'>
                        <img className=" pt-5 img-fluid mt-5" alt="logo" src={shield} />
                    </Col>
                    <Col className='col-3'>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Anonymous