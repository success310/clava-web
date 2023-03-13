import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Navbar } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import {
  faAd,
  faHouse,
  faInfoCircle,
  faLanguage,
  faMailbox,
  faMap,
  faNewspaper,
  faServer,
  faUser,
  faUserNinja,
  faUserTie,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ConnectedProps } from 'react-redux';
import { ClavaContext } from '../../../config/contexts';
import { showTranslated, translate } from '../../../config/translator';
import { connector } from './redux';
import { isAdmin, isInsider } from '../../../config/utils';
import client from '../../../client';
import {
  BETA_ENDPOINT,
  DEV_ENDPOINT,
  PROD_ENDPOINT,
} from '../../../config/constants';

const endpoints = {
  Production: PROD_ENDPOINT,
  Beta: BETA_ENDPOINT,
  Dev: DEV_ENDPOINT,
};

const Sidebar: React.FC<ConnectedProps<typeof connector>> = ({
  user,
  languages,
  changeLang,
  aois,
  getLanguages,
  getAois,
  changeAoi,
  setEndpoint,
}) => {
  const { l, aoi } = useContext(ClavaContext);
  const [langOpen, setLangOpen] = useState(false);
  const [aoiOpen, setAoiOpen] = useState(false);
  const [endpointsOpen, setEndpointOpen] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState(
    client().getEndpoint() === PROD_ENDPOINT
      ? 'Production'
      : client().getEndpoint() === BETA_ENDPOINT
      ? 'Beta'
      : 'Dev',
  );
  useEffect(() => {
    getLanguages();
    getAois();
  }, [getLanguages, getAois]);
  const onToggleLang = useCallback(() => {
    setLangOpen((oldL) => !oldL);
  }, []);
  const onToggleAoi = useCallback(() => {
    setAoiOpen((oldA) => !oldA);
  }, []);
  const selectedLang = useMemo(
    () => languages.find((lang) => lang.locale === l)?.name,
    [languages, l],
  );
  const selectedAoi = useMemo(
    () => aois.find((item) => item.id === aoi)?.name,
    [aois, aoi],
  );
  const toggleEndpoints = useCallback(() => {
    setEndpointOpen((o) => !o);
  }, []);
  const setSelectedEndpointCont = useCallback(
    (item: keyof typeof endpoints) => {
      setSelectedEndpoint(item);
      if (item in endpoints) {
        const endpoint = endpoints[item];
        setEndpoint(endpoint);
      }
    },
    [setEndpoint],
  );
  return (
    <>
      <Navbar className="navbar-vertical hidden-xl">
        <NavLink to="/home">
          <FontAwesomeIcon icon={faHouse} />
          <span>{translate('home', l)}</span>
          <small className="text-end" />
        </NavLink>
        <NavLink to="/feed/news">
          <FontAwesomeIcon icon={faNewspaper} />
          <span>{translate('news', l)}</span>
          <small className="text-end" />
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

          <small className="text-end" />
        </NavLink>
      </Navbar>
      <Navbar className="navbar-vertical">
        <NavLink to="#" onClick={onToggleLang}>
          <FontAwesomeIcon icon={faLanguage} />
          <span>{translate('language', l)}</span>
          <small className="text-end">
            {selectedLang && showTranslated(selectedLang, l)}
          </small>
        </NavLink>
        {langOpen && (
          <>
            {languages.map((lang) => {
              if (lang.locale === l) return null;
              return (
                <NavLink
                  key={`lang-${lang.id}`}
                  to="#"
                  onClick={() => {
                    changeLang(lang);
                  }}>
                  <span className="text-end">
                    {showTranslated(lang.name, l)}
                  </span>
                </NavLink>
              );
            })}
          </>
        )}
        <NavLink onClick={onToggleAoi} to="#">
          <FontAwesomeIcon icon={faMap} />
          <span>{translate('chooseAoi', l)}</span>
          <small className="text-end">
            {selectedAoi && showTranslated(selectedAoi, l)}
          </small>
        </NavLink>
        {aoiOpen && (
          <>
            {aois.map((item) => {
              if (item.id === aoi) return null;
              return (
                <NavLink
                  key={`lang-${item.id}`}
                  to="#"
                  onClick={() => {
                    changeAoi(item);
                  }}>
                  <span className="text-end">
                    {showTranslated(item.name, l)}
                  </span>
                </NavLink>
              );
            })}
          </>
        )}
        <a href="mailto:info@clava-sports.com">
          <FontAwesomeIcon icon={faMailbox} />
          <span>{translate('contactUs', l)}</span>
          <small className="text-end" />
        </a>
        <a href="mailto:ad@clava-sports.com">
          <FontAwesomeIcon icon={faAd} />
          <span>{translate('adsOnClava', l)}</span>
          <small className="text-end" />
        </a>
        <a href="https://info.clava-sports.com" className="nav-link">
          <FontAwesomeIcon icon={faInfoCircle} />
          <span>{translate('aboutUs', l)}</span>
          <small className="text-end" />
        </a>
        {isAdmin(user) && (
          <>
            <NavLink onClick={toggleEndpoints} to="#">
              <FontAwesomeIcon icon={faServer} />
              <span>{translate('chooseEndpoint', l)}</span>
              <small className="text-end">{selectedEndpoint}</small>
            </NavLink>
            {endpointsOpen && (
              <>
                {Object.keys(endpoints).map((item: string) => {
                  if (item === selectedEndpoint) return null;
                  return (
                    <NavLink
                      key={`lang-${item}`}
                      to="#"
                      onClick={() => {
                        setSelectedEndpointCont(item as keyof typeof endpoints);
                      }}>
                      <span className="text-end">{item}</span>
                    </NavLink>
                  );
                })}
              </>
            )}
          </>
        )}

        <Link className="mt-5 nav-link" to="/tos">
          <small className="text-center">
            {`${translate('tos', l)} | ${translate('privacy', l)}`}
            <br />
            &copy; Copyright 2022, Clava Sports
            <br />
            v1.1.8
          </small>
        </Link>
      </Navbar>
    </>
  );
};
// relo ad

export default connector(Sidebar);
