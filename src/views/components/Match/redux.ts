import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { IDType } from '../../../config/types';
import { RootState } from '../../../store';
import { fetchMatch } from '../../../store/actions/matchActions';
import { performAction } from '../../../store/actions/all';
import { MatchListElement } from '../../../client/api';
import { getMatchDate } from '../../../config/utils';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getMatch: (id: IDType) => {
    performAction({ f: fetchMatch, p: [dispatch, id] });
  },
});

const props = (state: RootState, prevProps: { match: MatchListElement }) => ({
  fullMatch: state.match.matches.find((m) => m.id === prevProps.match.id),
  thisMatchId: prevProps.match.id,
  goal2: prevProps.match.goal2,
  goal1: prevProps.match.goal1,
  cancelled: prevProps.match.cancelled,
  startDate: getMatchDate(prevProps.match).getTime(),
  ...prevProps,
});

export const connector = connect(props, mapper);
