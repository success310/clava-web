import React, { useContext } from 'react';
import { Navbar, NavLink } from 'reactstrap';
import {
  faAd,
  faInfoCircle,
  faLanguage,
  faMailbox,
  faMap,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClavaContext } from '../../../config/contexts';
import { translate } from '../../../config/translator';

const Sidebar: React.FC = () => {
  const { l } = useContext(ClavaContext);
  return (
    <Navbar className="navbar-vertical">
      <NavLink href="/settings">
        <FontAwesomeIcon icon={faLanguage} />
        <span>{translate('language', l)}</span>
      </NavLink>
      <NavLink href="/settings">
        <FontAwesomeIcon icon={faMap} />
        <span>{translate('chooseAoi', l)}</span>
      </NavLink>
      <NavLink href="/settings">
        <FontAwesomeIcon icon={faMailbox} />
        <span>{translate('contactUs', l)}</span>
      </NavLink>
      <NavLink href="/settings">
        <FontAwesomeIcon icon={faAd} />
        <span>{translate('adsOnClava', l)}</span>
      </NavLink>
      <NavLink href="/settings">
        <FontAwesomeIcon icon={faInfoCircle} />
        <span>{translate('aboutUs', l)}</span>
      </NavLink>
      <NavLink className="mt-5">
        <small className="text-center">
          &copy; Copyright 2022
          <br />
          Clava Sports
        </small>
      </NavLink>
    </Navbar>
  );
};

export default Sidebar;
