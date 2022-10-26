import { Action, Dispatch } from 'redux';
import client from '../../client';
import { IDType } from '../../config/types';
import { defaultGet } from './all';
import { StandingActionTypes } from './types';

export function fetchByLeague(
  dispatch: Dispatch<Action<StandingActionTypes>>,
  leagueID: IDType,
) {
  defaultGet(
    dispatch,
    StandingActionTypes.FETCH_SUCCESS,
    StandingActionTypes.FETCH_ERROR,
    StandingActionTypes.FETCH_BY_LEAGUE,
    client().getTable,
    false,
    { id: leagueID },
    leagueID,
  );
}
