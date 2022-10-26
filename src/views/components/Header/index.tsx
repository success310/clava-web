import React, { useCallback, useContext, useState } from 'react';
import { Modal, Navbar, NavbarToggler, NavLink } from 'reactstrap';
import {
  faArrowLeftToLine,
  faBars,
  faHouse,
  faNewspaper,
  faTrophy,
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
        <NavbarToggler onClick={onToggle}>
          <FontAwesomeIcon icon={toggleSidebar ? faArrowLeftToLine : faBars} />
          <Logo onPress={undefined} />
        </NavbarToggler>
        <NavLink href="/home">
          <FontAwesomeIcon icon={faHouse} />
          {translate('home', l)}
        </NavLink>
        <NavLink href="/leagues">
          <FontAwesomeIcon icon={faTrophy} />
          {translate('leagues', l)}
        </NavLink>
        <NavLink href="/news">
          <FontAwesomeIcon icon={faNewspaper} />
          {translate('news', l)}
        </NavLink>
        <NavLink href="/profile">
          <FontAwesomeIcon
            icon={
              isAdmin(user) ? faUserNinja : isInsider(user) ? faUserTie : faUser
            }
          />
          <span>{translate('profile', l)}</span>
        </NavLink>
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
