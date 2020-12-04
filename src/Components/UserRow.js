import React, { useState } from "react";
import { useBearer } from '../utilities/BearerContext';
import { axiosHelper } from '../utilities/axiosHelper';
import {
    Button, Input, Form
} from 'reactstrap';


const UserRow = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [id, setID] = useState(props.user.id);
    const [name, setName] = useState(props.user.name);
    const [email, setEmail] = useState(props.user.email);
    const [admin, setAdmin] = useState(props.user.isAdmin);
    const { bearer } = useBearer();

    function editUserRow({ name = `${props.user.name}`, email = `${props.user.email}`, admin = `${props.user.isAdmin}` }) {
        axiosHelper({
            method: 'put',
            url: `/editUser/${id}`,
            data: {
                name: name,
                email: email,
                isAdmin: admin,
            }
        })
            .then(axiosHelper({
                url: '/getUsers',
                fun: props.storeUsers
            }))
    }

    function deleteUserRow(id) {
        axiosHelper({
            method: 'delete',
            url: `/deleteUser/${id}`,
            bearer
        })
            .then(axiosHelper({
                url: '/getUsers',
                fun: props.storeUsers
            }))
    }

    return (
        <>
            {!editMode ?
                <tr key={props.idx}>
                    <th scope="row">{props.user.id}</th>
                    <td>{props.user.name}</td>
                    <td>{props.user.email}</td>
                    {/* <FormGroup>
                        <Label for="exampleCheckbox">Switches</Label>
                        <div>
                            <CustomInput type="switch" id="exampleCustomSwitch" name="customSwitch" label="Turn on this custom switch" />
                            <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="Or this one" />
                            <CustomInput type="switch" id="exampleCustomSwitch3" label="But not this disabled one" disabled />
                            <CustomInput type="switch" id="exampleCustomSwitch4" label="Can't click this label to turn on!" htmlFor="exampleCustomSwitch4_X" disabled />
                        </div>
                    </FormGroup> */}
                    <td>{props.user.isAdmin}</td>
                    <td><Button className="btn-warning"
                        onClick={() => setEditMode(true)}
                    >Edit</Button></td>
                    <td><Button className="btn-danger"
                        onClick={() => deleteUserRow(props.user.id)}
                    >Delete</Button></td>
                </tr>
                :
                <>
                    {/* <tr>
                        <th scope="row">{props.user.id}</th>
                        <td><Input defaultValue={props.user.name}
                            onChange={e => setName(e.target.value)}
                        ></Input></td>
                        <td><Input defaultValue={props.user.email}
                            onChange={e => setEmail(e.target.value)}
                        ></Input></td>
                        <CustomInput defaultValue={props.user.isAdmin} type="switch" id="exampleCustomSwitch" name="customSwitch" label="Turn on this custom switch" />
                        <td>
                            onChange={e => setAdmin(e.target.value)}
                    >
                    </td>
                    <th><Button className="btn-success"
                        onClick={() => {
                            editUserRow({ name, email, admin })
                            setEditMode(false)
                        }}
                    >Submit</Button></th>
                    <th><Button className="btn-secondary"
                        onClick={() => setEditMode(false)}
                    >Cancel</Button></th>
                </tr> */}
                </>
            }
        </>

    )
}

export default UserRow