import React, { useCallback, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { LanguageLocaleEnum } from './client/api';
import { fb, initFb } from './config/firebase';
import client from './client';
import { AS_AOI, AS_THEME } from './config/constants';
import { ClavaRootContext } from './config/contexts';
import Loading from './views/components/Loading';

import './scss/style.scss';
import { ClavaRootContextType } from './config/types';
import Main from './views/navigation/Main';
import { store } from './store';

function isInitialized(c: ClavaRootContextType): boolean {
  return c.aoi !== -1 && (!c.fbToken || c.fbToken.length !== 0);
}

const App: React.FC = () => {
  const [rootContext, setRootContext] = useState<ClavaRootContextType>({
    l: LanguageLocaleEnum.DE,
    aoi: -1,
    theme: 'dark',
    fbToken: '',
  });
  useEffect(() => {
    const deviceLang = navigator.language;
    if (
      deviceLang === LanguageLocaleEnum.IT ||
      deviceLang === LanguageLocaleEnum.EN
    ) {
      setRootContext((c) => ({ ...c, l: deviceLang }));
      client().setLang(deviceLang);
    } else {
      client().setLang(LanguageLocaleEnum.DE);
    }

    const aoi = localStorage.getItem(AS_AOI);
    if (aoi && !Number.isNaN(parseInt(aoi, 10))) {
      setRootContext((c) => ({ ...c, aoi: parseInt(aoi, 10) }));
    } else setRootContext((c) => ({ ...c, aoi: -2 }));

    initFb().then(() => {
      const fbToken = fb().getFirebaseToken();
      setRootContext((c) => ({ ...c, fbToken }));
    });
    const theme = window.localStorage.getItem(AS_THEME);
    if (theme === 'dark' || theme === 'light')
      setRootContext((c) => ({ ...c, theme }));
  }, []);
  const onAoiChange = useCallback((aoi) => {
    localStorage.setItem(AS_AOI, aoi.toString());
    setRootContext((rc) => ({ ...rc, aoi }));
  }, []);
  if (!isInitialized(rootContext)) return <Loading />;
  return (
    <ClavaRootContext.Provider value={rootContext}>
      <Provider store={store}>
        <Main setAoi={onAoiChange} />
      </Provider>
    </ClavaRootContext.Provider>
  );
};

export default App;
