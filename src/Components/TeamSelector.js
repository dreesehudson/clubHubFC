import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const TeamSelector = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown className="mt-5" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className="mt-5" caret>
        Select A Team
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Available Teams</DropdownItem>
        {/* Map through teams associated with this user */}
        <DropdownItem>Another Action</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Another Action</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default TeamSelector;