import { ConnectedProps } from 'react-redux';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/pro-regular-svg-icons';
import { getSeason } from '../../../../config/utils';
import { IDType } from '../../../../config/types';
import { showTranslated, translate } from '../../../../config/translator';
import {
  LanguageLocaleEnum,
  TeamListElement,
  User,
} from '../../../../client/api';
import Loading from '../../../components/Loading';
import { connector } from './redux';
import ClavaPicker from '../../../components/Form/ClavaPicker';
import ClavaImage from '../../../components/ClavaImage';
import { ClavaContext } from '../../../../config/contexts';

export declare type FirstOpenFavsProps = ConnectedProps<typeof connector> & {
  aoi: IDType;
  callback: (favs: number[]) => void;
  language: LanguageLocaleEnum;
};

const numPerRow = 3;

const FavButton: React.FC<{
  team: TeamListElement;
  onSelect: (id: IDType) => void;
  l: LanguageLocaleEnum;
}> = ({ onSelect, team, l }) => {
  const onPress = useCallback(() => {
    onSelect(team.id);
  }, [team.id, onSelect]);
  return (
    <Button color="secondary" onClick={onPress}>
      <ClavaImage image={team.thumb} width={100} />
      <span>{showTranslated(team.name, l)}</span>
    </Button>
  );
};

const Favorites: React.FC<FirstOpenFavsProps> = ({
  leagues,
  getLeagues,
  aoi,
  leaguesStatus,
  teams,
  language,
  teamsStatus,
  user,
  getTeams,
  callback,
}) => {
  const [selected, setSelected] = useState<IDType[]>([]);
  const [league, setLeague] = useState(-1);
  useEffect(() => {
    if (user && leagues.length === 0 && aoi !== -1) {
      setTimeout(() => {
        getLeagues(aoi);
      }, 500);
    }
  }, [user, leagues, getLeagues, aoi]);

  useEffect(() => {
    if (
      leagues.length !== 0 &&
      leaguesStatus === 'idle' &&
      teams.length === 0 &&
      teamsStatus === 'idle'
    ) {
      setLeague(
        leagues.filter((leagu) => leagu.name.textDE.indexOf('pokal') === -1)[0]
          .id,
      );
      getTeams(
        leagues.filter((leagu) => leagu.name.textDE.indexOf('pokal') === -1)[0]
          .id,
      );
    }
  }, [leaguesStatus, leagues, teams, teamsStatus, getTeams]);

  const teamLeagueToChoose = teams.filter((t) => t.id === league);
  const teamToChoose = teamLeagueToChoose.length
    ? teamLeagueToChoose[0].response
    : [];
  const onSelectFav = useCallback((id: IDType) => {
    setSelected((sel) =>
      sel.includes(id) ? sel.filter((oldId) => id !== oldId) : sel.concat(id),
    );
  }, []);
  const onContinue = useCallback(() => {
    callback(selected);
  }, [selected, callback]);
  const itemsTranslatable = useMemo(
    () =>
      leagues
        .filter((lea) => lea.main)
        .map((leg) => ({
          id: leg.id,
          customName: `${showTranslated(leg.name, language)} ${getSeason(leg)}`,
        })),
    [language, leagues],
  );
  const onSubmit = useCallback(
    (lea: { id: IDType; customName: string } | undefined) => {
      if (lea) {
        setLeague(lea.id);
        getTeams(lea.id);
      }
    },
    [getTeams],
  );
  const contextValue = useMemo(
    () => ({ l: language, aoi: -1, user: {} as User }),
    [language],
  );
  return (
    <ClavaContext.Provider value={contextValue}>
      <Row className="mb-3">
        <Col xs={12}>
          <span>{translate('chooseFavoriteTeam', language)}</span>
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          md={6}
          className="align-items-center justify-content-center">
          <div className="spacer" />
          <Row>
            <h5 className="text-center">
              {translate('chooseLeague', language)}
            </h5>
          </Row>
          {leagues.length === 0 ? (
            <Loading small />
          ) : (
            <Row className="align-items-center justify-content-center">
              <Col xs={12} md={4}>
                {' '}
                <ClavaPicker
                  itemsTranslatable={itemsTranslatable}
                  submit={onSubmit}
                  withChoose
                  value={league}
                />
              </Col>
            </Row>
          )}
        </Col>

        <Col
          xs={12}
          md={6}
          className="align-items-center justify-content-center mt-3 mt-sm-0">
          {teamToChoose
            .reduce<TeamListElement[][]>((prev, current, index) => {
              const newArray = prev;
              if (index % numPerRow !== 0)
                newArray[prev.length - 1] =
                  newArray[prev.length - 1].concat(current);
              else newArray.push([current]);
              return newArray;
            }, [])
            .map((groupedTeams) => (
              <Row key={`group-${groupedTeams.map((t) => t.id).join('-')}`}>
                {groupedTeams.map((team) => (
                  <Col key={team.id}>
                    <FavButton
                      onSelect={onSelectFav}
                      team={team}
                      l={language}
                    />
                  </Col>
                ))}
              </Row>
            ))}
          {teamLeagueToChoose.length === 0 && teamsStatus === 'loading' && (
            <Loading small />
          )}
        </Col>
      </Row>
      <div className="position-absolute bottom-0 end-0 m-5 text-center">
        <Button color="transparent" onClick={onContinue}>
          <strong className="text-primary text-center">
            {`${translate('continue', language)} `}
          </strong>
          <FontAwesomeIcon icon={faChevronRight} className="text-primary" />
        </Button>
      </div>
    </ClavaContext.Provider>
  );
};

export default connector(Favorites);

// saf
