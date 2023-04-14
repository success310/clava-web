import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../../../store';
import {
  createMatchMultiple,
  searchAdmin,
} from '../../../../../store/actions/adminActions';
import {
  SEARCH_LEAGUES,
  SEARCH_LOCATION,
  SEARCH_TEAMS,
} from '../../../../../store/actions/types';
import { performAction } from '../../../../../store/actions/all';
import { MatchCreate } from '../../../../../client/api';
import { MatchCreateParsed } from '../types';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  createMultiple: (matches: MatchCreate[]) => {
    performAction({ f: createMatchMultiple, p: [dispatch, matches] });
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
type CreateBulkProps = {
  rowAdder: (match: MatchCreateParsed) => void;
};
const props = (state: RootState, prevProps: CreateBulkProps) => ({
  match: state.admin.match,
  matches: state.admin.matches,
  searching: state.admin.statusSearch === 'loading',
  error: state.admin.error,
  status: state.admin.status,
  leagues: state.admin.leagues,
  locations: state.admin.locations,
  teams: state.admin.teams,
  ...prevProps,
});

export const connector = connect(props, mapper);
// re load
