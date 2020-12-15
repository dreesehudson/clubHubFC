import React, { useState } from 'react';
import { FormGroup, CustomInput } from 'reactstrap';


function Switch() {
    return (
        <FormGroup>
            <div>
                <CustomInput type="switch" id="exampleCustomSwitch" name="customSwitch" label="Active Registration Window" />
            </div>
        </FormGroup>

    )

}

export default Switch