import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { performAction } from '../../../store/actions/all';
import {
  changeAoi,
  changeLanguage,
  login,
} from '../../../store/actions/userActions';
import { RootState } from '../../../store';
import { AreaOfInterest, Language } from '../../../client/api';
import { fetchAois } from '../../../store/actions/aoiActions';
import { fetchLanguages } from '../../../store/actions/languageActions';
import {
  LeagueActionTypes,
  MatchActionTypes,
  StandingActionTypes,
  TeamActionTypes,
} from '../../../store/actions/types';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  login: (email: string, password: string) => {
    performAction({ f: login, p: [dispatch, email, password] });
  },
  changeLang: (lang: Language) => {
    performAction({ f: changeLanguage, p: [dispatch, lang] });
  },
  changeAoi: (aoi: AreaOfInterest) => {
    performAction({ f: changeAoi, p: [dispatch, aoi] });
    dispatch({ type: MatchActionTypes.RESET });
    dispatch({ type: StandingActionTypes.RESET });
    dispatch({ type: LeagueActionTypes.RESET });
    dispatch({ type: TeamActionTypes.RESET });
  },
  getLanguages: () => {
    performAction({ f: fetchLanguages, p: [dispatch] });
  },
  getAois: () => {
    performAction({ f: fetchAois, p: [dispatch] });
  },
});

const props = (state: RootState) => ({
  user: state.user.value,
  languages: state.languages.value,
  aois: state.aois.value,
});

export const connector = connect(props, mapper);
// reload
