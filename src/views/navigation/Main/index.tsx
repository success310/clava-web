import { ConnectedProps } from 'react-redux';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DeviceUUID } from 'device-uuid';
import { connector } from './redux';
import socket from '../../../client/Websockets/events';
import { browserLang, getDeviceInfo } from '../../../config/utils';
import FirstOpen from '../../screens/FirstOpen';
import client from '../../../client';
import Loading from '../../components/Loading';
import { ClavaContext, ClavaRootContext } from '../../../config/contexts';
import Header from '../../components/Header';
import Home from '../Home';

const Main: React.FC<ConnectedProps<typeof connector>> = ({
  user,
  refreshToken,
  createUser,
  languageObject,
  aoi,
  error,
  initBaseDataUser,
  status,
}) => {
  const [firstOpen, setFirstOpen] = useState(false);
  const { fbToken } = useContext(ClavaRootContext);
  useEffect(() => {
    socket().open();
    initBaseDataUser();
    client().setLang(browserLang());
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, error, aoi, languageObject, user, fbToken]);

  const clavaContext = useMemo(
    () =>
      user
        ? { l: user.language.locale, aoi: user.areaOfInterest.id }
        : {
            l: browserLang(),
            aoi: -1,
          },
    [user],
  );
  const onFirstOpenFinish = useCallback(() => {
    setFirstOpen(false);
  }, []);
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: '/',
          element: <Home />,
        },
      ]),
    [],
  );
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
        <RouterProvider router={router} />
      </div>
    </ClavaContext.Provider>
  );
};
// reload
export default connector(Main);
