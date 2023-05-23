import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import {
  bulkDeleteMatches,
  bulkPatchMatches,
  createMatchMultiple,
  csvImportMatch,
  csvImportResult,
  deleteMatch,
  getMatch,
  searchMatchFiltered,
} from '../../../../store/actions/adminActions';
import { IDType } from '../../../../config/types';
import { performAction } from '../../../../store/actions/all';
import { MatchFilterType } from './types';
import { MatchCreate, MatchImport, MatchPatch } from '../../../../client/api';
import { AdminActionTypes } from '../../../../store/actions/types';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getMatch: (id: IDType) => {
    performAction({ f: getMatch, p: [dispatch, id] });
  },
  deleteMatch: (id: IDType) => {
    performAction({ f: deleteMatch, p: [dispatch, id] });
  },
  resetMatches: () => {
    dispatch({ type: AdminActionTypes.RESET_MATCHES });
  },
  searchMatchFiltered: (
    q: string,
    filters: MatchFilterType[],
    limit: number,
    offset: number,
  ) => {
    performAction({
      f: searchMatchFiltered,
      p: [dispatch, q, filters, limit, offset],
    });
  },
  bulkDelete: (ids: IDType[]) => {
    performAction({ f: bulkDeleteMatches, p: [dispatch, ids] });
  },
  bulkPatch: (patches: MatchPatch[]) => {
    performAction({ f: bulkPatchMatches, p: [dispatch, patches] });
  },
  bulkCreate: (creations: MatchCreate[]) => {
    performAction({ f: createMatchMultiple, p: [dispatch, creations] });
  },
  csvImportMatch: (matches: MatchImport[], dryRun: boolean) => {
    performAction({ f: csvImportMatch, p: [dispatch, matches, dryRun] });
  },
  csvImportResult: (taskId: string) => {
    performAction({ f: csvImportResult, p: [dispatch, taskId] });
  },
});
/*
export enum MatchFixEnum {
    GOAL_MISMATCH = 'GOAL_MISMATCH', Tore stimmen nicht überein, wenn dry run false werden willkürlich tore gelöscht/hinzugefügt, only patch
    MATCH_DAY_WRONG = 'MATCH_DAY_WRONG', Spieltag ist komisch/falsch, wenn spieltag anderer als beim bereits existierenden spiel, only patch
    EVENT_WRONG_TEAM = 'EVENT_WRONG_TEAM', only patch, wenn is match a event hot vo an externen team
    MULTIPLE_MATCHES_FOUND = 'MULTIPLE_MATCHES_FOUND', mehrere matches di dieselben sein könnten gefunden, patch and create
    MATCH_NOT_FOUND = 'MATCH_NOT_FOUND', spiel nicht gefunden, wird erzeugt patch and create
    MATCH_DATE_TIME_WRONG = 'MATCH_DATE_TIME_WRONG', wenn mehr als 30 min unterschied zwischen spielzeit, only patch
}
 */
const props = (state: RootState) => ({
  match: state.admin.match,
  matches: state.admin.matches,
  deletedMatches: state.admin.deletedMatches,
  searching: state.admin.statusSearch === 'loading',
  status: state.admin.status,
  aois: state.aois.value,
  task: state.admin.task,
  taskResult: state.admin.taskResult,
});

export const connector = connect(props, mapper);
// reload
