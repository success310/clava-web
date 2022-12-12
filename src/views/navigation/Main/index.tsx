import { ConnectedProps } from 'react-redux';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { DeviceUUID } from 'device-uuid';
import { Route, Routes } from 'react-router';
import { connector } from './redux';
import socket from '../../../client/Websockets/events';
import { browserLang, getDeviceInfo } from '../../../config/utils';
import FirstOpen from '../../screens/FirstOpen';
import client from '../../../client';
import Loading from '../../components/Loading';
import { ClavaContext, ClavaRootContext } from '../../../config/contexts';
import { fb } from '../../../config/firebase';
import { AS_ENDPOINT, PROD_ENDPOINT } from '../../../config/constants';
import { GroupEnum, User } from '../../../client/api';
import Header from '../../components/Header';
import Home from '../Home';

const Main: React.FC<ConnectedProps<typeof connector>> = ({
  user,
  refreshToken,
  createUser,
  languageObject,
  aoi,
  error,
  getInsidersByTeam,
  initBaseDataUser,
  status,
  getLeagues,
}) => {
  const [firstOpen, setFirstOpen] = useState(false);
  const { fbToken } = useContext(ClavaRootContext);
  useEffect(() => {
    const endpoint = window.localStorage.getItem(AS_ENDPOINT);
    socket(endpoint ?? PROD_ENDPOINT).open();
    initBaseDataUser();
    client(endpoint ?? PROD_ENDPOINT).setLang(browserLang());
    return () => {
      socket().close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (status === 'failed') {
      if (error === 'not_registered') {
        if (aoi && languageObject && !user)
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
  useEffect(() => {
    if (user) {
      getLeagues(user.areaOfInterest.id);
      fb().subscribeUserSpecific(user);
      socket().setUser(user.id, user.areaOfInterest.id);
      client().setLang(user.language.locale);
      const teamInsider = user.groups.filter(
        (u) => u.key === GroupEnum.TEAM_INSIDER,
      );
      if (teamInsider.length !== null) {
        teamInsider.forEach((group) => {
          getInsidersByTeam(group.team.id);
        });
      }
    }
  }, [getInsidersByTeam, getLeagues, user]);
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
      <FirstOpen language={clavaContext.l} finalCallback={onFirstOpenFinish} />
    );
  }
  if (!user) return <Loading />;
  return (
    <ClavaContext.Provider value={clavaContext}>
      <Header />
      <div className="content">
        <Routes>
          <Route path="*" element={<Home />} />
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/league/:leagueId" element={<Home />} />
          <Route path="/league/:leagueId/match/:matchId" element={<Home />} />
          <Route path="/match/:matchId" element={<Home />} />
        </Routes>
      </div>
    </ClavaContext.Provider>
  );
};
// reload
export default connector(Main);
