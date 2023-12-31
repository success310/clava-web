import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../../../store';
import {
  createMatch,
  searchAdmin,
} from '../../../../../store/actions/adminActions';
import {
  SEARCH_LEAGUES,
  SEARCH_LOCATION,
  SEARCH_TEAMS,
} from '../../../../../store/actions/types';
import { performAction } from '../../../../../store/actions/all';
import { MatchCreate } from '../../../../../client/api';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  createMatch: (match: MatchCreate) => {
    performAction({ f: createMatch, p: [dispatch, match] });
  },
  searchLeague: (q: string) => {
    performAction({ f: searchAdmin, p: [dispatch, q, SEARCH_LEAGUES] });
  },
  searchTeams: (q: string) => {
    performAction({ f: searchAdmin, p: [dispatch, q, SEARCH_TEAMS] });
  },
  searchLocation: (q: string) => {
    performAction({ f: searchAdmin, p: [dispatch, q, SEARCH_LOCATION] });
  },
});

const props = (state: RootState) => ({
  match: state.admin.match,
  matches: state.admin.matches,
  searching: state.admin.statusSearch === 'loading',
  status: state.admin.status,
  leagues: state.admin.leagues,
  locations: state.admin.locations,
  teams: state.admin.teams,
});

export const connector = connect(props, mapper);
// reload
