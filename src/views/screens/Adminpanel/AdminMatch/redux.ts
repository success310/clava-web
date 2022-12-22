import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import {
  createMatch,
  getMatch,
  patchMatch,
  searchAdmin,
} from '../../../../store/actions/adminActions';
import {
  SEARCH_LEAGUES,
  SEARCH_MATCH,
  SEARCH_TEAMS,
} from '../../../../store/actions/types';
import { IDType } from '../../../../config/types';
import { performAction } from '../../../../store/actions/all';
import { MatchCreate, MatchPatch } from '../../../../client/api';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getMatch: (id: IDType) => {
    performAction({ f: getMatch, p: [dispatch, id] });
  },
  patchMatch: (id: IDType, match: MatchPatch) => {
    performAction({ f: patchMatch, p: [dispatch, id, match] });
  },
  createMatch: (match: MatchCreate) => {
    performAction({ f: createMatch, p: [dispatch, match] });
  },
  deleteMatch: () => {
    // TODO
  },
  searchMatch: (q: string) => {
    performAction({ f: searchAdmin, p: [dispatch, q, SEARCH_MATCH] });
  },
  searchLeague: (q: string) => {
    performAction({ f: searchAdmin, p: [dispatch, q, SEARCH_LEAGUES] });
  },
  searchTeams: (q: string) => {
    performAction({ f: searchAdmin, p: [dispatch, q, SEARCH_TEAMS] });
  },
});

const props = (state: RootState) => ({
  match: state.admin.match,
  matches: state.admin.matches,
  searching: state.admin.statusSearch === 'loading',
  status: state.admin.status,
  leagues: state.admin.leagues,
  teams: state.admin.teams,
});

export const connector = connect(props, mapper);
