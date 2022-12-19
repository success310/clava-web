import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltDown, faFutbol } from '@fortawesome/pro-regular-svg-icons';
import {
  CardEvent,
  CardTypeEnum,
  JerseyModeEnum,
  LineupPosition,
  Player,
  PlayerListElement,
  TeamListElement,
} from '../../../../../client/api';
import Jersey from '../../../Jersey';

export declare type LineupPositionPlayerField = {
  player: Player | PlayerListElement;
  team: TeamListElement;
  change: boolean;
  card: CardEvent | undefined;
  goal: number;
  position: LineupPosition;
};

const InFieldPlayer: React.FC<{
  p: LineupPositionPlayerField;
  rotated: boolean;
}> = ({ rotated, p }) => {
  const goals = useMemo(
    () =>
      p.goal !== 0
        ? Array(p.goal)
            .fill(0)
            .map((_, indGoal) => (
              <div
                key={
                  /* eslint-disable-next-line react/no-array-index-key */
                  `goal-${indGoal}`
                }
                className="goal">
                <FontAwesomeIcon icon={faFutbol} color="#000" />
              </div>
            ))
        : null,
    [p.goal],
  );
  const card = useMemo(
    () =>
      p.card ? (
        <div
          className={`card-event ${
            p.card.cardType.key === CardTypeEnum.YELLOW_RED
              ? 'yellow-red'
              : p.card.cardType.key === CardTypeEnum.YELLOW
              ? 'yellow'
              : 'red'
          }`}
        />
      ) : null,
    [p.card],
  );
  const change = useMemo(
    () =>
      p.change ? (
        <div className="change">
          <FontAwesomeIcon color="#f00" icon={faArrowAltDown} />
        </div>
      ) : null,
    [p.change],
  );

  return (
    <div
      key={`lineup-pos-${p.player?.id}-${p.position.id}`}
      className={`player-in-field pos-${p.position.x}-${p.position.y} ${
        rotated ? 'rotated' : ' '
      }`}
      style={{
        left: `${p.position.x * 100}%`,
        top: rotated ? 'auto' : `${p.position.y * 50}%`,
        bottom: rotated ? `${p.position.y * 50}%` : 'auto',
      }}>
      <div className="jersey">
        <Jersey
          color1={
            p.team.jerseyColor1.length !== 0
              ? p.team.jerseyColor1
              : rotated
              ? '#000'
              : '#5AA0E1'
          }
          color2={
            p.team.jerseyColor2.length !== 0 ? p.team.jerseyColor2 : '#000'
          }
          mode={p.team.jerseyMode ? p.team.jerseyMode : JerseyModeEnum.MONO}
          size="100%"
        />
      </div>
      <div className="player-name">
        <span>
          {`${p.player.familyName} ${p.player.givenName.slice(0, 1)}`}
        </span>
      </div>
      {card}
      <div className="goals">{goals}</div>
      {change}
    </div>
  );
};

export default InFieldPlayer;
// re loa d
