import React, { useContext, useMemo, useRef } from 'react';
import { ConnectedProps } from 'react-redux';
import { NavLink } from 'reactstrap';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connector } from './redux';
import { ClavaContext } from '../../../config/contexts';
import { showTranslated, translate } from '../../../config/translator';
import FavoriteIcon from '../General/FavoriteIcon';
import { LEAGUE_CATEGORIES } from '../../../config/constants';
import { League, LeagueCategoryEnum } from '../../../client/api';

const Leagues: React.FC<ConnectedProps<typeof connector>> = ({
  leagues,
  small,
  favorites,
}) => {
  const { l } = useContext(ClavaContext);
  const currentLength = useRef(-1);
  const newId = useMemo(() => {
    if (currentLength.current === -1) {
      currentLength.current = favorites.length;
      return -1;
    }
    if (currentLength.current > favorites.length) {
      currentLength.current = favorites.length;
      return -1;
    }
    currentLength.current = favorites.length;
    return favorites[favorites.length - 1];
  }, [favorites.length]);
  const favLeagues = useMemo(
    () => leagues.filter((l1) => favorites.indexOf(l1.id) !== -1),
    [favorites, leagues],
  );
  let catIdx = 0;
  const sorted = useMemo(
    () =>
      leagues
        .filter((league) => favorites.indexOf(league.id) === -1)
        .sort(
          (l1, l2) =>
            LEAGUE_CATEGORIES.indexOf(l1.category) -
            LEAGUE_CATEGORIES.indexOf(l2.category),
        )
        .reduce<(LeagueCategoryEnum | League)[]>(
          (prev, current) => {
            if (
              catIdx >= LEAGUE_CATEGORIES.length - 1 ||
              current.category === LEAGUE_CATEGORIES[catIdx]
            )
              return prev.concat([current]);
            if (
              catIdx + 1 < LEAGUE_CATEGORIES.length &&
              current.category === LEAGUE_CATEGORIES[++catIdx]
            )
              return prev.concat([LEAGUE_CATEGORIES[catIdx], current]);
            if (
              catIdx + 1 < LEAGUE_CATEGORIES.length &&
              current.category === LEAGUE_CATEGORIES[++catIdx]
            )
              return prev.concat([LEAGUE_CATEGORIES[catIdx], current]);
            if (
              catIdx + 1 < LEAGUE_CATEGORIES.length &&
              current.category === LEAGUE_CATEGORIES[++catIdx]
            )
              return prev.concat([LEAGUE_CATEGORIES[catIdx], current]);
            return prev.concat([current]);
          },
          [LEAGUE_CATEGORIES[0]],
        ),
    [leagues, favorites],
  );
  return (
    <div className={`leagues${small ? ' leagues-small' : ''}`}>
      <div className="search-leagues">
        <FontAwesomeIcon icon={faSearch} />
        <input type="text" placeholder={translate('search', l)} />
      </div>
      <nav>
        {favLeagues.length !== 0 && (
          <div className="nav-link">{translate('myLeagues', l)}</div>
        )}
        {favLeagues.map((lea) => (
          <NavLink
            to={`/league/${lea.id}`}
            key={`league-list-${lea.id}`}
            className={lea.id === newId ? 'new' : ''}>
            {showTranslated(lea.name, l)}
            <FavoriteIcon
              type="league"
              id={lea.id}
              team1Id={-1}
              team2Id={-1}
              right
            />
          </NavLink>
        ))}
        {sorted.map((lOrCat) => {
          if (typeof lOrCat === 'string')
            return (
              <div className="nav-link" key={`leaguecat-${lOrCat}`}>
                {translate(lOrCat, l)}
              </div>
            );
          return (
            <NavLink
              to={`/league/${lOrCat.id}`}
              key={`league-list-${lOrCat.id}`}>
              {showTranslated(lOrCat.name, l)}
              <FavoriteIcon
                type="league"
                id={lOrCat.id}
                team1Id={-1}
                team2Id={-1}
                right
              />
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default connector(Leagues);
// rel
