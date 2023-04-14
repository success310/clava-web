import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { performAction } from '../../../store/actions/all';
import {
  changeAoi,
  changeLanguage,
  login,
  refreshToken,
} from '../../../store/actions/userActions';
import { RootState } from '../../../store';
import { AreaOfInterest, Language } from '../../../client/api';
import { fetchAois } from '../../../store/actions/aoiActions';
import { fetchLanguages } from '../../../store/actions/languageActions';
import client from '../../../client';
import EventsSocket from '../../../client/Websockets/events';
import { AS_ENDPOINT } from '../../../config/constants';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  login: (email: string, password: string) => {
    performAction({ f: login, p: [dispatch, email, password] });
  },
  changeLang: (lang: Language) => {
    performAction({ f: changeLanguage, p: [dispatch, lang] });
  },
  changeAoi: (aoi: AreaOfInterest) => {
    performAction({ f: changeAoi, p: [dispatch, aoi] });
  },
  getLanguages: () => {
    performAction({ f: fetchLanguages, p: [dispatch] });
  },
  getAois: () => {
    performAction({ f: fetchAois, p: [dispatch] });
  },
  setEndpoint: (endpoint: string) => {
    client().setEndpoint(endpoint);
    EventsSocket.setEndpoint(endpoint);
    localStorage.setItem(AS_ENDPOINT, endpoint);
    refreshToken(dispatch);
  },
});

const props = (state: RootState) => ({
  user: state.user.value,
  languages: state.languages.value,
  aois: state.aois.value,
});

export const connector = connect(props, mapper);
// relo ad
