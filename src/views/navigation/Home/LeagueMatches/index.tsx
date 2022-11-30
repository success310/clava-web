import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ConnectedProps } from 'react-redux';
import { connector } from './redux';
import { ClavaContext } from '../../../../config/contexts';
import MatchDays from '../../../components/MatchDays';
import { MatchListElement } from '../../../../client/api';
import { showTranslated, translate } from '../../../../config/translator';
import {
  dayToNumber,
  getMatchDate,
  getSeason,
  isFavorite,
  shouldAdBePlaced,
  sortMatchesByTime,
} from '../../../../config/utils';
import Loading from '../../../components/Loading';
import LeagueMatchSection, { Section, SectionItem } from './LeagueMatchSection';

const LeagueMatches: React.FC<ConnectedProps<typeof connector>> = ({
  leagueMatches,
  matchesLength,
  favorites,
  fetchLeagueMatchesOfDay,
}) => {
  const { l, aoi } = useContext(ClavaContext);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const shouldScroll = useRef<boolean>(false);
  const adPositions = useRef<string[]>([]);
  useEffect(() => {
    if (selectedDate) {
      fetchLeagueMatchesOfDay(aoi, selectedDate);
      adPositions.current = [];
    }
  }, [aoi]);
  const selectDate = useCallback(
    (date: Date | undefined) => {
      setSelectedDate(date);
      if (date) {
        fetchLeagueMatchesOfDay(aoi, date);
        adPositions.current = [];
      }
    },
    [aoi, fetchLeagueMatchesOfDay],
  );
  const filtered = useMemo<Section[]>(() => {
    const favoriteMatches: SectionItem[] = [];
    const generateAds = adPositions.current.length === 0;
    const lm: Section[] = [];
    const favoriteLeagues: Section[] = [];

    let matchCounter = 0;
    leagueMatches.forEach((leagueMatch, idx) => {
      const temp: Section = {
        title: {
          name: `${showTranslated(leagueMatch.league.name, l)} ${getSeason(
            leagueMatch.league,
          )}`,
          id: leagueMatch.league.id,
        },
        data: [],
      };
      leagueMatch.matches.forEach((match, idx2) => {
        const isValid =
          selectedDate &&
          dayToNumber(getMatchDate(match)) === dayToNumber(selectedDate);
        if (
          (isValid && isFavorite(favorites, match.team1.id, 'team', -1, -1)) ||
          isFavorite(favorites, match.team2.id, 'team', -1, -1) ||
          isFavorite(favorites, match.id, 'match', -1, -1)
        ) {
          favoriteMatches.push({ ...match, idx, idx2 });
        } else temp.data.push({ ...match, idx, idx2 });
      });
      temp.data = (temp.data as unknown as MatchListElement[]).sort(
        sortMatchesByTime,
      ) as SectionItem[];
      if (temp.data.length !== 0) {
        matchCounter += temp.data.length;
        const randIdx = Math.floor(Math.random() * temp.data.length);

        if (generateAds) {
          if (shouldAdBePlaced(matchCounter, adPositions.current.length)) {
            adPositions.current.push(`${lm.length}-${randIdx}`);
            matchCounter = 0;
          }
        }
        const adPos = adPositions.current.indexOf(`${lm.length}-${randIdx}`);
        if (adPos !== -1) {
          temp.data.splice(
            randIdx + 1,
            0,
            `${lm.length}-${randIdx}-${adPos === 0 ? 'priority' : 'normal'}`,
          );
        }
        if (isFavorite(favorites, leagueMatch.league.id, 'league', -1, -1))
          favoriteLeagues.push(temp);
        else lm.push(temp);
      }
    });

    return (
      favoriteMatches.length !== 0
        ? [
            {
              title: { name: translate('myLeagues', l), id: undefined },
              data: favoriteMatches,
            } as Section,
          ]
        : []
    )
      .concat(favoriteLeagues)
      .concat(lm);
  }, [leagueMatches, l, selectedDate, favorites, matchesLength]);
  return (
    <div className="league-matches-container">
      <MatchDays
        type="aoi"
        id={aoi}
        setSelectedDate={selectDate}
        selectedDate={selectedDate}
        shouldScroll={shouldScroll}
        disabled={false}
      />
      <div className="league-matches">
        {filtered.length === 0 ? (
          <Loading small />
        ) : (
          filtered.map((section) => <LeagueMatchSection section={section} />)
        )}
      </div>
    </div>
  );
};

// reload
export default connector(LeagueMatches);
