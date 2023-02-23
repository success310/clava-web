import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { fb, initFb } from './config/firebase';
import { AS_THEME } from './config/constants';
import { ClavaRootContext } from './config/contexts';

import './scss/style.scss';
import { ClavaRootContextType } from './config/types';
import Main from './views/navigation/Main';
import { store } from './store';
import Loading from './views/components/Loading';

import 'intl/locale-data/jsonp/de-DE';
import 'intl/locale-data/jsonp/en-US';
import 'intl/locale-data/jsonp/it-IT';

const App: React.FC = () => {
  const theme = window.localStorage.getItem(AS_THEME);
  const [rootContext, setRootContext] = useState<ClavaRootContextType>({
    theme: theme === 'dark' || theme === 'light' ? theme : 'dark',
    fbToken: '',
    initialized: true,
  });
  useEffect(() => {
    initFb().then(() => {
      const fbToken = fb().getFirebaseToken();
      setRootContext({
        theme: theme === 'dark' || theme === 'light' ? theme : 'dark',
        fbToken,
        initialized: true,
      });
    });
  }, [theme]);
  if (rootContext.initialized) {
    return (
      <ClavaRootContext.Provider value={rootContext}>
        <Provider store={store}>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </Provider>
      </ClavaRootContext.Provider>
    );
  }
  return <Loading />;
};
// reloa d
export default App;
