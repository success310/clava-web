import React, { useCallback, useEffect, useState } from 'react';
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

const t = window.localStorage.getItem(AS_THEME);
const rootClasses = document.body.className;
document.body.className = `${rootClasses} ${t}`;

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(
    t === 'dark' || t === 'light' ? t : 'dark',
  );
  const setThemeCont = useCallback((newTheme: 'dark' | 'light') => {
    window.localStorage.setItem(AS_THEME, newTheme);
    document.body.className = `${rootClasses} ${newTheme}`;
    setTheme(newTheme);
  }, []);
  const [rootContext, setRootContext] = useState<ClavaRootContextType>({
    theme,
    fbToken: '',
    initialized: true,
  });
  useEffect(() => {
    initFb().then(() => {
      const fbToken = fb().getFirebaseToken();
      setRootContext({
        theme,
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
            <Main setTheme={setThemeCont} />
          </BrowserRouter>
        </Provider>
      </ClavaRootContext.Provider>
    );
  }
  return <Loading />;
};
// reloa d
export default App;
