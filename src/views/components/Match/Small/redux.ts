import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import { MatchListElement } from '../../../../client/api';
import { getMatchDate } from '../../../../config/utils';

const props = (
  state: RootState,
  prevProps: {
    type: 'league' | 'home' | 'team';
    idx: number;
    idx2?: number;
  },
) => {
  let match: MatchListElement | undefined;
  if (
    prevProps.type === 'home' &&
    typeof prevProps.idx2 === 'number' &&
    !!state.match.leagueMatches
  ) {
    match =
      state.match.leagueMatches.response[prevProps.idx].matches[prevProps.idx2];
  }
  if (prevProps.type === 'league' && state.match.matchElements) {
    match = state.match.matchElements.response[prevProps.idx];
  }
  if (prevProps.type === 'team' && state.match.matchesOfTeam) {
    match = state.match.matchesOfTeam.response[prevProps.idx];
  }
  return {
    match,
    goal1: match ? match.goal1 : 0,
    goal2: match ? match.goal2 : 0,
    thisMatchId: match ? match.id : -1,
    cancelled: match ? match.cancelled : false,
    startDate: match ? getMatchDate(match).getTime() : 0,
  };
};

export const connector = connect(props);
