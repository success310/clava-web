import React, { useCallback, useContext, useState } from 'react';
import { Modal, Navbar, NavbarToggler, NavLink } from 'reactstrap';
import {
  faArrowRightToLine,
  faBars,
  faHouse,
  faNewspaper,
  faUser,
  faUserNinja,
  faUserTie,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ConnectedProps } from 'react-redux';
import { translate } from '../../../config/translator';
import { ClavaContext } from '../../../config/contexts';
import Sidebar from '../Sidebar';
import Logo from '../Logo';
import { connector } from './redux';
import { isAdmin, isInsider } from '../../../config/utils';

const SidebarFadeTrans = {
  timeout: 250,
  baseClass: 'sidebar',
};
const Header: React.FC<ConnectedProps<typeof connector>> = ({
  user,
  newInsiders,
}) => {
  const { l } = useContext(ClavaContext);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const onToggle = useCallback(() => {
    setToggleSidebar((t) => !t);
  }, []);

  return (
    <>
      <Navbar className="header">
        <NavLink to="/home">
          <Logo onPress={undefined} />
        </NavLink>
        <NavLink to="/home">
          <FontAwesomeIcon icon={faHouse} />
          {translate('home', l)}
        </NavLink>
        <NavLink to="/news">
          <FontAwesomeIcon icon={faNewspaper} />
          {translate('news', l)}
        </NavLink>
        <NavLink to="/profile">
          <FontAwesomeIcon
            icon={
              isAdmin(user) ? faUserNinja : isInsider(user) ? faUserTie : faUser
            }
          />

          <span>
            {translate(!user || user.anonymous ? 'login' : 'profile', l)}
          </span>
        </NavLink>
        <NavbarToggler onClick={onToggle}>
          <FontAwesomeIcon icon={toggleSidebar ? faArrowRightToLine : faBars} />
        </NavbarToggler>
      </Navbar>
      <Modal
        isOpen={toggleSidebar}
        modalTransition={SidebarFadeTrans}
        backdrop={false}
        unmountOnClose={false}>
        <Sidebar />
      </Modal>
    </>
  );
};
// reload
export default connector(Header);
