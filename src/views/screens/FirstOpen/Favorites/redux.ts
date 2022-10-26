import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { fetchTeamsOfLeague } from '../../../../store/actions/teamActions';
import { performAction } from '../../../../store/actions/all';
import { IDType } from '../../../../config/types';
import { fetchLeagues } from '../../../../store/actions/leagueActions';
import { RootState } from '../../../../store';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getLeagues: (id: IDType) => {
    performAction({ f: fetchLeagues, p: [dispatch, id] });
  },
  getTeams: (id: IDType) => {
    performAction({ f: fetchTeamsOfLeague, p: [dispatch, id] });
  },
});
const props = (state: RootState) => ({
  leagues: state.leagues.value,
  leaguesError: state.leagues.error,
  leaguesStatus: state.leagues.status,
  teams: state.teams.ofLeague,
  teamsStatus: state.teams.status,
  teamsError: state.teams.error,
  user: state.user.value,
});

export const connector = connect(props, mapper);
