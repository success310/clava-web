import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { NavbarToggler } from 'reactstrap';
import {
  faArrowLeftToLine,
  faArrowRightFromLine,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClavaContext } from '../../../config/contexts';
import { translate, TranslatorKeys } from '../../../config/translator';
import { isAdmin } from '../../../config/utils';
import AdminVideo from './AdminVideo';
import AdminMatch from './AdminMatch';
import AdminAds from './AdminAds';
import AdminAdministration from './AdminAdministration';
import AdminLeague from './AdminLeague';
import AdminUser from './AdminUser';
import AdminNews from './AdminNews';
import AdminBadges from './AdminBadges';

const Adminpanel: React.FC = () => {
  const { user, l } = useContext(ClavaContext);
  const navigate = useNavigate();
  const { adminSite } = useParams();
  const admin = useMemo(() => isAdmin(user), [user]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((so) => !so);
  }, []);
  useEffect(() => {
    if (!admin) {
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    }
  }, [navigate, admin]);
  return (
    <div className="container full">
      <div className="adminpanel">
        <div className={`adminpanel-sidebar ${sidebarOpen ? 'open' : 'close'}`}>
          <NavbarToggler onClick={toggleSidebar}>
            <FontAwesomeIcon
              icon={sidebarOpen ? faArrowLeftToLine : faArrowRightFromLine}
            />
          </NavbarToggler>
          <NavLink
            to="/backoffice/users"
            className={adminSite === 'users' ? 'selected bold' : ''}>
            {translate('users', l)}
          </NavLink>
          <NavLink
            to="/backoffice/matches"
            className={adminSite === 'matches' ? 'selected bold' : ''}>
            {translate('matches', l)}
          </NavLink>
          <NavLink
            to="/backoffice/administration"
            className={adminSite === 'administration' ? 'selected bold' : ''}>
            {translate('administration', l)}
          </NavLink>
          <NavLink
            to="/backoffice/ads"
            className={adminSite === 'ads' ? 'selected bold' : ''}>
            {translate('ads', l)}
          </NavLink>
          <NavLink
            to="/backoffice/news"
            className={adminSite === 'news' ? 'selected bold' : ''}>
            {translate('news', l)}
          </NavLink>
          <NavLink
            to="/backoffice/leagues"
            className={adminSite === 'leagues' ? 'selected bold' : ''}>
            {translate('leagues', l)}
          </NavLink>
          <NavLink
            to="/backoffice/videos"
            className={adminSite === 'videos' ? 'selected bold' : ''}>
            {translate('videos', l)}
          </NavLink>
          <NavLink
            to="/backoffice/badges"
            className={adminSite === 'badges' ? 'selected bold' : ''}>
            Badges
          </NavLink>
        </div>
        <div className="adminpanel-main">
          <div className="adminpanel-header">
            <h5>{translate('adminpanel', l)}</h5>
            {adminSite && (
              <span>{translate(adminSite as TranslatorKeys, l)}</span>
            )}
          </div>
          {admin ? (
            <div className="adminpanel-content">
              {adminSite === 'users' ? (
                <AdminUser />
              ) : adminSite === 'videos' ? (
                <AdminVideo />
              ) : adminSite === 'matches' ? (
                <AdminMatch />
              ) : adminSite === 'ads' ? (
                <AdminAds />
              ) : adminSite === 'administration' ? (
                <AdminAdministration />
              ) : adminSite === 'leagues' ? (
                <AdminLeague />
              ) : adminSite === 'news' ? (
                <AdminNews />
              ) : adminSite === 'badges' ? (
                <AdminBadges />
              ) : (
                <AdminAdministration />
              )}
            </div>
          ) : (
            <div className="adminpanel-content">
              <span className="text-danger">
                {translate('yourNotAdmin', l)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Adminpanel;
// reload
