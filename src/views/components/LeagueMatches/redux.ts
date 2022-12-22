import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { performAction } from '../../../store/actions/all';
import { RootState } from '../../../store';
import { IDType } from '../../../config/types';
import { dayToNumber } from '../../../config/utils';
import { LeagueMatch, MatchListElement } from '../../../client/api';
import {
  fetchLeagueMatchesOfDay,
  fetchLeagueMatchesOfDayLeague,
} from '../../../store/actions/matchActions';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  fetchLeagueMatchesOfDay: (aoiID: IDType, date: Date) => {
    performAction({
      f: fetchLeagueMatchesOfDay,
      p: [dispatch, aoiID, dayToNumber(date)],
    });
  },
  fetchLeagueMatchesOfDayAndLeague: (leagueId: IDType, date: Date) => {
    performAction({
      f: fetchLeagueMatchesOfDayLeague,
      p: [dispatch, dayToNumber(date), leagueId],
    });
  },
});

const props = (
  state: RootState,
  prevProps: { leagueId: IDType; small?: boolean },
) => {
  let leagueMatches: LeagueMatch[] = [];
  if (prevProps.leagueId === -1) {
    if (state.match.leagueMatches)
      leagueMatches = state.match.leagueMatches.response ?? [];
  }
  let matches: MatchListElement[] = [];
  if (
    prevProps.leagueId !== -1 &&
    state.match.matchElements &&
    state.match.matchElements.id === prevProps.leagueId
  )
    matches = state.match.matchElements.response;
  return {
    leagueMatches,
    matches,
    matchesLength: matches.length,
    favorites: state.user.favorites,
    ...prevProps,
  };
};

export const connector = connect(props, mapper);
// reload
