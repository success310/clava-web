import { Reducer } from 'redux';
import { UserState } from '../constants';

import { fb } from '../../config/firebase';
import { UserActions, UserActionTypes } from '../actions/types';
import { IDType } from '../../config/types';

const initialState: UserState = {
  value: null,
  values: [],
  areaOfInterest: null,
  language: null,
  favorites: [],
  error: null,
  status: 'idle',
  registerStatus: 'ok',
  insiderStatus: 'ok',
  loginStatus: 'ok',
  userStatus: 'ok',
  version: '',
  versionOk: true,
};

const reducer: Reducer<UserState> = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: UserActions,
) => {
  switch (action.type) {
    case UserActionTypes.RESET_FORM:
      return {
        ...state,
        registerStatus: 'ok',
        loginStatus: 'ok',
        insiderStatus: 'ok',
        userStatus: 'ok',
      };
    case UserActionTypes.REFRESH:
    case UserActionTypes.GET_BASE_DATA:
    case UserActionTypes.ADD_FAVORITE:
    case UserActionTypes.GET_VERSION:
    case UserActionTypes.CHECK_VERSION:
    case UserActionTypes.REMOVE_FAVORITE:
    case UserActionTypes.ALTER_FAVORITE:
    case UserActionTypes.FETCH_ME:
    case UserActionTypes.SET_AOI:
    case UserActionTypes.PATCH_USER:
    case UserActionTypes.LOGIN:
    case UserActionTypes.MANAGE_USER:
    case UserActionTypes.SET_LANGUAGE:
    case UserActionTypes.REGISTER: {
      return { ...state, status: 'loading' };
    }
    case UserActionTypes.LOGOUT: {
      return {
        ...state,
        status: 'failed',
        registerStatus: 'ok',
        loginStatus: 'ok',
        userStatus: 'ok',
        insiderStatus: 'ok',
        values: [],
        value: null,
        error: 'not_registered',
      };
    }
    case UserActionTypes.DELETE_ME_SUCCESS: {
      return {
        ...state,
        status: 'failed',
        formStatus: 'ok',
        insiderStatus: 'ok',
        loginStatus: 'ok',
        userStatus: 'ok',
        values: [],
        value: null,
        error: 'not_registered',
      };
    }
    case UserActionTypes.GET_VERSION_SUCCESS: {
      return { ...state, status: 'idle', version: action.payload };
    }
    case UserActionTypes.CHECK_VERSION_SUCCESS: {
      return { ...state, status: 'idle', versionOk: !action.payload };
    }
    case UserActionTypes.REGISTER_FORM_INVALID: {
      return {
        ...state,
        status: 'idle',
        error: null,
        registerStatus: action.payload,
      };
    }
    case UserActionTypes.USER_FORM_INVALID: {
      return {
        ...state,
        status: 'idle',
        error: null,
        userStatus: action.payload,
      };
    }
    case UserActionTypes.LOGIN_FORM_INVALID: {
      return {
        ...state,
        status: 'idle',
        error: null,
        loginStatus: action.payload,
      };
    }
    case UserActionTypes.INSIDER_FORM_INVALID: {
      return {
        ...state,
        status: 'idle',
        error: null,
        insiderStatus: action.payload,
      };
    }
    case UserActionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        status: 'idle',
        formStatus: 'ok',
        insiderStatus: 'ok',
        loginStatus: 'ok',
        userStatus: 'ok',
        value: action.payload,
        areaOfInterest: action.payload.areaOfInterest,
        language: action.payload.language,
        error: null,
      };
    }
    case UserActionTypes.MANAGE_USER_FAILED:
    case UserActionTypes.FETCH_ERROR: {
      return { ...state, status: 'failed', error: action.payload };
    }
    case UserActionTypes.MANAGE_USER_SUCCESS: {
      let found = false;
      return {
        ...state,
        status: 'idle',
        values: state.values
          .map((g) => {
            if (g.id === action.payload.id) {
              found = true;
              return action.payload;
            }
            return g;
          })
          .concat(found ? [] : [action.payload]),
      };
    }
    case UserActionTypes.DECLINE_SUCCESS: {
      return {
        ...state,
        status: 'idle',
        values: state.values.filter((g) => g.id !== action.payload),
      };
    }
    case UserActionTypes.GET_INSIDERS_SUCCESS: {
      const found: IDType[] = [];
      return {
        ...state,
        status: 'idle',
        error: null,
        values: state.values
          .map((u) => {
            const elem = action.payload.find((g) => g.id === u.id);
            if (elem) {
              found.push(elem.id);
              return elem;
            }
            return u;
          })
          .concat(action.payload.filter((g) => found.indexOf(g.id) === -1)),
      };
    }
    case UserActionTypes.BASE_DATA_SUCCESS: {
      return {
        ...state,
        status: 'idle',
        error: null,
        ...action.payload,
      };
    }
    case UserActionTypes.UNAUTHORIZED: {
      return { ...state, status: 'failed', error: 'no_user_found' };
    }
    case UserActionTypes.REMOVE_FAVORITE_SUCCESS:
    case UserActionTypes.ALTER_FAVORITE_SUCCESS:
    case UserActionTypes.ADD_FAVORITE_SUCCESS: {
      fb().manageNotifications(action.payload).then();
      return {
        ...state,
        status: 'idle',
        favorites: action.payload,
        error: null,
      };
    }
    case UserActionTypes.SET_AOI_SUCCESS: {
      return {
        ...state,
        status: 'idle',
        areaOfInterest: action.payload,
        error: null,
      };
    }
    case UserActionTypes.SET_LANGUAGE_SUCCESS: {
      return {
        ...state,
        status: 'idle',
        language: action.payload,
        error: null,
      };
    }
    case UserActionTypes.BASE_DATA_MISSING: {
      return {
        ...state,
        status: 'failed',
        error: 'first_open',
      };
    }
    case UserActionTypes.PATCH_SUCCESS: {
      return {
        ...state,
        status: 'idle',
        value: action.payload,
        formStatus: 'ok',
        insiderStatus: 'ok',
        loginStatus: 'ok',
        userStatus: 'ok',
        error: null,
      };
    }
    case UserActionTypes.PATCH_FAILED: {
      return {
        ...state,
        status: 'failed',
        error: action.payload,
        userStatus: 'failed',
        registerStatus: 'failed',
        loginStatus: 'failed',
        insiderStatus: 'failed',
      };
    }
    case UserActionTypes.PW_FORGOT: {
      return {
        ...state,
        status: 'idle',
        error: null,
        formStatus: 'ok',
        insiderStatus: 'ok',
        loginStatus: 'ok',
        userStatus: 'ok',
        registerStatus: 'ok',
      };
    }
    case UserActionTypes.PW_FORGOT_FAILED: {
      return {
        ...state,
        status: 'idle',
        error: null,
        formStatus: 'ok',
        insiderStatus: 'ok',
        loginStatus: 'ok',
        userStatus: 'ok',
        registerStatus: 'ok',
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as userReducer };
