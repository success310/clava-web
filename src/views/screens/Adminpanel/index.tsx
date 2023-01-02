import { ConnectedProps } from 'react-redux';
import React, { useContext, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { ClavaContext } from '../../../config/contexts';
import { translate, TranslatorKeys } from '../../../config/translator';
import { connector } from './redux';
import { isAdmin } from '../../../config/utils';
import AdminVideo from './AdminVideo';
import AdminMatch from './AdminMatch';
import AdminAds from './AdminAds';

const Adminpanel: React.FC<ConnectedProps<typeof connector>> = ({
  patchMatch,
  patchUser,
  createMatch,
  createMatchBatch,
  clearCache,
}) => {
  const { user, l } = useContext(ClavaContext);
  const navigate = useNavigate();
  const { adminSite } = useParams();
  const admin = useMemo(() => isAdmin(user), [user]);
  useEffect(() => {
    if (!admin) {
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    }
  }, [navigate, admin]);
  return (
    <div className="container">
      <div className="adminpanel">
        <div className="adminpanel-sidebar">
          <NavLink
            to="/backoffice/users"
            className={adminSite === 'users' ? 'selected bold' : ''}>
            {translate('users', l)}
          </NavLink>
          <NavLink
            to="/backoffice/matches"
            className={adminSite === 'users' ? 'selected bold' : ''}>
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
                <>
                  <span>Create user</span>
                  <span>Create user</span>
                </>
              ) : adminSite === 'videos' ? (
                <AdminVideo />
              ) : adminSite === 'matches' ? (
                <AdminMatch />
              ) : adminSite === 'ads' ? (
                <AdminAds />
              ) : (
                <>
                  <span>else</span>
                  <span>lol</span>
                </>
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

export default connector(Adminpanel);
// re load
