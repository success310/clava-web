import React, { useContext, useEffect, useState } from 'react';
import { Col, NavLink, Row } from 'reactstrap';
import { ConnectedProps } from 'react-redux';
import FavoriteIcon from '../../General/FavoriteIcon';
import TeamName from '../../Team/TeamName';
import MatchStatusDisplay from '../MatchStatusDisplay';
import { isAdmin, matchStatusDate } from '../../../../config/utils';
import { translate } from '../../../../config/translator';
import { connector } from './redux';
import { ClavaContext } from '../../../../config/contexts';

const MatchSmall: React.FC<ConnectedProps<typeof connector>> = ({
  match,
  cancelled,
  startDate,
  matchId,
  goal1,
  goal2,
}) => {
  const { user, l } = useContext(ClavaContext);

  const [status, setStatus] = useState(matchStatusDate(startDate));
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(matchStatusDate(startDate));
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [startDate]);
  const live = typeof status === 'number';
  if (!match) return null;
  return (
    <NavLink to={`/match/${matchId}`} className="match-small">
      <Row>
        <Col xs={2} className="match-status">
          {cancelled ? (
            <span className="text-danger">
              {translate('cancelledShort', l)}
            </span>
          ) : (
            <MatchStatusDisplay startDate={startDate} hideLive />
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
            id={matchId}
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
