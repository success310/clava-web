import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import {
  createLeague,
  deleteLeague,
  getLeague,
  patchLeague,
  searchAdmin,
} from '../../../../store/actions/adminActions';
import { IDType } from '../../../../config/types';
import { performAction } from '../../../../store/actions/all';
import { fetchAois } from '../../../../store/actions/aoiActions';
import { LeagueCreate, LeaguePatch } from '../../../../client/api';
import { SEARCH_LEAGUES } from '../../../../store/actions/types';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getLeague: (id: IDType) => {
    performAction({ f: getLeague, p: [dispatch, id] });
  },
  deleteLeague: (id: IDType) => {
    performAction({ f: deleteLeague, p: [dispatch, id] });
  },
  createLeague: (league: LeagueCreate) => {
    performAction({ f: createLeague, p: [dispatch, league] });
  },
  patchLeague: (id: IDType, league: LeaguePatch) => {
    performAction({ f: patchLeague, p: [dispatch, id, league] });
  },
  getAois: () => {
    performAction({ f: fetchAois, p: [dispatch] });
  },
  searchLeague: (q: string) => {
    performAction({ f: searchAdmin, p: [dispatch, q, SEARCH_LEAGUES] });
  },
});

const props = (state: RootState) => ({
  league: state.admin.league,
  leagues: state.admin.leagues,
  searching: state.admin.statusSearch === 'loading',
  status: state.admin.status,
  aois: state.aois.value,
});

export const connector = connect(props, mapper);
