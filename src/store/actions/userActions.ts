import { Action, Dispatch } from 'redux';
import { EnhancedStore } from '@reduxjs/toolkit';
import { AreaOfInterest, Language, UserCreate } from '../../client/api';
import client from '../../client';
import { Favorite, IDType } from '../../config/types';
import { fb } from '../../config/firebase';
import { MatchActionTypes, UserActions, UserActionTypes } from './types';
import { defaultGet } from './all';
import { checkMail } from '../../config/utils';
import {
  AGB_LEVEL,
  AS_AOI,
  AS_CUSTOM_USERNAME,
  AS_FAVORITES,
  AS_LANG,
} from '../../config/constants';

export function register(
  dispatch: Dispatch<Action<UserActionTypes>>,
  user: UserCreate,
) {
  defaultGet(
    dispatch,
    UserActionTypes.FETCH_SUCCESS,
    UserActionTypes.FETCH_ERROR,
    UserActionTypes.REGISTER,
    client().register,
    false,
    false,
    user,
  );
}

export function refreshToken(
  dispatch: Dispatch<Action<UserActionTypes>>,
): Action {
  client()
    .refreshToken()
    .then(
      (response) => {
        dispatch({
          type: UserActionTypes.FETCH_SUCCESS,
          payload: response,
        });
      },
      () => {
        const res = window.localStorage.getItem('user_login_required');
        if (res) {
          dispatch({
            type: UserActionTypes.FETCH_ERROR,
            payload: 'login_required',
          });
        } else {
          dispatch({
            type: UserActionTypes.FETCH_ERROR,
            payload: 'not_registered',
          });
        }
      },
    );

  return dispatch({ type: UserActionTypes.REFRESH });
}

export function initBaseData(
  dispatch: Dispatch<Action<UserActionTypes>>,
  store: EnhancedStore,
): void {
  const aoi = window.localStorage.getItem(AS_AOI);
  const favorites = window.localStorage.getItem(AS_FAVORITES);
  const language = window.localStorage.getItem(AS_LANG);
  dispatch({ type: UserActionTypes.GET_BASE_DATA });
  if (aoi && language) {
    client()
      .getAoi(parseInt(aoi, 10), store)
      .then(
        (aoiObject) => {
          client()
            .getLanguage(parseInt(language, 10))
            .then(
              (languageObject) => {
                try {
                  dispatch({
                    type: UserActionTypes.BASE_DATA_SUCCESS,
                    payload: {
                      areaOfInterest: aoiObject,
                      favorites: JSON.parse(favorites || '[]'),
                      language: languageObject,
                    },
                  });
                } catch (e) {
                  dispatch({
                    type: UserActionTypes.BASE_DATA_MISSING,
                  });
                }
              },
              () => {
                dispatch({
                  type: UserActionTypes.BASE_DATA_MISSING,
                });
              },
            );
        },
        () => {
          dispatch({
            type: UserActionTypes.BASE_DATA_MISSING,
          });
        },
      );
  } else {
    dispatch({
      type: UserActionTypes.BASE_DATA_MISSING,
    });
  }
}

export function addFavorites(
  dispatch: Dispatch<Action<UserActionTypes>>,
  favorites: Favorite[],
): void {
  dispatch({ type: UserActionTypes.ADD_FAVORITE });
  const savedFavorites = window.localStorage.getItem(AS_FAVORITES);
  if (savedFavorites) {
    try {
      const newFavorites = JSON.parse(savedFavorites);
      favorites.forEach((fav) => {
        newFavorites.push(fav);
      });
      window.localStorage.setItem(AS_FAVORITES, JSON.stringify(newFavorites));
      dispatch({
        type: UserActionTypes.ADD_FAVORITE_SUCCESS,
        payload: newFavorites,
      });
      fb().manageNotifications(newFavorites).then();
    } catch (e) {
      window.localStorage.setItem(AS_FAVORITES, JSON.stringify(favorites));
      dispatch({
        type: UserActionTypes.ADD_FAVORITE_SUCCESS,
        payload: favorites,
      });
    }
  } else {
    window.localStorage.setItem(AS_FAVORITES, JSON.stringify(favorites));
    dispatch({
      type: UserActionTypes.ADD_FAVORITE_SUCCESS,
      payload: favorites,
    });
  }
}

export function removeFavorite(
  dispatch: Dispatch<Action<UserActionTypes>>,
  id: IDType,
): void {
  dispatch({ type: UserActionTypes.REMOVE_FAVORITE });
  const favorites = window.localStorage.getItem(AS_FAVORITES);
  if (favorites) {
    try {
      const newFavorites: Favorite[] = JSON.parse(favorites);
      let idx = -1;
      newFavorites.forEach((fav, index) => {
        if (fav.id === id) idx = index;
      });
      if (idx !== -1) newFavorites.splice(idx, 1);
      window.localStorage.setItem(AS_FAVORITES, JSON.stringify(newFavorites));
      dispatch({
        type: UserActionTypes.REMOVE_FAVORITE_SUCCESS,
        payload: newFavorites,
      });
      fb().manageNotifications(newFavorites).then();
    } catch (e) {
      window.localStorage.setItem(AS_FAVORITES, JSON.stringify([]));

      dispatch({
        type: UserActionTypes.REMOVE_FAVORITE_SUCCESS,
        payload: [],
      });
    }
  } else {
    dispatch({
      type: UserActionTypes.REMOVE_FAVORITE_SUCCESS,
      payload: [],
    });
  }
}
export function alterFavorite(
  dispatch: Dispatch<Action<UserActionTypes>>,
  favorite: Favorite,
): void {
  dispatch({ type: UserActionTypes.ALTER_FAVORITE });
  const savedFavorites = window.localStorage.getItem(AS_FAVORITES);
  if (savedFavorites) {
    try {
      const newFavorites: Favorite[] = JSON.parse(savedFavorites);
      let idx = -1;
      newFavorites.forEach((fav, index) => {
        if (fav.id === favorite.id) idx = index;
      });
      if (idx !== -1) newFavorites[idx] = favorite;
      window.localStorage.setItem(AS_FAVORITES, JSON.stringify(newFavorites));
      dispatch({
        type: UserActionTypes.ALTER_FAVORITE_SUCCESS,
        payload: newFavorites,
      });

      fb().manageNotifications(newFavorites).then();
    } catch (e) {
      window.localStorage.setItem(AS_FAVORITES, JSON.stringify([favorite]));
      dispatch({
        type: UserActionTypes.ALTER_FAVORITE_SUCCESS,
        payload: [favorite],
      });
    }
  } else {
    dispatch({
      type: UserActionTypes.ALTER_FAVORITE_SUCCESS,
      payload: [favorite],
    });
  }
}

export function setAoi(
  dispatch: Dispatch<Action<UserActionTypes>>,
  aoi: AreaOfInterest,
): void {
  dispatch({ type: UserActionTypes.SET_AOI });
  window.localStorage.setItem(AS_AOI, aoi.id.toString(10));
  dispatch({
    type: UserActionTypes.SET_AOI_SUCCESS,
    payload: aoi,
  });
}

export function setLanguage(
  dispatch: Dispatch<Action<UserActionTypes>>,
  language: Language,
): void {
  dispatch({ type: UserActionTypes.SET_LANGUAGE });
  window.localStorage.setItem(AS_LANG, language.id.toString(10));
  client().setLang(language.locale);

  dispatch({
    type: UserActionTypes.SET_LANGUAGE_SUCCESS,
    payload: language,
  });
}

export function changeLanguage(
  dispatch: Dispatch<Action<UserActionTypes>>,
  language: Language,
) {
  window.localStorage.setItem(AS_LANG, language.id.toString(10));

  client().setLang(language.locale);
  defaultGet(
    dispatch,
    UserActionTypes.PATCH_SUCCESS,
    UserActionTypes.PATCH_FAILED,
    UserActionTypes.PATCH_USER,
    client().changeLanguage,
    false,
    false,
    language.id,
  );
}
export function changeUsername(
  dispatch: Dispatch<Action<UserActionTypes>>,
  username: string,
) {
  window.localStorage.setItem(AS_CUSTOM_USERNAME, username);
  client()
    .usernameAvailable(username)
    .then(
      (response) => {
        if (response) {
          defaultGet(
            dispatch,
            UserActionTypes.PATCH_SUCCESS,
            UserActionTypes.PATCH_FAILED,
            UserActionTypes.PATCH_USER,
            client().changeUsername,
            false,
            false,
            username,
          );
        } else
          dispatch({
            type: UserActionTypes.USER_FORM_INVALID,
            payload: 'usernameGiven',
          });
      },
      () => {
        dispatch({
          type: UserActionTypes.USER_FORM_INVALID,
          payload: 'usernameGiven',
        });
      },
    );
}

export function changeAoi(
  dispatch: Dispatch<Action<UserActionTypes> | Action<MatchActionTypes>>,
  aoi: AreaOfInterest,
) {
  dispatch({ type: MatchActionTypes.RESTORE_MATCHDAYS });
  window.localStorage.setItem(AS_AOI, aoi.id.toString(10));
  defaultGet(
    dispatch,
    UserActionTypes.PATCH_SUCCESS,
    UserActionTypes.PATCH_FAILED,
    UserActionTypes.PATCH_USER,
    client().changeAoi,
    false,
    false,
    aoi.id,
  );
}

export function registerPatch(
  dispatch: Dispatch<UserActions>,
  givenName: string,
  familyName: string,
  email: string,
  password: string,
  passwordRepeat: string,
  tel: string,
  newsletter: boolean,
) {
  if (password !== passwordRepeat) {
    dispatch({
      type: UserActionTypes.REGISTER_FORM_INVALID,
      payload: 'pwNotSame',
    });
    return;
  }
  if (password.length < 8) {
    dispatch({
      type: UserActionTypes.REGISTER_FORM_INVALID,
      payload: 'pwNotValid',
    });
    return;
  }
  if (checkMail(email)) {
    client()
      .emailAvailable(email)
      .then(
        (response) => {
          if (response) {
            client()
              .telAvailable(tel)
              .then((responseTel) => {
                if (responseTel) {
                  defaultGet(
                    dispatch,
                    UserActionTypes.PATCH_SUCCESS,
                    UserActionTypes.PATCH_FAILED,
                    UserActionTypes.PATCH_USER,
                    client().registerPatch,
                    false,
                    false,
                    givenName,
                    familyName,
                    email,
                    password,
                    tel,
                    newsletter,
                    AGB_LEVEL,
                  );
                } else {
                  dispatch({
                    type: UserActionTypes.REGISTER_FORM_INVALID,
                    payload: 'telGiven',
                  });
                }
              });
          } else
            dispatch({
              type: UserActionTypes.REGISTER_FORM_INVALID,
              payload: 'mailGiven',
            });
        },
        () => {
          dispatch({
            type: UserActionTypes.REGISTER_FORM_INVALID,
            payload: 'mailGiven',
          });
        },
      );
  } else
    dispatch({
      type: UserActionTypes.REGISTER_FORM_INVALID,
      payload: 'mailInvalid',
    });
}

export function login(
  dispatch: Dispatch<UserActions>,
  email: string,
  password: string,
) {
  if (checkMail(email)) {
    defaultGet(
      dispatch,
      UserActionTypes.PATCH_SUCCESS,
      UserActionTypes.PATCH_FAILED,
      UserActionTypes.LOGIN,
      client().authorize,
      false,
      false,
      email,
      password,
    );
  } else
    dispatch({
      type: UserActionTypes.LOGIN_FORM_INVALID,
      payload: 'mailInvalid',
    });
}

export function confirmMail(dispatch: Dispatch<UserActions>, code: string) {
  defaultGet(
    dispatch,
    UserActionTypes.PATCH_SUCCESS,
    UserActionTypes.PATCH_FAILED,
    UserActionTypes.PATCH_USER,
    client().confirmMail,
    false,
    false,
    code,
  );
}

export function pwForgot(dispatch: Dispatch<UserActions>, email: string) {
  defaultGet(
    dispatch,
    UserActionTypes.PW_FORGOT,
    UserActionTypes.PW_FORGOT_FAILED,
    UserActionTypes.PATCH_USER,
    client().pwForgot,
    false,
    false,
    email,
  );
}
export function pwReset(
  dispatch: Dispatch<UserActions>,
  password: string,
  passwordRepeat: string,
  hash: string,
) {
  if (password !== passwordRepeat) {
    dispatch({
      type: UserActionTypes.REGISTER_FORM_INVALID,
      payload: 'pwNotSame',
    });
    return;
  }
  if (password.length < 8) {
    dispatch({
      type: UserActionTypes.REGISTER_FORM_INVALID,
      payload: 'pwNotValid',
    });
    return;
  }
  defaultGet(
    dispatch,
    UserActionTypes.PATCH_SUCCESS,
    UserActionTypes.PATCH_FAILED,
    UserActionTypes.PATCH_USER,
    client().pwReset,
    false,
    false,
    password,
    hash,
  );
}

export function applyInsider(
  dispatch: Dispatch<UserActions>,
  teamIds: IDType[],
  telNumber: string,
  message: string,
) {
  defaultGet(
    dispatch,
    UserActionTypes.PATCH_SUCCESS,
    UserActionTypes.PATCH_FAILED,
    UserActionTypes.PATCH_USER,
    client().postApplyInsider,
    false,
    false,
    telNumber,
    teamIds,
    message,
  );
}

export function confirmInsider(
  dispatch: Dispatch<UserActions>,
  userId: IDType,
  teamId: IDType,
) {
  defaultGet(
    dispatch,
    UserActionTypes.MANAGE_USER_SUCCESS,
    UserActionTypes.MANAGE_USER_FAILED,
    UserActionTypes.MANAGE_USER,
    client().postConfirmInsider,
    false,
    false,
    userId,
    teamId,
  );
}
export function declineInsider(
  dispatch: Dispatch<UserActions>,
  userId: IDType,
  teamId: IDType,
) {
  defaultGet(
    dispatch,
    UserActionTypes.DECLINE_SUCCESS,
    UserActionTypes.MANAGE_USER_FAILED,
    UserActionTypes.MANAGE_USER,
    client().postDeclineInsider,
    false,
    false,
    userId,
    teamId,
  );
}
export function removeInsider(
  dispatch: Dispatch<UserActions>,
  userId: IDType,
  teamId: IDType,
) {
  defaultGet(
    dispatch,
    UserActionTypes.DECLINE_SUCCESS,
    UserActionTypes.MANAGE_USER_FAILED,
    UserActionTypes.MANAGE_USER,
    client().postRemoveInsider,
    false,
    false,
    userId,
    teamId,
  );
}
export function upgradeInsider(
  dispatch: Dispatch<UserActions>,
  userId: IDType,
  teamId: IDType,
) {
  defaultGet(
    dispatch,
    UserActionTypes.MANAGE_USER_SUCCESS,
    UserActionTypes.MANAGE_USER_FAILED,
    UserActionTypes.MANAGE_USER,
    client().postUpgradeInsider,
    false,
    false,
    userId,
    teamId,
  );
}
export function downgradeInsider(
  dispatch: Dispatch<UserActions>,
  userId: IDType,
  teamId: IDType,
) {
  defaultGet(
    dispatch,
    UserActionTypes.MANAGE_USER_SUCCESS,
    UserActionTypes.MANAGE_USER_FAILED,
    UserActionTypes.MANAGE_USER,
    client().postDowngradeInsider,
    false,
    false,
    userId,
    teamId,
  );
}

export function getInsiderByTeam(
  dispatch: Dispatch<UserActions>,
  teamId: IDType,
) {
  defaultGet(
    dispatch,
    UserActionTypes.GET_INSIDERS_SUCCESS,
    UserActionTypes.FETCH_ERROR,
    UserActionTypes.GET_INSIDERS,
    client().getInsidersByTeam,
    false,
    false,
    teamId,
  );
}

export function logout(dispatch: Dispatch<UserActions>) {
  client()
    .logout()
    .then(() => {
      dispatch({ type: UserActionTypes.LOGOUT });
    });
}
export function deleteAccount(dispatch: Dispatch<UserActions>) {
  defaultGet(
    dispatch,
    UserActionTypes.DELETE_ME_SUCCESS,
    UserActionTypes.FETCH_ERROR,
    UserActionTypes.PATCH_USER,
    client().deleteAccount,
    false,
    false,
  );
}

// as f
