import React, {useContext, useMemo} from 'react';
import {Col, Row} from 'reactstrap';
import {League, LeagueListElement, Team, TeamListElement,} from '../../../../client/api';
import {getMainLeague, getSeason} from '../../../../config/utils';

import MatchScoreDisplay from '../../Match/MatchScoreDisplay';
import {ClavaContext} from '../../../../config/contexts';
import {showTranslated} from '../../../../config/translator';
import ClavaImage from '../../ClavaImage';

type TeamNameProps = {
  team: Team | TeamListElement;
  live?: boolean;
  goal?: number;
  primary?: boolean;
  bold?: boolean;
  admin?: boolean;
  leagues?: League[] | LeagueListElement[];
};

const TeamName: React.FC<TeamNameProps> = ({
  team,
  admin,
  live,
  primary,
  bold,
  goal,
  leagues,
}) => {
  const { l } = useContext(ClavaContext);
  const mainLeague = useMemo(
    () => (leagues ? getMainLeague(leagues) : undefined),
    [leagues],
  );
  return (
    <Row className="team-name">
      <Col xs={2} md={1}>
        <ClavaImage image={team.thumb} width={mainLeague ? 32 : 24} />
      </Col>
      <Col xs={8} md={10}>
        <span
          className={
            (primary ? 'text-primary ' : '') + (bold ? 'text-bold ' : '')+ (live ? 'text-live ' : '')
          }>{`${admin ? `[${team.id}]` : ''}${showTranslated(
          team.name,
          l,
        )}`}</span>
        {mainLeague && (
          <span className={primary ? 'text-primary' : 'text-light'}>
            {`${admin ? `[${mainLeague.id}]` : ''}${showTranslated(
              mainLeague.name,
              l,
            )} ${getSeason(mainLeague)}`}
          </span>
        )}
      </Col>
      {goal !== undefined ? (
        <Col xs={2} md={1}>
          <MatchScoreDisplay
            goal1={goal}
            className={`bold${live ? 'live' : ''}`}
          />
        </Col>
      ) : (
        <Col xs={2} />
      )}
    </Row>
  );
};

TeamName.defaultProps = {
  goal: undefined,
  leagues: undefined,
  live: undefined,
  admin: undefined,
  primary: undefined,
  bold: undefined,
};

export default TeamName;
