import { Action, Dispatch } from 'redux';
import { defaultGet } from './all';
import client from '../../client';
import { SearchActionTypes } from './types';
import { SEARCH_STORAGE_KEY } from '../constants';

export function search(
  dispatch: Dispatch<Action<SearchActionTypes>>,
  query: string,
  length = 5,
  offset = 0,
) {
  if (query === '') {
    dispatch({ type: SearchActionTypes.RESET_SEARCH });
    return;
  }
  defaultGet(
    dispatch,
    SearchActionTypes.SEARCH_SUCCESS,
    SearchActionTypes.SEARCH_ERROR,
    SearchActionTypes.SEARCH,
    client().search,
    false,
    false,
    query,
    length,
    offset,
  );
}

export function searchExt(
  dispatch: Dispatch<Action<SearchActionTypes>>,
  query: string,
  length: number,
  offset: number,
  type: 'team' | 'league' | 'player',
) {
  if (query === '') {
    dispatch({ type: SearchActionTypes.RESET_SEARCH });
    return;
  }
  defaultGet(
    dispatch,
    SearchActionTypes.SEARCH_SUCCESS_EXT,
    SearchActionTypes.SEARCH_ERROR,
    SearchActionTypes.SEARCH,
    client().searchExt,
    false,
    false,
    query,
    length,
    offset,
    type,
  );
}
export function getPrevQueries(
  dispatch: Dispatch<Action<SearchActionTypes>>,
): void {
  dispatch({
    type: SearchActionTypes.GET_PREV_QUERIES,
  });
  const result = window.localStorage.getItem(SEARCH_STORAGE_KEY);
  dispatch({
    type: SearchActionTypes.FOUND_PREV_SEARCHES,
    payload: result ? JSON.parse(result) || [] : [],
  });
}
