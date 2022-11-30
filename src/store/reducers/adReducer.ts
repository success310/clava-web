import { Reducer } from 'redux';
import { AdState } from '../constants';
import { AdActions, AdActionTypes } from '../actions/types';
import { replaceOrAddResponseSingle } from '../../config/utils';

const initialState: AdState = {
  value: [],
  error: null,
  status: 'idle',
};

const reducer: Reducer<AdState> = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: AdActions,
) => {
  switch (action.type) {
    case AdActionTypes.FETCH_BY_POS: {
      return { ...state, status: 'loading' };
    }
    case AdActionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        status: 'failed',
        value: replaceOrAddResponseSingle(action.payload, state.value),
      };
    }
    case AdActionTypes.FETCH_ERROR: {
      return { ...state, status: 'idle', error: action.payload };
    }
    case AdActionTypes.RESET:
      return {
        status: 'idle',
        error: null,
        value: [],
      };
    default: {
      return state;
    }
  }
};

export { reducer as adReducer };
// rel
