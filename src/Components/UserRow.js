import React, { useState } from "react";
import { useBearer } from '../utilities/BearerContext';
import { axiosHelper } from '../utilities/axiosHelper';
import {
    Button, Input, Form, CustomInput, FormGroup, Label
} from 'reactstrap';


const UserRow = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [id, setID] = useState(props.user.id);
    const [name, setName] = useState(props.user.name);
    const [email, setEmail] = useState(props.user.email);
    const [admin, setAdmin] = useState(props.user.isAdmin);
    const [checked, setChecked] = useState(props.user.isAdmin);
    const { bearer } = useBearer();

    const checkBoxHandler = () => { 
        setChecked(!checked)
        setAdmin(!admin.toString()) }

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
                    <td>
                        <div class="form-check">
                            <Input disabled checked={admin} className="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1" aria-label="..." />
                        </div>
                    </td>
                    {/* <td><CustomInput checked={admin} disabled type="switch" id="exampleCustomSwitch" name="customSwitch" /></td> */}
                    <td><Button className="btn-warning"
                        onClick={() => setEditMode(true)}>Edit</Button></td>
                    <td><Button className="btn-danger"
                        onClick={() => deleteUserRow(props.user.id)}>Delete</Button></td>
                </tr>
                :
                <>
                    <tr>
                        <th scope="row">{props.user.id}</th>
                        <td><Input defaultValue={props.user.name}
                            onChange={e => setName(e.target.value)}></Input></td>
                        <td><Input defaultValue={props.user.email}
                            onChange={e => setEmail(e.target.value)}></Input></td>
                        <td>
                            <div class="form-check">
                                <Input disabled checked={checked} class="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1" aria-label="..." />
                            </div>
                        </td>
                        {/* <td><CustomInput checked={admin} type="switch" id="exampleCustomSwitch" name="customSwitch"
                            onChange={(e) => toggleAdmin(e.target.value)} /></td> */}
                        <th><Button className="btn-success"
                            onClick={() => {
                                editUserRow({ name, email, admin })
                                setEditMode(false)
                            }}>Submit</Button></th>
                        <th><Button className="btn-secondary"
                            onClick={() => {setEditMode(false)
                                    setName(props.user.name)
                                    setEmail(props.user.email)
                                    setAdmin(props.user.isAdmin)
                            }}>Cancel</Button></th>
                    </tr>
                </>
            }
        </>

    )
}

export default UserRow