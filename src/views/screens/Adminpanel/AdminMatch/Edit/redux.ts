import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../../../store';
import {
  patchMatch,
  searchAdmin,
} from '../../../../../store/actions/adminActions';
import { SEARCH_LOCATION } from '../../../../../store/actions/types';
import { performAction } from '../../../../../store/actions/all';
import { Match, MatchPatch } from '../../../../../client/api';
import { IDType } from '../../../../../config/types';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  patchMatch: (id: IDType, match: MatchPatch) => {
    performAction({ f: patchMatch, p: [dispatch, id, match] });
  },
  searchLocation: (q: string) => {
    performAction({ f: searchAdmin, p: [dispatch, q, SEARCH_LOCATION] });
  },
});

const props = (state: RootState, prevProps: { selectedMatch: Match }) => ({
  match: state.admin.match,
  matches: state.admin.matches,
  searching: state.admin.statusSearch === 'loading',
  status: state.admin.status,
  locations: state.admin.locations,
  ...prevProps,
});

export const connector = connect(props, mapper);
