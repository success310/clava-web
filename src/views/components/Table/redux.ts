import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { IDType } from '../../../config/types';
import { RootState } from '../../../store';
import { performAction } from '../../../store/actions/all';
import { fetchByLeague } from '../../../store/actions/standingActions';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getStanding: (id: IDType) => {
    performAction({ f: fetchByLeague, p: [dispatch, id] });
  },
});

const props = (
  state: RootState,
  prevProps: { leagueId: IDType; team1Id?: IDType; team2Id?: IDType },
) => ({
  standing: state.standing.value.find((s) => s.id === prevProps.leagueId)
    ?.response,
  ...prevProps,
});

export const connector = connect(props, mapper);
