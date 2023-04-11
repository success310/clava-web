import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../../../store';
import { MatchFilterRemoveType, MatchFilterType } from '../types';
import { IDType } from '../../../../../config/types';
import { fetchTeamsOfLeague } from '../../../../../store/actions/teamActions';
import { performAction } from '../../../../../store/actions/all';
import { fetchAois } from '../../../../../store/actions/aoiActions';
import { fetchLeagues } from '../../../../../store/actions/leagueActions';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getTeams: (leagueId: IDType) => {
    fetchTeamsOfLeague(dispatch, leagueId);
  },
  getAois: () => {
    performAction({ f: fetchAois, p: [dispatch] });
  },
  getLeagues: (aoiId: IDType) => {
    performAction({ f: fetchLeagues, p: [dispatch, aoiId] });
  },
});
type MatchFilterProps = {
  filter: MatchFilterType[];
  addFilter: (f: MatchFilterType) => void;
  reset: (f?: MatchFilterRemoveType) => void;
  applyFilter: () => void;
  canApplyFilter: boolean;
};

const props = (state: RootState, prevProps: MatchFilterProps) => {
  const filtLeague = prevProps.filter.find((f) => f.type === 'leagueId');
  return {
    leagues: state.leagues.value,
    teams:
      state.teams.ofLeague.find((vs) => vs.id === filtLeague?.value)
        ?.response ?? [],
    searching: state.admin.statusSearch === 'loading',
    searchingTeam: state.teams.status === 'loading',
    aois: state.aois.value,
    ...prevProps,
  };
};
export const connector = connect(props, mapper);
// reloa d
