import React, { useState, useEffect } from 'react';
import Anonymous from './Anonymous';
import { Row } from 'reactstrap';
import { useBearer } from '../utilities/BearerContext';
import { axiosHelper } from '../utilities/axiosHelper';
import Authenticated from './Authenticated';


function FrontPage() {
    const { bearer } = useBearer();

    useEffect(() => {
        axiosHelper({
            url: '/api/user',
            bearer
        })
    }, [bearer])

    return (
        <>
            {bearer ?
                <>
                    <Row className="d-flex justify-content-center mb-5">
                        <Authenticated/>
                    </Row>
                </>
                :
                <>
                    <Row className="d-flex justify-content-center mb-5">
                        <Anonymous />
                    </Row>
                </>
            }
        </>
    );
}

export default FrontPage;
