import React, { useCallback, useContext, useState } from 'react';
import { Modal, Navbar, NavbarBrand, NavbarToggler, NavLink } from 'reactstrap';
import { translate } from '../../../config/translator';
import { ClavaRootContext } from '../../../config/contexts';
import Sidebar from '../Sidebar';

const Header: React.FC = () => {
  const { l } = useContext(ClavaRootContext);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const onToggle = useCallback(() => {
    setToggleSidebar((t) => !t);
  }, []);
  return (
    <div className="header">
      <Navbar>
        <NavbarToggler onClick={onToggle}>
          <span>lines</span>
          <NavbarBrand />
        </NavbarToggler>
        <NavLink href="/">{translate('home', l)}</NavLink>
      </Navbar>
      <Modal visible={toggleSidebar}>
        <Sidebar />
      </Modal>
    </div>
  );
};

export default Header;
