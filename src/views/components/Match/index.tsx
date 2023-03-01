import { ConnectedProps } from 'react-redux';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { faClose } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import { connector } from './redux';
import { showTranslated, translate } from '../../../config/translator';
import MatchStatusDisplay from './MatchStatusDisplay';
import {
  getCardEvents,
  getChangeEvents,
  getGoalEvents,
  matchStatusDate,
} from '../../../config/utils';
import { ClavaContext } from '../../../config/contexts';
import MatchScoreDisplay from './MatchScoreDisplay';
import ClavaImage from '../ClavaImage';
import { ChangeEvent, EventTypeEnum } from '../../../client/api';
import { parseParams } from '../../../config/routes';
import MatchEvent from './MatchEvent';
import Lineup from '../Lineup';
import Table from '../Table';

const Match: React.FC<ConnectedProps<typeof connector>> = ({
  match,
  startDate,
  cancelled,
  thisMatchId,
  getMatch,
  fullMatch,
  goal2,
  goal1,
}) => {
  const [status, setStatus] = useState(
    matchStatusDate(
      startDate,
      match.league.matchDurationMinutes + match.league.halftimeDurationMinutes,
    ),
  );
  const { l } = useContext(ClavaContext);
  const params = useParams();
  const { view } = params;
  const standing1 = useRef(0);
  const standing2 = useRef(0);
  useEffect(() => {
    getMatch(thisMatchId);
  }, [thisMatchId, getMatch]);
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(
        matchStatusDate(
          startDate,
          match.league.matchDurationMinutes +
            match.league.halftimeDurationMinutes,
        ),
      );
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [startDate]);
  const filteredEvents = useMemo(
    () =>
      fullMatch
        ? fullMatch.events
            .filter(
              (e) =>
                e.type === EventTypeEnum.GOAL ||
                e.type === EventTypeEnum.CHANCE ||
                e.type === EventTypeEnum.CARD,
            )
            .sort((a, b) => a.minute - b.minute)
        : [],
    [fullMatch],
  );
  const changes = useMemo<ChangeEvent[]>(
    () =>
      fullMatch
        ? (fullMatch.events
            .filter((e) => e.type === EventTypeEnum.CHANGE)
            .sort((a, b) => a.minute - b.minute) as ChangeEvent[])
        : [],
    [fullMatch],
  );
  const live = typeof status === 'number';
  standing1.current = 0;
  standing2.current = 0;
  return (
    <div className="match-big">
      <div className="close-match">
        <NavLink to={parseParams({ matchId: undefined }, params)}>
          <FontAwesomeIcon icon={faClose} />
        </NavLink>
      </div>
      <Row>
        <Col
          xs={12}
          md={/* fullMatch && fullMatch.location ? 6 : 12 */ 12}
          className={
            /* `match-status ${
            fullMatch && fullMatch.location ? 'text-right' : 'text-center'
          }` */ 'text-center'
          }>
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
        {/* fullMatch && fullMatch.location && (
          <Col xs={12} md={6} className="match-location text-left">
            {showTranslated(fullMatch.location.name, l)}
          </Col>
        ) */}
      </Row>
      <Row>
        <Col xs={4}>
          <h4 className="text-center">{showTranslated(match.team1.name, l)}</h4>
        </Col>
        <Col xs={4} />
        <Col xs={4}>
          <h4 className="text-center">{showTranslated(match.team2.name, l)}</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={4} className="text-center">
          <ClavaImage image={match.team1.thumb} width="50%" />
        </Col>
        <Col xs={4} className="text-center">
          <MatchScoreDisplay
            className={`text-center bold text-primary ${
              live ? 'text-live' : ''
            }`}
            goal1={goal1}
            goal2={goal2}
          />
        </Col>
        <Col xs={4} className="text-center">
          <ClavaImage image={match.team2.thumb} width="50%" />
        </Col>
      </Row>
      {fullMatch && (
        <>
          <Row className="text-center mt-4 border-bottom mx-1">
            <Col xs={match.league.hasLineup ? 4 : 6}>
              <NavLink
                to={parseParams({ view: 'highlights' }, params)}
                className={
                  !view || view === 'highlights' ? 'text-primary bold' : ''
                }>
                {translate('highlights', l)}
              </NavLink>
            </Col>
            {match.league.hasLineup && (
              <Col xs={4}>
                <NavLink
                  to={parseParams({ view: 'lineup' }, params)}
                  className={view === 'lineup' ? 'text-primary bold' : ''}>
                  {translate('lineup', l)}
                </NavLink>
              </Col>
            )}
            <Col xs={match.league.hasLineup ? 4 : 6}>
              <NavLink
                to={parseParams({ view: 'table' }, params)}
                className={view === 'table' ? 'text-primary bold' : ''}>
                {translate('table', l)}
              </NavLink>
            </Col>
          </Row>
          <Row className="text-center mt-3  mx-1">
            <Col
              xs={12}
              className={!view || view === 'highlights' ? '' : 'hidden'}>
              {filteredEvents.map((e) => (
                <MatchEvent
                  event={e}
                  team1Id={fullMatch.team1.id}
                  team2Id={fullMatch.team2.id}
                  key={`match-event-${e.id}`}
                  standing1={standing1}
                  standing2={standing2}
                />
              ))}
              {!status && <span>{translate('matchNotStarted', l)}</span>}
              {filteredEvents.length === 0 && !!status && (
                <span>{translate('noEventsEntered', l)}</span>
              )}
            </Col>
            {match.league.hasLineup && (
              <Col xs={12} className={view === 'lineup' ? '' : 'hidden'}>
                <Lineup
                  matchId={fullMatch.id}
                  team1Id={fullMatch.team1.id}
                  team2Id={fullMatch.team2.id}
                  team1={fullMatch.team1}
                  team2={fullMatch.team2}
                  lineup1={fullMatch.lineupTeam1}
                  lineup2={fullMatch.lineupTeam2}
                  cardEvents={getCardEvents(fullMatch.events)}
                  changeEvents={getChangeEvents(fullMatch.events)}
                  goalEvents={getGoalEvents(fullMatch.events)}
                />
              </Col>
            )}
            <Col xs={12} className={view === 'table' ? '' : 'hidden'}>
              <Table
                team2Id={fullMatch.team2.id}
                team1Id={fullMatch.team1.id}
                leagueId={fullMatch.leagueId}
              />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default connector(Match);
// rel oad
