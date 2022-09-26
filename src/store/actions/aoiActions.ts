import { Dispatch } from 'redux';
import client from '../../client';
import { defaultGet } from './all';
import { AoiActions, AoiActionTypes } from './types';

export function fetchAois(dispatch: Dispatch<AoiActions>) {
  defaultGet(
    dispatch,
    AoiActionTypes.FETCH_SUCCESS,
    AoiActionTypes.FETCH_ERROR,
    AoiActionTypes.FETCH_AOI,
    client().getAois,
    false,
    false,
  );
}
