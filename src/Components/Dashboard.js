import React, { useState, useEffect } from 'react';
import {
    Container, Row, Col, Button, Modal, ModalHeader, ModalBody
} from 'reactstrap';
import { useBearer } from '../utilities/BearerContext'
import { axiosHelper } from '../utilities/axiosHelper'
import PlayerJumbotron from '../Components/PlayerJumbotron'
import RegisterPlayer from '../Components/RegisterPlayer'

function Dashboard(props) {
    const { bearer } = useBearer();
    const [user, setUser] = useState({})
    const [modal, setModal] = useState(false);
    const { className } = props;
    const toggleModal = () => setModal(!modal);
    const closeBtn = <button className="close" onClick={toggleModal}>&times;</button>;

    const storeUser = (response) => {
        setUser(response)
    }

    useEffect(() => {
        axiosHelper({
            url: '/api/user',
            fun: storeUser,
            bearer
        })
    }, [bearer])

    return (
        <>
            <Container className="">
                <Row>
                    {user.hasOwnProperty('players') && user.players.hasOwnProperty(0) ?
                        user.players.map((item, idx) => {
                            return (
                                <PlayerJumbotron
                                    key={idx}
                                    player={item}
                                />
                            )
                        })
                        :
                        <Col className="col-12 mt-5">
                            <h3 className=' display-3 mt-5'>No Players Registered.</h3>
                            <Button color="primary" className="my-3" onClick={toggleModal}>Register New Player</Button>
                            <Modal isOpen={modal} toggle={toggleModal} className={className}>
                                <ModalHeader toggle={toggleModal} close={closeBtn} />
                                <ModalBody>
                                    <RegisterPlayer />
                                </ModalBody>
                            </Modal>
                        </Col>
                    }
                </Row>
            </Container>
        </>
    );
};

export default Dashboard;



