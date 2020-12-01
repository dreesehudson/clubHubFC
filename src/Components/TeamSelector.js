import React, { useState, useEffect } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useBearer } from '../utilities/BearerContext'
import { axiosHelper } from '../utilities/axiosHelper'


const TeamSelector = (props) => {
  const [dropdownOpen, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const { bearer/*, setUser, user*/ } = useBearer();
  const toggle = () => setOpen(!dropdownOpen);

  useEffect(() => {
    axiosHelper({
      url: '/api/user',
      bearer,
      setUser
    })
  }, [bearer]);

  return (
    <ButtonDropdown className="mt-5" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className="mt-5" caret>
        Select Your Player
      </DropdownToggle>
      <DropdownMenu>
        {(Object.keys(user).length > 0) &&
        user.players.map((item, idx) => {
          return (
            <DropdownItem key={idx}>
              {item.first_name} {item.last_name}
            </DropdownItem>
          )
        })}
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default TeamSelector;