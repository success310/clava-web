import { Dispatch } from 'redux';
import client from '../../client';
import { defaultGet } from './all';
import { LanguageActions, LanguageActionTypes } from './types';

export function fetchLanguages(dispatch: Dispatch<LanguageActions>) {
  defaultGet(
    dispatch,
    LanguageActionTypes.FETCH_SUCCESS,
    LanguageActionTypes.FETCH_ERROR,
    LanguageActionTypes.FETCH_LANGUAGES,
    client().getLanguages,
    false,
    false,
  );
}
