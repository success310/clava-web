import React from 'react';
import { NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/pro-regular-svg-icons';
import { AdPositionEnum, MatchListElement } from '../../../../../client/api';
import { IDType } from '../../../../../config/types';
import ClavaAd from '../../../../components/ClavaAd';
import MatchSmall from '../../../../components/Match/Small';

export declare type SectionItem =
  | string
  | (MatchListElement & { idx: number; idx2: number });

export declare type SectionTitle = { name: string; id: IDType | undefined };

export declare type Section = { title: SectionTitle; data: SectionItem[] };

const LeagueMatch: React.FC<{ item: SectionItem }> = ({ item }) => {
  if (typeof item === 'string')
    return (
      <div className="league-match-item">
        <ClavaAd
          type={AdPositionEnum.HOME_MATCH}
          priority={item.indexOf('priority') !== -1}
        />
      </div>
    );
  return (
    <div className="league-match-item">
      <MatchSmall idx={item.idx} idx2={item.idx2} type="home" />
    </div>
  );
};

const LeagueMatchTitle: React.FC<{ item: SectionTitle }> = ({ item }) => {
  if (item.id) {
    return (
      <NavLink to={`/league/${item.id}`} className="section-title link">
        {item.name}
        <FontAwesomeIcon icon={faChevronRight} />
      </NavLink>
    );
  }
  return <div className="section-title">{item.name}</div>;
};

const LeagueMatchSection: React.FC<{ section: Section }> = ({ section }) => (
  <div className="league-match-section">
    <LeagueMatchTitle item={section.title} />
    {section.data.map((item) => (
      <LeagueMatch
        item={item}
        key={`league-match-item-${typeof item === 'string' ? item : item.id}`}
      />
    ))}
  </div>
);

export default LeagueMatchSection;
