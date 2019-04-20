import React, { useState } from 'react';
import { Dropdown, DropdownMenu as Menu, DropdownToggle, DropdownItem } from 'reactstrap';

interface Props {
  options: any[];
}

export default function DropdownMenu({ options = [] }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (options.length === 0) {
    return null;
  }

  return (
    <Dropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
      <DropdownToggle caret>
        Food Items
      </DropdownToggle>
      <Menu>
        {options.map(f => (
          <DropdownItem key={`${f.name}-${f.servingSize}`}>{f.name}</DropdownItem>
        ))}
      </Menu>
    </Dropdown>
  );
}