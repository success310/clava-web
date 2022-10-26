import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { performAction } from '../../../store/actions/all';
import { RootState } from '../../../store';
import { IDType } from '../../../config/types';
import { fetchLeagueMatchesOfDay } from '../../../store/actions/matchActions';
import { dayToNumber } from '../../../config/utils';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  fetchLeagueMatchesOfDay: (aoiID: IDType, date: Date) => {
    performAction({
      f: fetchLeagueMatchesOfDay,
      p: [dispatch, aoiID, dayToNumber(date)],
    });
  },
});

const props = (state: RootState) => ({
  leagueMatches: state.match.leagueMatches,
});

export const connector = connect(props, mapper);
