import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import { getLeague } from '../../../../store/actions/adminActions';
import { IDType } from '../../../../config/types';
import { performAction } from '../../../../store/actions/all';
import { fetchAois } from '../../../../store/actions/aoiActions';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getLeague: (id: IDType) => {
    performAction({ f: getLeague, p: [dispatch, id] });
  },
  getAois: () => {
    performAction({ f: fetchAois, p: [dispatch] });
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
