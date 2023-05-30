import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {connect} from 'react-redux';
import {RootState} from '../../../../../store';
import {Match, MatchFixEnum, MatchImportResult, MatchListElement,} from '../../../../../client/api';
import {MatchChange, MatchCreateCont, MatchCreateParsed, SortDirections, SortTypes,} from '../types';
import {IDType} from '../../../../../config/types';
import {fetchTeamsOfLeague} from '../../../../../store/actions/teamActions';
import {performAction} from "../../../../../store/actions/all";

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getTeams: (leagueId: IDType) => {
    performAction({f:fetchTeamsOfLeague,p:[dispatch, leagueId]});
  },
});

type RowErrorNoImport = {
  type: 'noImport';
};
type RowErrorMatchday = {
  type: 'matchday';
  match?: MatchListElement;
};
type RowErrorDatetime = {
  type: 'datetime';
  match?: MatchListElement;
};
type RowErrorLeague = {
  type: 'league';
  match?: MatchListElement;
};
type RowErrorTeam1 = {
  type: 'team1';
  match?: MatchListElement;
};
type RowErrorTeam2 = {
  type: 'team2';
  match?: MatchListElement;
};
type RowErrorAnyTeam = {
  type: 'team';
  match?: MatchListElement;
};
type RowErrorGoals = {
  type: 'goals';
  match?: MatchListElement;
};
type RowNoticeCreate = {
  type: 'create';
};
type RowErrorMultiple = {
  type: 'multiple';
};

export type RowError = {
  index: number;
} & (
  | RowNoticeCreate
  | RowErrorDatetime
  | RowErrorMatchday
  | RowErrorLeague
  | RowErrorNoImport
  | RowErrorMultiple
  | RowErrorGoals
  | RowErrorAnyTeam
  | RowErrorTeam2
  | RowErrorTeam1
);
export function matchImportToRowError(tr: MatchImportResult): RowError {
  switch (tr.fixType) {
    case MatchFixEnum.MATCH_DAY_WRONG:
      return { type: 'matchday', index: tr.lineIndex, match: tr.match };

    case MatchFixEnum.MULTIPLE_MATCHES_FOUND:
      return { type: 'multiple', index: tr.lineIndex };

    case MatchFixEnum.MATCH_DATE_TIME_WRONG:
      return { type: 'datetime', index: tr.lineIndex, match: tr.match };

    case MatchFixEnum.GOAL_MISMATCH:
      return { type: 'goals', index: tr.lineIndex, match: tr.match };

    case MatchFixEnum.MATCH_NOT_FOUND:
      return { type: 'create', index: tr.lineIndex };

    default:
      return { type: 'noImport', index: tr.lineIndex };
  }
}

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
  rowFiller?: undefined;
  errors?: RowError[];
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
  rowFiller?: MatchCreateParsed;
  errors?: RowError[];
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
  rowFiller?: undefined;
  errors?: RowError[];
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
