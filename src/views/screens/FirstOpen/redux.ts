import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import {
  addFavorites,
  setAoi,
  setLanguage,
} from '../../../store/actions/userActions';
import { IDType } from '../../../config/types';
import { AreaOfInterest, Language } from '../../../client/api';
import { RootState } from '../../../store';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  setFavorites: (ids: IDType[]) => {
    addFavorites(
      dispatch,
      ids.map((id) => ({ type: 'team', id, belled: false })),
    );
  },
  setAreaOfInterest: (aoi: AreaOfInterest) => {
    setAoi(dispatch, aoi);
  },
  setLanguageObject: (language: Language) => {
    setLanguage(dispatch, language);
  },
});

const props = (state: RootState) => ({
  user: state.user.value,
  users: state.user.values,
  error: state.user.error,
  status: state.user.status,
  aoi: state.user.areaOfInterest,
  favorites: state.user.favorites,
  languageObject: state.user.language,
});

export const connector = connect(props, mapper);
