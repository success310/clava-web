import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { ConnectedProps } from 'react-redux';
import { useParams } from 'react-router';
import FavoriteIcon from '../../General/FavoriteIcon';
import TeamName from '../../Team/TeamName';
import MatchStatusDisplay from '../MatchStatusDisplay';
import { isAdmin, matchStatusDate } from '../../../../config/utils';
import { translate } from '../../../../config/translator';
import { connector } from './redux';
import { ClavaContext } from '../../../../config/contexts';
import Match from '../index';
import { parseParams } from '../../../../config/routes';

const MatchSmall: React.FC<ConnectedProps<typeof connector>> = ({
  match,
  cancelled,
  startDate,
  thisMatchId,
  goal1,
  goal2,
}) => {
  const { user, l } = useContext(ClavaContext);
  const params = useParams();
  const { matchId } = params;
  const [status, setStatus] = useState(
    matchStatusDate(
      startDate,
      match
        ? match.league.matchDurationMinutes +
            match.league.halftimeDurationMinutes
        : 110,
    ),
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(
        matchStatusDate(
          startDate,
          match
            ? match.league.matchDurationMinutes +
                match.league.halftimeDurationMinutes
            : 110,
        ),
      );
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [match, startDate]);
  const realMatchId = useMemo(() => {
    if (!matchId) return -1;
    const id = parseInt(matchId, 10);
    return Number.isNaN(id) ? -1 : id;
  }, [matchId]);
  const live = typeof status === 'number';
  if (!match) return null;
  if (realMatchId === match.id) {
    return <Match match={match} />;
  }
  return (
    <NavLink
      to={parseParams({ matchId: thisMatchId }, params)}
      className="match-small">
      <Row>
        <Col xs={2} className="match-status">
          {cancelled ? (
            <span className="text-danger">
              {translate('cancelledShort', l)}
            </span>
          ) : (
            <MatchStatusDisplay
              startDate={startDate}
              matchLength={match.league.matchDurationMinutes}
              halftimeDuration={match.league.halftimeDurationMinutes}
              hideLive
            />
          )}
        </Col>
        <Col xs={8}>
          <TeamName
            team={match.team1}
            goal={status === false ? undefined : goal1}
            live={live}
          />
          <TeamName
            team={match.team2}
            goal={status === false ? undefined : goal2}
            live={live}
          />
        </Col>
        <Col xs={2} className="fav-icon">
          {isAdmin(user) && (
            <span className="text-muted">{`[${match.id}]`}</span>
          )}
          <FavoriteIcon
            id={thisMatchId}
            type="match"
            team2Id={match.team1.id}
            team1Id={match.team2.id}
          />
        </Col>
      </Row>
    </NavLink>
  );
};

export default connector(MatchSmall);
// rel oad
