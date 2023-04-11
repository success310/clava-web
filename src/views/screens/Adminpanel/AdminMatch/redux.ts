import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import {
  bulkDeleteMatches,
  bulkPatchMatches,
  createMatchMultiple,
  deleteMatch,
  getMatch,
  searchMatchFiltered,
} from '../../../../store/actions/adminActions';
import { IDType } from '../../../../config/types';
import { performAction } from '../../../../store/actions/all';
import { MatchFilterType } from './types';
import { MatchCreate, MatchPatch } from '../../../../client/api';
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
});

const props = (state: RootState) => ({
  match: state.admin.match,
  matches: state.admin.matches,
  deletedMatches: state.admin.deletedMatches,
  searching: state.admin.statusSearch === 'loading',
  status: state.admin.status,
  aois: state.aois.value,
});

export const connector = connect(props, mapper);
// reload
