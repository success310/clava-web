import React, { MutableRefObject, useContext, useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBaseball,
  faFutbol,
  faPencil,
} from '@fortawesome/pro-regular-svg-icons';
import {
  CardTypeEnum,
  EventType,
  EventTypeEnum,
  GoalTypeEnum,
} from '../../../../client/api';
import { ClavaContext } from '../../../../config/contexts';
import { isInsider } from '../../../../config/utils';
import { IDType } from '../../../../config/types';

const MatchEvent: React.FC<{
  event: EventType;
  team1Id: IDType;
  standing1: MutableRefObject<number>;
  team2Id: IDType;
  standing2: MutableRefObject<number>;
}> = ({ event, team2Id, team1Id, standing1, standing2 }) => {
  const { user } = useContext(ClavaContext);
  const insider = useMemo(
    () => isInsider(user, team1Id) || isInsider(user, team2Id),
    [user, team1Id, team2Id],
  );
  return (
    <Row className="match-event py-1">
      <Col xs={1}>
        <span>{`${event.minute}'`}</span>
      </Col>
      <Col xs={4}>
        <span className="text-start player">
          {event.teamId === team1Id
            ? event.player
              ? `${event.player.familyName} ${event.player.givenName.slice(
                  0,
                  1,
                )}.`
              : '...'
            : ''}
        </span>
        {event.type === EventTypeEnum.GOAL &&
          !!event.assist &&
          event.teamId === team1Id && (
            <span className="text-start assist">
              {`${event.assist.familyName} ${event.assist.givenName.slice(
                0,
                1,
              )}.`}
            </span>
          )}
      </Col>
      <Col xs={2} className="event-icon">
        {event.type === EventTypeEnum.GOAL ? (
          <FontAwesomeIcon
            icon={faFutbol}
            className={
              event.goalType && event.goalType.key === GoalTypeEnum.OWN_GOAL
                ? 'own-goal'
                : 'goal'
            }
          />
        ) : event.type === EventTypeEnum.CARD ? (
          <div
            className={`card-event ${
              event.cardType.key === CardTypeEnum.RED
                ? 'red'
                : event.cardType.key === CardTypeEnum.YELLOW_RED
                ? 'yellow-red'
                : 'yellow'
            }`}
          />
        ) : (
          <FontAwesomeIcon icon={faBaseball} />
        )}
        {event.type === EventTypeEnum.GOAL && (
          <span className="standing">
            {event.teamId === team1Id
              ? `${++standing1.current} - ${standing2.current}`
              : `${standing1.current} - ${++standing2.current}`}
          </span>
        )}
      </Col>
      <Col xs={4}>
        <span className="text-right player">
          {event.teamId === team2Id
            ? event.player
              ? `${event.player.familyName} ${event.player.givenName.slice(
                  0,
                  1,
                )}.`
              : '...'
            : ''}
        </span>
        {event.type === EventTypeEnum.GOAL &&
          !!event.assist &&
          event.teamId === team2Id && (
            <span className="text-right assist">
              {`${event.assist.familyName} ${event.assist.givenName.slice(
                0,
                1,
              )}.`}
            </span>
          )}
      </Col>
      <Col xs={1}>{insider && <FontAwesomeIcon icon={faPencil} />}</Col>
    </Row>
  );
};

export default MatchEvent;
// relo  ad
