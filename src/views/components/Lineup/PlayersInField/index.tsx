import React, { useMemo } from 'react';
import InFieldPlayer from './InFieldPlayer';
import {
  CardEvent,
  CardTypeEnum,
  ChangeEvent,
  GoalEvent,
  Lineup,
  PlayerListElement,
  TeamListElement,
} from '../../../../client/api';
import { generatePW } from '../../../../config/utils';

type PlayersInFieldProps = {
  rotated: boolean;
  lineup: Lineup;
  cardEvents: CardEvent[];
  changeEvents: ChangeEvent[];
  goalEvents: (Omit<GoalEvent, 'player'> & { player: PlayerListElement })[];
  team: TeamListElement;
};

const PlayersInFieldBase: React.FC<PlayersInFieldProps> = ({
  lineup,
  rotated,
  cardEvents,
  goalEvents,
  changeEvents,
  team,
}) => {
  const finalPlayers = useMemo(
    () =>
      lineup.players.map((player) => ({
        position: player.position,
        player: player.player,
        goal: goalEvents.filter((event) => event.player.id === player.player.id)
          .length,
        card: cardEvents
          .filter((event) => event.player?.id === player.player.id)
          .reduce<CardEvent | undefined>((prevCard, currentCard) => {
            if (prevCard === undefined) return currentCard;
            if (
              prevCard.cardType.key === CardTypeEnum.YELLOW &&
              (currentCard.cardType.key === CardTypeEnum.RED ||
                currentCard.cardType.key === CardTypeEnum.YELLOW_RED)
            )
              return currentCard;
            return prevCard;
          }, undefined),
        change:
          changeEvents.filter((event) => event.player.id === player.player.id)
            .length !== 0,
        team,
      })),
    [cardEvents, team, changeEvents, goalEvents, lineup.players],
  );

  const key = useMemo(() => generatePW(20), []);
  return (
    <>
      {finalPlayers.map((p) => (
        <InFieldPlayer
          p={p}
          rotated={rotated}
          key={`${p.position.id}pl${key}`}
        />
      ))}
    </>
  );
};

export default PlayersInFieldBase;
