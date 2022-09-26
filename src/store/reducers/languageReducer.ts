import { Reducer } from 'redux';

import { LanguageState } from '../constants';
import { LanguageActions, LanguageActionTypes } from '../actions/types';

const initialState: LanguageState = {
  value: [],
  error: null,
  status: 'idle',
};

const reducer: Reducer<LanguageState> = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: LanguageActions,
) => {
  switch (action.type) {
    case LanguageActionTypes.FETCH_LANGUAGES: {
      return { ...state, status: 'loading' };
    }
    case LanguageActionTypes.FETCH_SUCCESS: {
      return { ...state, status: 'idle', value: action.payload };
    }
    case LanguageActionTypes.FETCH_ERROR: {
      return { ...state, status: 'failed', error: action.payload };
    }
    default: {
      return state;
    }
  }
};
export { reducer as languageReducer };
