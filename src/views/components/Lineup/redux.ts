import { connect } from 'react-redux';
import { IDType } from '../../../config/types';
import {
  CardEvent,
  ChangeEvent,
  GoalEvent,
  Lineup,
  Player,
  PlayerListElement,
  TeamListElement,
} from '../../../client/api';
import { PLAYERS_PREFIX } from '../../../store/actions/types';
import { RootState } from '../../../store';

export declare type LineupCreateCont = {
  typeId: IDType;
  lineupPositionPlayers: {
    playerId: number;
    positionId?: number;
    player: Player | PlayerListElement;
  }[];
};

const props = (
  state: RootState,
  prevProps: {
    team1Id: IDType;
    team1: TeamListElement;
    team2Id: IDType;
    team2: TeamListElement;
    matchId: IDType;
    lineup1: Lineup | undefined;
    lineup2: Lineup | undefined;
    cardEvents: CardEvent[];
    goalEvents: GoalEvent[];
    changeEvents: ChangeEvent[];
  },
) => ({
  loading: state.match.status === 'loading',
  players:
    !!state.teams.players[`${PLAYERS_PREFIX}${prevProps.team1Id}`] &&
    !!state.teams.players[`${PLAYERS_PREFIX}${prevProps.team2Id}`],
  ...prevProps,
});

export const connector = connect(props);
