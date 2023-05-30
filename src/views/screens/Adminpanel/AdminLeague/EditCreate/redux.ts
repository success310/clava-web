import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {connect} from 'react-redux';
import {RootState} from '../../../../../store';
import {IDType} from "../../../../../config/types";
import {AreaOfInterest, League, LeagueCreate, LeaguePatch} from "../../../../../client/api";
import {fetchTeamsOfLeague} from "../../../../../store/actions/teamActions";
import {performAction} from "../../../../../store/actions/all";
import {addTeamToLeague, removeTeamFromLeague, searchAdmin} from "../../../../../store/actions/adminActions";
import {SEARCH_TEAMS} from "../../../../../store/actions/types";

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
    getTeams: (leagueId: IDType) => {
        performAction({f:fetchTeamsOfLeague,p:[dispatch, leagueId]});
    },
    searchTeam: (q:string) =>{
        performAction({f:searchAdmin, p:[dispatch,q,SEARCH_TEAMS]});
    },
    addTeamsToLeague: (
        leagueId: IDType,
        teamIds: IDType[])=>{
        performAction({f:addTeamToLeague,p:[dispatch,leagueId,teamIds]});
    },
    removeTeamFromLeague: (
        leagueId: IDType,
        teamIds: IDType[])=>{
        performAction({f:removeTeamFromLeague,p:[dispatch,leagueId,teamIds]});
    }
});

type EditCreateLeagueProps = {
    aois: AreaOfInterest[];
    selectedLeague: undefined | League;
    onSubmit: (league: LeagueCreate | LeaguePatch) => void;
};
const props = (state: RootState, prevProps: EditCreateLeagueProps) => ({
    teams: state.teams.ofLeague.find((vs) => vs.id === prevProps.selectedLeague?.id),
    status: state.admin.status,
    statusTeams: state.teams.status,
    statusSearch: state.admin.statusSearch,
    teamsResult: state.admin.teams,
    ...prevProps
});

export const connector = connect(props, mapper);
