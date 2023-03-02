import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { performAction } from '../../../store/actions/all';
import {
  getInsiderByTeam,
  initBaseData,
  login,
  refreshToken,
  register,
} from '../../../store/actions/userActions';
import { RootState, store } from '../../../store';
import { IDType } from '../../../config/types';
import { UserCreate } from '../../../client/api';
import { fetchLeagues } from '../../../store/actions/leagueActions';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  login: (email: string, password: string) => {
    performAction({ f: login, p: [dispatch, email, password] });
  },
  refreshToken: () => {
    performAction({ f: refreshToken, p: [dispatch] });
  },
  createUser: (userCreate: UserCreate) => {
    performAction({ f: register, p: [dispatch, userCreate] });
  },
  getLeagues: (aoi: IDType) => {
    fetchLeagues(dispatch, aoi);
  },
  initBaseDataUser: () => {
    initBaseData(dispatch, store);
  },

  getInsidersByTeam: (teamId: IDType) => {
    performAction({ f: getInsiderByTeam, p: [dispatch, teamId] });
  },
});

const props = (
  state: RootState,
  prevProps: { setTheme: (t: 'dark' | 'light') => void },
) => ({
  user: state.user.value,
  error: state.user.error,
  status: state.user.status,
  languageObject: state.user.language,
  aoi: state.user.areaOfInterest,
  ...prevProps,
});

export const connector = connect(props, mapper);
// reload
