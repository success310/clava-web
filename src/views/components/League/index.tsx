import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ConnectedProps } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  faChevronDown,
  faChevronUp,
  faSearch,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputGroup } from 'reactstrap';
import { connector } from './redux';
import { ClavaContext } from '../../../config/contexts';
import { showTranslated, translate } from '../../../config/translator';
import FavoriteIcon from '../General/FavoriteIcon';
import { LEAGUE_CATEGORIES } from '../../../config/constants';
import { League, LeagueCategoryEnum } from '../../../client/api';
import { filterTranslatable, setHead } from '../../../config/utils';

const Leagues: React.FC<ConnectedProps<typeof connector>> = ({
  leagues,
  small,
  leagueId,
  favorites,
}) => {
  const { l } = useContext(ClavaContext);
  const currentLength = useRef(-1);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (leagueId !== -1) {
      const league = leagues.find((lea) => lea.id === leagueId);
      if (league) setHead(showTranslated(league.name, l));
    }
  }, [leagueId, leagues, l]);
  useEffect(() => {
    if (leagueId) setOpen(false);
  }, [leagueId]);
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
    () =>
      leagues
        .filter((league) => filterTranslatable(league.name, search))
        .filter((l1) => favorites.indexOf(l1.id) !== -1),
    [favorites, leagues, search],
  );
  let catIdx = 0;
  const sorted = useMemo(
    () =>
      leagues
        .filter((league) => filterTranslatable(league.name, search))
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
    [leagues, favorites, catIdx, search],
  );
  const onSearch = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setSearch(e.currentTarget.value);
    },
    [],
  );
  const toggleOpen = useCallback(() => {
    setOpen((o) => !o);
  }, []);
  const openOpen = useCallback(() => {
    setOpen(true);
  }, []);
  return (
    <div
      className={`leagues${small ? ' leagues-small' : ''} ${
        open ? 'open' : ''
      }`}>
      <div className="search-leagues">
        <FontAwesomeIcon icon={faSearch} />
        <InputGroup>
          <input
            type="text"
            placeholder={translate('leagues', l)}
            value={search}
            onFocus={openOpen}
            onChange={onSearch}
          />
          <button
            type="button"
            className="input-group-addon"
            onClick={toggleOpen}>
            <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
          </button>
        </InputGroup>
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
              key={`league-list-${lOrCat.id}`}
              className={leagueId === lOrCat.id ? 'active' : ''}>
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
        {search !== '' && favLeagues.length === 0 && sorted.length === 1 && (
          <span className="nav-link">{translate('noMatchforSearch', l)}</span>
        )}
      </nav>
    </div>
  );
};

export default connector(Leagues);
// relo ad
