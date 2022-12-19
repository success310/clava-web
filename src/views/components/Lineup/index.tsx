import React, { useContext, useMemo } from 'react';
import { ConnectedProps } from 'react-redux';
import { GoalEvent, PlayerListElement } from '../../../client/api';
import PlayersInField from './PlayersInField';
import { connector } from './redux';
import ClavaImage from '../ClavaImage';
import { translate } from '../../../config/translator';
import { ClavaContext } from '../../../config/contexts';

const Lineup: React.FC<ConnectedProps<typeof connector>> = ({
  team1Id,
  team2Id,
  lineup1,
  lineup2,
  team1,
  team2,
  cardEvents,
  changeEvents,
  goalEvents,
  matchId,
}) => {
  const { l } = useContext(ClavaContext);
  const changeEvents1 = useMemo(
    () => changeEvents.filter((event) => event.teamId === team1Id),
    [changeEvents, team1Id],
  );
  const changeEvents2 = useMemo(
    () => changeEvents.filter((event) => event.teamId === team2Id),
    [changeEvents, team2Id],
  );
  const goalEvents1 = useMemo(
    () =>
      goalEvents.filter(
        (event) => event.teamId === team1Id && !!event.player,
      ) as (Omit<GoalEvent, 'player'> & { player: PlayerListElement })[],
    [goalEvents, team1Id],
  );
  const goalEvents2 = useMemo(
    () =>
      goalEvents.filter(
        (event) => event.teamId === team2Id && !!event.player,
      ) as (Omit<GoalEvent, 'player'> & { player: PlayerListElement })[],
    [goalEvents, team2Id],
  );
  const cardEvents1 = useMemo(
    () => cardEvents.filter((event) => event.teamId === team1Id),
    [cardEvents, team1Id],
  );
  const cardEvents2 = useMemo(
    () => cardEvents.filter((event) => event.teamId === team2Id),
    [cardEvents, team2Id],
  );
  return (
    <div className="lineup-container">
      <div className="field-container">
        <ClavaImage image={team1.thumb} width="40%" className="team-thumb" />
        <ClavaImage image={team2.thumb} width="40%" className="team-thumb" />
        {lineup1 ? (
          <PlayersInField
            lineup={lineup1}
            cardEvents={cardEvents1}
            goalEvents={goalEvents1}
            changeEvents={changeEvents1}
            rotated={matchId === -1}
            team={team1}
          />
        ) : (
          <span className="no-lineup team1">
            {translate('noLineupEntered', l)}
          </span>
        )}
        {lineup2 ? (
          <PlayersInField
            lineup={lineup2}
            cardEvents={cardEvents2}
            goalEvents={goalEvents2}
            changeEvents={changeEvents2}
            team={team2}
            rotated
          />
        ) : (
          <span className="no-lineup team2">
            {translate('noLineupEntered', l)}
          </span>
        )}
      </div>
    </div>
  );
};

export default connector(Lineup);
