import { Reducer } from 'redux';

import { AoiState } from '../constants';
import { AoiActions, AoiActionTypes } from '../actions/types';

const initialState: AoiState = {
  value: [],
  error: null,
  status: 'idle',
};

const reducer: Reducer<AoiState> = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: AoiActions,
) => {
  switch (action.type) {
    case AoiActionTypes.FETCH_AOI: {
      return { ...state, status: 'loading' };
    }
    case AoiActionTypes.FETCH_SUCCESS: {
      return { ...state, status: 'idle', value: action.payload };
    }
    case AoiActionTypes.FETCH_ERROR: {
      return { ...state, status: 'failed', error: action.payload };
    }
    default: {
      return state;
    }
  }
};
export { reducer as aoiReducer };
