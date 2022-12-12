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
  faInfoCircle,
  faLanguage,
  faMailbox,
  faMap,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ConnectedProps } from 'react-redux';
import { ClavaContext } from '../../../config/contexts';
import { showTranslated, translate } from '../../../config/translator';
import { connector } from './redux';

const Sidebar: React.FC<ConnectedProps<typeof connector>> = ({
  user,
  languages,
  changeLang,
  aois,
  getLanguages,
  getAois,
  changeAoi,
}) => {
  const { l, aoi } = useContext(ClavaContext);
  const [langOpen, setLangOpen] = useState(false);
  const [aoiOpen, setAoiOpen] = useState(false);
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
  return (
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
                <span className="text-end">{showTranslated(lang.name, l)}</span>
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
                <span className="text-end">{showTranslated(item.name, l)}</span>
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
      <Link to="/imprint" className="nav-link">
        <FontAwesomeIcon icon={faInfoCircle} />
        <span>{translate('aboutUs', l)}</span>
        <small className="text-end" />
      </Link>
      <Link className="mt-5 nav-link" to="/tos">
        <small className="text-center">
          {`${translate('tos', l)} | ${translate('privacy', l)}`}
          <br />
          &copy; Copyright 2022, Clava Sports
        </small>
      </Link>
    </Navbar>
  );
};
// relo ad

export default connector(Sidebar);
