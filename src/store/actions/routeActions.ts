import { Action, Dispatch } from 'redux';
import { RouteActionTypes } from './types';

export function openSettings(
  dispatch: Dispatch<Action<RouteActionTypes>>,
): Action {
  return dispatch({
    type: RouteActionTypes.OPEN_SETTINGS,
  });
}
export function closeSettings(
  dispatch: Dispatch<Action<RouteActionTypes>>,
): Action {
  return dispatch({
    type: RouteActionTypes.CLOSE_SETTINGS,
  });
}
export function openSearch(
  dispatch: Dispatch<Action<RouteActionTypes>>,
): Action {
  return dispatch({
    type: RouteActionTypes.OPEN_SEARCH,
  });
}
export function closeSearch(
  dispatch: Dispatch<Action<RouteActionTypes>>,
): Action {
  return dispatch({
    type: RouteActionTypes.CLOSE_SEARCH,
  });
}
export function openLogs(dispatch: Dispatch<Action<RouteActionTypes>>): Action {
  return dispatch({
    type: RouteActionTypes.OPEN_LOG,
  });
}
export function closeLogs(
  dispatch: Dispatch<Action<RouteActionTypes>>,
): Action {
  return dispatch({
    type: RouteActionTypes.CLOSE_LOG,
  });
}
