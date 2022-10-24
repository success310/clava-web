import React, { useContext } from 'react';
import { Navbar, NavbarBrand, NavLink } from 'reactstrap';
import { ClavaRootContext } from '../../../config/contexts';
import { translate } from '../../../config/translator';

const Sidebar: React.FC = () => {
  const { l } = useContext(ClavaRootContext);
  return (
    <div className="sidebar">
      <Navbar className="navbar-vertical">
        <NavbarBrand />
        <NavLink href="/settings">{translate('language', l)}</NavLink>
        <NavLink href="/settings">{translate('chooseAoi', l)}</NavLink>
        <NavLink href="/settings">{translate('contactUs', l)}</NavLink>
        <NavLink href="/settings">{translate('adsOnClava', l)}</NavLink>
        <NavLink href="/settings">{translate('aboutUs', l)}</NavLink>
      </Navbar>
    </div>
  );
};

export default Sidebar;
