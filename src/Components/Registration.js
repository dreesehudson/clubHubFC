import React, { useState } from 'react';

import {
    Col, Row, Container, Button, Form, FormGroup, Label, Input, Jumbotron
} from 'reactstrap';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


function Registration() {

    return (
        <>
            <Router>
                <Container className="App text-left">
                    <Jumbotron>
                        <h2 className="display-4" >New Player Sign-Up</h2>
                        <Form className="mt-5">
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Label for="first">First Name</Label>
                                    <Input name="First Name" id="firstName" />
                                </Col>
                                <Col className="col-6">
                                    <Label for="last">Last Name</Label>
                                    <Input name="Last Name" id="LastName" />
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Label for="exampleSelect">Age Group</Label>
                                    <Input type="select" name="select" id="exampleSelect">
                                        <option>Open</option>
                                        <option disabled>U8</option>
                                        <option disabled>U10</option>
                                        <option disabled>U12</option>
                                        <option disabled>U14</option>
                                    </Input>
                                </Col>
                                <Col className="col-6">
                                    <FormGroup className="form-check-inline" tag="fieldset">
                                        <FormGroup check>
                                            <Label check>
                                                <Input checked type="radio" name="radio1" />{' '} Co-ed</Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="radio2" disabled />{' '} Boys</Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="radio3" disabled />{' '} Girls</Label>
                                        </FormGroup>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Label for="teamSelect">Team</Label>
                                <Col className="col-6">
                                    <Input type="select" name="select" id="teamSelect">
                                        <option>Galaxy</option>
                                        {/* dynamic list of teams */}

                                    </Input>
                                </Col>
                                <Col className="col-6">
                                </Col>

                            </Row>

                            <Row check className="mt-3 text-center">
                                <Col >
                                    <Button type="submit" className="btn btn-danger">Submit</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Jumbotron>
                </Container>
            </Router>
        </>
    );
}

export default Registration;
