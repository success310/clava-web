import { ConnectedProps } from 'react-redux';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { faClose } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { connector } from './redux';
import { showTranslated, translate } from '../../../config/translator';
import MatchStatusDisplay from '../../components/Match/MatchStatusDisplay';
import { matchStatusDate } from '../../../config/utils';
import { ClavaContext } from '../../../config/contexts';
import MatchScoreDisplay from '../../components/Match/MatchScoreDisplay';
import ClavaImage from '../../components/ClavaImage';

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
  const [status, setStatus] = useState(matchStatusDate(startDate));
  const { l } = useContext(ClavaContext);

  useEffect(() => {
    getMatch(thisMatchId);
  }, [thisMatchId, getMatch]);
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(matchStatusDate(startDate));
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [startDate]);
  const live = typeof status === 'number';

  return (
    <div className="match-big">
      <div className="close-match">
        <NavLink to="/">
          <FontAwesomeIcon icon={faClose} />
        </NavLink>
      </div>
      <Row>
        <Col
          xs={12}
          md={fullMatch && fullMatch.location ? 6 : 12}
          className={`match-status ${
            fullMatch && fullMatch.location ? 'text-right' : 'text-center'
          }`}>
          {cancelled ? (
            <span className="text-danger">
              {translate('cancelledShort', l)}
            </span>
          ) : (
            <MatchStatusDisplay startDate={startDate} hideLive />
          )}
        </Col>
        {fullMatch && fullMatch.location && (
          <Col xs={12} md={6} className="match-location text-left">
            {showTranslated(fullMatch.location.name, l)}
          </Col>
        )}
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
          <Row className="text-center mt-4">
            <Col xs={12} md={4}>
              <h6>{translate('highlights', l)}</h6>
            </Col>
            <Col xs={0} md={4}>
              <h6>{translate('lineup', l)}</h6>
            </Col>
            <Col xs={0} md={4}>
              <h6>{translate('table', l)}</h6>
            </Col>
          </Row>
          <Row className="text-center mt-3">
            <Col xs={12} md={4}>
              <Row>
                <Col xs={2}>
                  <span>{`${fullMatch.events[0].minute}'`}</span>
                </Col>
                <Col xs={4}>
                  <span>{fullMatch.events[0].player?.givenName ?? '...'}</span>
                </Col>
                <Col xs={2}>
                  <span>1-2</span>
                </Col>
                <Col xs={4}>
                  <span> </span>
                </Col>
              </Row>
            </Col>
            <Col xs={0} md={4}>
              <h6>{translate('lineup', l)}</h6>
            </Col>
            <Col xs={0} md={4}>
              <h6>{translate('table', l)}</h6>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default connector(Match);
// relos ad
