import React, { useCallback, useContext, useState } from 'react';
import { Modal, Navbar, NavbarToggler } from 'reactstrap';
import { NavLink } from 'react-router-dom';
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
        <NavLink to="/feed/news">
          <FontAwesomeIcon icon={faNewspaper} />
          {translate('news', l)}
        </NavLink>
        <NavLink to={!user || user.anonymous ? '/login' : '/profile'}>
          <FontAwesomeIcon
            icon={
              isAdmin(user) ? faUserNinja : isInsider(user) ? faUserTie : faUser
            }
          />
          <span>
            {!user || user.anonymous
              ? translate('login', l)
              : `Hi ${user.username}`}
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
