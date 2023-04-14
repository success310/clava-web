import { ConnectedProps } from 'react-redux';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DeviceUUID } from 'device-uuid';
import { Route, Routes } from 'react-router';
import { Button } from 'reactstrap';
import { faPalette } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connector } from './redux';
import EventsSocket from '../../../client/Websockets/events';
import { browserLang, getDeviceInfo, isAdmin } from '../../../config/utils';
import FirstOpen from '../../screens/FirstOpen';
import client from '../../../client';
import Loading from '../../components/Loading';
import { ClavaContext, ClavaRootContext } from '../../../config/contexts';
import { fb } from '../../../config/firebase';
import { AS_ENDPOINT, PROD_ENDPOINT } from '../../../config/constants';
import { GroupEnum, User } from '../../../client/api';
import Header from '../../components/Header';
import Home from '../../screens/Home';
import Login from '../../screens/Profile/Login';
import Profile from '../../screens/Profile';
import Register from '../../screens/Profile/Register';
import ConfirmMail from '../../screens/Profile/ConfirmMail';
import Adminpanel from '../../screens/Adminpanel';
import { translate, TranslatorKeys } from '../../../config/translator';
import { loggerSettings } from '../../../store/middleware/logger';

const Main: React.FC<ConnectedProps<typeof connector>> = ({
  user,
  refreshToken,
  createUser,
  languageObject,
  aoi,
  error,
  getInsidersByTeam,
  initBaseDataUser,
  setTheme,
  resetStoredData,
  status,
  getLeagues,
}) => {
  const [firstOpen, setFirstOpen] = useState(false);
  const { fbToken, theme } = useContext(ClavaRootContext);
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [setTheme, theme]);
  useEffect(() => {
    const endpoint = window.localStorage.getItem(AS_ENDPOINT);
    EventsSocket.setEndpoint(endpoint ?? PROD_ENDPOINT);
    client(endpoint ?? PROD_ENDPOINT).setLang(browserLang());
    initBaseDataUser();
    return () => {
      EventsSocket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (status === 'failed') {
      if (error === 'not_registered') {
        if (aoi && languageObject && !user && fbToken !== '')
          createUser({
            deviceId: new DeviceUUID().get(),
            deviceInfo: JSON.stringify(getDeviceInfo()),
            areaOfInterestId: aoi.id,
            languageId: languageObject.id,
            firebaseToken: fbToken ?? undefined,
          });
        else {
          setFirstOpen(true);
        }
      } else if (error === 'no_user_found') {
        refreshToken();
      } else if (error === 'first_open') {
        setFirstOpen(true);
      }
    } else if (status !== 'loading' && aoi && languageObject && !user) {
      refreshToken();
    }
  }, [
    status,
    error,
    aoi,
    languageObject,
    user,
    fbToken,
    createUser,
    refreshToken,
  ]);
  const aoiRef = useRef(user?.areaOfInterest.id ?? -1);
  useEffect(() => {
    if (user) {
      getLeagues(user.areaOfInterest.id);
      fb().subscribeUserSpecific(user);
      if (aoiRef.current === -1) aoiRef.current = user.areaOfInterest.id;
      if (aoiRef.current !== user.areaOfInterest.id) {
        resetStoredData();
      }
      EventsSocket.setUser(user.id, user.areaOfInterest.id);
      client().setLang(user.language.locale);
      const teamInsider = user.groups.filter(
        (u) => u.key === GroupEnum.TEAM_INSIDER,
      );
      if (teamInsider.length !== null) {
        teamInsider.forEach((group) => {
          getInsidersByTeam(group.team.id);
        });
      }

      loggerSettings.enabled = isAdmin(user);
    }
  }, [getInsidersByTeam, getLeagues, resetStoredData, user]);
  const clavaContext = useMemo(
    () =>
      user
        ? { l: user.language.locale, aoi: user.areaOfInterest.id, user }
        : {
            l: browserLang(),
            aoi: -1,
            user: {} as User,
          },
    [user],
  );
  const onFirstOpenFinish = useCallback(() => {
    setFirstOpen(false);
  }, []);

  if (firstOpen) {
    return (
      <div className={`root ${theme}`}>
        <FirstOpen
          language={clavaContext.l}
          finalCallback={onFirstOpenFinish}
        />
        <Button className="theme-switcher" role="button" onClick={toggleTheme}>
          <FontAwesomeIcon icon={faPalette} />
          <span>
            {translate(`theme${theme}` as TranslatorKeys, clavaContext.l)}
          </span>
          <div className="spacer" />
        </Button>
      </div>
    );
  }
  if (!user) return <Loading />;
  return (
    <ClavaContext.Provider value={clavaContext}>
      <div className={`root ${theme}`}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="*" element={<Home />} />
            <Route index element={<Home />} />
            <Route path="/home/:date" element={<Home />} />
            <Route path="/home/match/:matchId" element={<Home />} />
            <Route path="/home/match/:matchId/:view" element={<Home />} />
            <Route path="/home/:date/match/:matchId" element={<Home />} />
            <Route path="/home/:date/match/:matchId/:view" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/league/:leagueId" element={<Home />} />
            <Route path="/league/:leagueId/:date" element={<Home />} />
            <Route path="/league/:leagueId/match/:matchId" element={<Home />} />
            <Route
              path="/league/:leagueId/match/:matchId/:view"
              element={<Home />}
            />
            <Route
              path="/league/:leagueId/:date/match/:matchId"
              element={<Home />}
            />
            <Route
              path="/league/:leagueId/:date/match/:matchId/:view"
              element={<Home />}
            />
            <Route path="/feed/:feedType" element={<Home />} />
            <Route path="/feed/:feedType/:feedId" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/:redirectAfter" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/:redirectAfter" element={<Register />} />
            <Route path="/confirm" element={<ConfirmMail />} />
            <Route path="/confirm/:redirectAfter" element={<ConfirmMail />} />
            <Route
              path="/confirm/:redirectAfter/:pwForgot"
              element={<ConfirmMail />}
            />
            <Route path="/backoffice" element={<Adminpanel />} />
            <Route path="/backoffice/:adminSite" element={<Adminpanel />} />
            <Route
              path="/backoffice/:adminSite/:adminMethod"
              element={<Adminpanel />}
            />
            <Route
              path="/backoffice/:adminSite/:adminMethod/:adminElemId"
              element={<Adminpanel />}
            />
          </Routes>
          <Button
            className="theme-switcher"
            role="button"
            onClick={toggleTheme}>
            <FontAwesomeIcon icon={faPalette} />
            <span>
              {translate(`theme${theme}` as TranslatorKeys, clavaContext.l)}
            </span>
            <div className="spacer" />
          </Button>
        </div>
      </div>
    </ClavaContext.Provider>
  );
};
// reload
export default connector(Main);
