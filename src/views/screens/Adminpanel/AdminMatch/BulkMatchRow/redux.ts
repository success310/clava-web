import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../../../store';
import { Match, MatchListElement } from '../../../../../client/api';
import {
  MatchChange,
  MatchCreateCont,
  SortDirections,
  SortTypes,
} from '../types';
import { IDType } from '../../../../../config/types';
import { fetchTeamsOfLeague } from '../../../../../store/actions/teamActions';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getTeams: (leagueId: IDType) => {
    fetchTeamsOfLeague(dispatch, leagueId);
  },
});

type BulkMatchHeaderProps = {
  header: true;
  onSort: (by: SortTypes, direction: SortDirections) => void;
  currentDirection: SortDirections;
  currentSorted: SortTypes;
  selected: boolean;
  match?: undefined;
  onSelect: (index: number) => void;
  onChange?: undefined;
  change?: undefined;
  index?: undefined;
};

type BulkMatchCreateProps = {
  header?: false;
  onSort?: undefined;
  currentDirection?: undefined;
  currentSorted?: undefined;
  selected: boolean;
  match?: MatchCreateCont;
  onSelect?: undefined;
  onChange: (change: MatchChange) => void;
  change: MatchChange | undefined;
  index: number;
};
type BulkMatchEditProps = {
  header?: false;
  onSort?: undefined;
  currentDirection?: undefined;
  currentSorted?: undefined;
  selected: boolean;
  match: Match | MatchListElement;
  onSelect: (index: number) => void;
  onChange: (change: MatchChange) => void;
  change: MatchChange | undefined;
  index: number;
};

type BulkMatchRowProps =
  | BulkMatchCreateProps
  | BulkMatchEditProps
  | BulkMatchHeaderProps;
const props = (state: RootState, prevProps: BulkMatchRowProps) => ({
  leagues: state.leagues.value,
  teams: state.teams.ofLeague,
  ...prevProps,
});

export const connector = connect(props, mapper);
// reload
