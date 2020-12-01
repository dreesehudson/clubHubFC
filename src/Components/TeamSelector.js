import React, { useState, useEffect } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useBearer } from '../utilities/BearerContext'
import axios from 'axios';

const TeamSelector = (props) => {
  const [dropdownOpen, setOpen] = useState(false);
  const { bearer, setUser, user } = useBearer();
  const toggle = () => setOpen(!dropdownOpen);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/api/user',
      data: {},
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${bearer}`
      }
    }
    )
      .then(res => {
        setUser(res.data)
        console.log(res.data)
      })
      .catch(err => console.log('error: ', err));

  }, [bearer]);



  return (
    <ButtonDropdown className="mt-5" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className="mt-5" caret>
        Select A Team
      </DropdownToggle>
      <DropdownMenu>
        {/* {user.players.map((item, idx) => {
          return (
            <DropdownItem key={idx}>
              {item.id}
            </DropdownItem>
          )
        })} */}
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default TeamSelector;