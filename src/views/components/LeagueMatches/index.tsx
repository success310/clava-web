import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ConnectedProps } from 'react-redux';
import { DateTimeFormat } from 'intl';
import { Button } from 'reactstrap';
import { io } from 'socket.io-client';
import { connector } from './redux';
import { ClavaContext } from '../../../config/contexts';
import MatchDays from '../MatchDays';
import { MatchListElement } from '../../../client/api';
import { showTranslated, translate } from '../../../config/translator';
import {
  dayToNumber,
  formatDate,
  getMatchDate,
  getSeason,
  intlLang,
  isFavorite,
  sameDay,
  shouldAdBePlaced,
  sortMatchesByTime,
} from '../../../config/utils';
import Loading from '../Loading';
import LeagueMatchSection, { Section, SectionItem } from './LeagueMatchSection';

const reducer = (
  p: {
    date: Date;
    matches: (MatchListElement & { idx: number; idx2: number })[];
  }[],
  n: MatchListElement & { idx: number; idx2: number },
) => {
  const currentDate = getMatchDate(n);
  let index = -1;
  p.forEach((v, i) => {
    if (sameDay(v.date, currentDate)) index = i;
  });
  if (index === -1) return p.concat([{ date: getMatchDate(n), matches: [n] }]);
  p[index].matches.push(n);
  return p;
};

const emptyArr: {
  date: Date;
  matches: (MatchListElement & { idx: number; idx2: number })[];
}[] = [];

const LeagueMatches: React.FC<ConnectedProps<typeof connector>> = ({
  leagueMatches,
  matches,
  matchesLength,
  leagueId,
  favorites,
  fetchLeagueMatchesOfDay,
  fetchLeagueMatchesOfDayAndLeague,
  small,
}) => {
  const { l, aoi, user } = useContext(ClavaContext);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const shouldScroll = useRef<boolean>(false);
  const adPositions = useRef<string[]>([]);
  useEffect(() => {
    if (!selectedDate) {
      adPositions.current = [];
    }
  }, [
    aoi,
    fetchLeagueMatchesOfDay,
    fetchLeagueMatchesOfDayAndLeague,
    leagueId,
    selectedDate,
  ]);
  const selectDate = useCallback(
    (day: Date | undefined) => {
      setSelectedDate(day);
      if (day) {
        if (leagueId === -1) fetchLeagueMatchesOfDay(aoi, day);
        else fetchLeagueMatchesOfDayAndLeague(leagueId, day);
        adPositions.current = [];
      }
    },
    [aoi, leagueId],
  );
  const filtered = useMemo<Section[]>(() => {
    const favoriteMatches: SectionItem[] = [];
    const generateAds = adPositions.current.length === 0;
    const lm: Section[] = [];
    const favoriteLeagues: Section[] = [];

    let matchCounter = 0;
    if (leagueId === -1) {
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
            (isValid &&
              isFavorite(favorites, match.team1.id, 'team', -1, -1)) ||
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
    }
    return matches
      .map((m, idx) => ({ ...m, idx, idx2: -1 }))
      .sort(sortMatchesByTime)
      .reduce(reducer, emptyArr)
      .map<Section>((elem) => ({
        title: {
          name: `${DateTimeFormat(intlLang(l), {
            weekday: 'short',
          })
            .format(elem.date)
            .toUpperCase()
            .replace('.', '')}, ${formatDate(
            elem.date,
            l,
            false,
            false,
            true,
            false,
          )}`,
          id: 0,
        },
        data: elem.matches,
      }));
  }, [
    matches,
    leagueMatches,
    l,
    selectedDate,
    favorites,
    matchesLength,
    leagueId,
  ]);
  const [socket, setSocket] = useState<string[]>([]);
  const connectSocketio = useCallback(() => {
    // TODO
    const client = io({ host: 'https://socket.clava-sports.com/' });
    client.on('message', (message) => {
      setSocket((m) => m.concat(message));
    });
    client.on('connect', () => {
      setSocket((m) => m.concat(`Connected as ${client.id}`));
    });
    client.on('connection', () => {
      client.emit('message', JSON.stringify({ user_id: user.id }));
    });
  }, [user]);
  return (
    <div className={`league-matches-container${small ? ' small' : ''}`}>
      <MatchDays
        type={leagueId === -1 ? 'aoi' : 'league'}
        id={leagueId === -1 ? aoi : leagueId}
        setSelectedDate={selectDate}
        selectedDate={selectedDate}
        shouldScroll={shouldScroll}
        disabled={false}
      />
      <Button type="button" onClick={connectSocketio}>
        Connect
      </Button>
      <div className="league-matches">
        {filtered.length === 0 ? (
          <Loading small />
        ) : (
          filtered.map((section) => (
            <LeagueMatchSection
              section={section}
              type={leagueId === -1 ? 'home' : 'league'}
              key={`lm-section-${section.title.id}`}
            />
          ))
        )}
      </div>
    </div>
  );
};

// rel oad
export default connector(LeagueMatches);
