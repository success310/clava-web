import { Action, Dispatch } from 'redux';
import client from '../../client';
import { defaultGet } from './all';
import { AdActionTypes } from './types';
import { AdPositionEnum } from '../../client/api';
import { numberedHash } from '../../config/utils';

export function fetchByPos(
  dispatch: Dispatch<Action<AdActionTypes>>,
  pos: AdPositionEnum,
) {
  defaultGet(
    dispatch,
    AdActionTypes.FETCH_SUCCESS,
    AdActionTypes.FETCH_ERROR,
    AdActionTypes.FETCH_BY_POS,
    client().getAds,
    false,
    { id: numberedHash(pos) },
    pos,
  );
}
