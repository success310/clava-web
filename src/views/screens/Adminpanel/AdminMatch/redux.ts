import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import {
  deleteMatch,
  getMatch,
  searchAdmin,
} from '../../../../store/actions/adminActions';
import { SEARCH_MATCH } from '../../../../store/actions/types';
import { IDType } from '../../../../config/types';
import { performAction } from '../../../../store/actions/all';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getMatch: (id: IDType) => {
    performAction({ f: getMatch, p: [dispatch, id] });
  },
  deleteMatch: (id: IDType) => {
    performAction({ f: deleteMatch, p: [dispatch, id] });
  },
  searchMatch: (q: string) => {
    performAction({ f: searchAdmin, p: [dispatch, q, SEARCH_MATCH] });
  },
});

const props = (state: RootState) => ({
  match: state.admin.match,
  matches: state.admin.matches,
  searching: state.admin.statusSearch === 'loading',
  status: state.admin.status,
});

export const connector = connect(props, mapper);
