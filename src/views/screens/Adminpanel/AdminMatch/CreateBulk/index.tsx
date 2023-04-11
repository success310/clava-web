import { Button, Col, Input, InputGroup, Modal, Row } from 'reactstrap';
import React, {
  ChangeEventHandler,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ConnectedProps } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClose,
  faInfo,
  faMinus,
  faPlus,
} from '@fortawesome/pro-regular-svg-icons';
import Papa from 'papaparse';
import * as Sentry from '@sentry/react';
import SearchInput from '../../SearchInput';
import TextInput from '../../TextInput';
import {
  MatchCreate,
  SearchRequest,
  SearchTypeEnum,
  Translation,
} from '../../../../../client/api';
import { connector } from './redux';
import DateInput from '../../DateInput';
import { formatDate, generatePW } from '../../../../../config/utils';
import { translate, TranslatorKeys } from '../../../../../config/translator';
import { ClavaContext } from '../../../../../config/contexts';
import Loading from '../../../../components/Loading';
import { DefaultFadeTrans } from '../../../../../config/constants';
import client from '../../../../../client';
import { IDType } from '../../../../../config/types';

type ParseError = {
  file: string;
  line: number;
  message: TranslatorKeys;
};
type MatchCreateCont = {
  matchDay: number;
  team1: { id: number; name: Translation } | undefined;
  team1String: string;
  league: { id: number; name: Translation } | undefined;
  leagueString: string;
  team2: { id: number; name: Translation } | undefined;
  team2String: string;
  date: Date | undefined;
  location: { id: number; name: Translation } | undefined;
  locationString: string;
};

type Parsed = {
  errors: ParseError[];
  matches: MatchCreateCont[];
};

function parseCsv(file: File): Promise<Parsed> {
  return new Promise<Parsed>((resolve) => {
    Papa.parse(file, {
      skipEmptyLines: true,
      complete: (result) => {
        const matches: MatchCreateCont[] = [];
        const errors: ParseError[] = [];
        const matchdays: number[] = [];
        const dates: Date[] = [];
        const leagueStrings: string[] = [];
        const team1Strings: string[] = [];
        const team2Strings: string[] = [];
        const locationStrings: (string | undefined)[] = [];
        const invalids: number[] = [];
        result.data.forEach((line, index) => {
          if (Array.isArray(line) && line.length > 5) {
            const matchday = parseInt(line[0], 10);
            if (Number.isNaN(matchday)) {
              if (index === 0) {
                errors.push({
                  file: file.name,
                  line: index + 1,
                  message: 'probablyHeader',
                });
              } else {
                errors.push({
                  file: file.name,
                  line: index + 1,
                  message: 'noMatchday',
                });
              }
              invalids.push(index);
              return;
            }
            const dateParts = line[1].replaceAll('.', '-').split('-');
            const dateString =
              dateParts.length === 3
                ? `${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`
                : 'invalidDate';
            const timeParts = line[2].split(':');
            const date = new Date(dateString);
            if (timeParts.length === 2) {
              date.setHours(parseInt(timeParts[0], 10));
              date.setMinutes(parseInt(timeParts[1], 10));
            }
            date.setMilliseconds(0);
            date.setSeconds(0);
            if (Number.isNaN(date.getTime())) {
              errors.push({
                file: file.name,
                line: index + 1,
                message: 'errorDateCont',
              });
            }
            const leagueString = line[3];
            const team1String = line[4];
            const team2String = line[5];
            leagueStrings.push(leagueString);
            team1Strings.push(team1String);
            team2Strings.push(team2String);
            matchdays.push(matchday);
            dates.push(date);
            if (line.length > 6) {
              const locationString = line[6];
              locationStrings.push(locationString);
            } else {
              locationStrings.push(undefined);
            }
          } else if (index !== 0) {
            invalids.push(index);
            errors.push({
              file: file.name,
              line: index + 1,
              message: 'wrongLine',
            });
          } else {
            invalids.push(index);
            errors.push({
              file: file.name,
              line: index + 1,
              message: 'probablyHeader',
            });
          }
        });

        const team1Queries: SearchRequest[] = team1Strings.map((query) => ({
          query,
        }));
        const team2Queries: SearchRequest[] = team2Strings.map((query) => ({
          query,
        }));
        client()
          .bulkSearch(
            SearchTypeEnum.LEAGUE,
            leagueStrings.map((query) => ({ query })),
          )
          .then((leagues) => {
            leagueStrings.forEach((q, index) => {
              const foundLeague = leagues.find((lea) => lea.query === q);
              if (foundLeague && foundLeague.result) {
                team1Queries[index].leagueId = foundLeague.result.id;
                team2Queries[index].leagueId = foundLeague.result.id;
              } else {
                errors.push({
                  file: file.name,
                  line: index,
                  message: 'leagueNotFound',
                });
              }
            });
            client()
              .bulkSearch(SearchTypeEnum.TEAM, team1Queries)
              .then((team1s) => {
                client()
                  .bulkSearch(SearchTypeEnum.TEAM, team2Queries)
                  .then((team2s) => {
                    client()
                      .bulkSearch(
                        SearchTypeEnum.LOCATION,
                        (locationStrings.filter((f) => !!f) as string[]).map(
                          (query: string) => ({ query }),
                        ),
                      )
                      .then((locations) => {
                        leagueStrings.forEach((leagueString, index) => {
                          if (invalids.indexOf(index) !== -1) return;
                          const league = leagues.find(
                            (l) => l.query === leagueString,
                          );
                          const date = dates[index];
                          const team1String = team1Strings[index];
                          const team2String = team2Strings[index];
                          const locationString = locationStrings[index];
                          const matchDay = matchdays[index];
                          const team1 = team1s.find(
                            (t) => t.query === team1String,
                          );
                          const team2 = team2s.find(
                            (t) => t.query === team2String,
                          );
                          const location = locations.find(
                            (t) => t.query === team2String,
                          );
                          matches.push({
                            matchDay,
                            date,
                            team1String,
                            team2String,
                            leagueString,
                            locationString: locationString ?? '',
                            team1: team1?.result,
                            team2: team2?.result,
                            league: league?.result,
                            location: location?.result,
                          });
                        });
                        resolve({ errors, matches });
                      });
                  });
              });
          });
      },
    });
  });
}

function parseXml(file: File): Promise<Parsed> {
  return new Promise<Parsed>((resolve) => {
    resolve({ matches: [], errors: [] });
  });
}

function parseSheets(files: FileList): Promise<Parsed> {
  return new Promise<Parsed>((resolve) => {
    const matches: MatchCreateCont[] = [];
    const errors: ParseError[] = [];
    const promises: Promise<Parsed>[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files.item(i);
      if (f) {
        if (f.type === 'text/csv') {
          promises.push(parseCsv(f));
        } else if (f.type === 'application/xml') {
          promises.push(parseXml(f));
        } else {
          promises.push(
            new Promise<Parsed>((resolve2) => {
              resolve2({
                matches: [],
                errors: [
                  { file: f.name, line: -1, message: 'couldNotParseFile' },
                ],
              });
            }),
          );
        }
      }
    }
    Promise.all(promises).then(
      (matchesOfFile) => {
        matchesOfFile.forEach((f) => {
          f.matches.forEach((m) => {
            matches.push(m);
          });
          f.errors.forEach((m) => {
            errors.push(m);
          });
        });
        resolve({ matches, errors });
      },
      () => {
        resolve({
          matches: [],
          errors: [{ file: 'all', line: -1, message: 'couldNotParseFile' }],
        });
      },
    );
  });
}

const AdminCreateBulkMatch: React.FC<ConnectedProps<typeof connector>> = ({
  searchTeams,
  searchLeague,
  searching,
  leagues,
  teams,
  searchLocation,
  status,
  error,
  locations,
  createMultiple,
}) => {
  const { l } = useContext(ClavaContext);
  const [queryLeague, setQueryLeague] = useState<string[]>(['']);
  const [queryTeam1, setQueryTeam1] = useState<string[]>(['']);
  const [queryTeam2, setQueryTeam2] = useState<string[]>(['']);
  const [queryLocation, setQueryLocation] = useState<string[]>(['']);
  const [selectedLocations, setSelectedLocation] = useState<
    ({ id: IDType; name: Translation } | undefined)[]
  >([]);
  const [selectedLeagues, setSelectedLeague] = useState<
    ({ id: IDType; name: Translation } | undefined)[]
  >([]);
  const [selectedTeam1s, setSelectedTeam1] = useState<
    ({ id: IDType; name: Translation } | undefined)[]
  >([]);
  const [selectedTeam2s, setSelectedTeam2] = useState<
    ({ id: IDType; name: Translation } | undefined)[]
  >([]);
  const [dates, setDate] = useState<(Date | undefined)[]>([new Date()]);
  const [matchDays, setMatchDay] = useState<number[]>([-1]);
  const currentIndex = useRef(0);
  const timeout = useRef<number>(-1);
  const [createError, setCreateError] = useState<{
    index: number;
    type: TranslatorKeys;
  }>();
  const onSearchLeague = useCallback(
    (q: string) => {
      if (timeout.current !== -1) {
        window.clearTimeout(timeout.current);
      }
      setQueryLeague((lgs) => {
        lgs[Math.floor(currentIndex.current / 6)] = q;
        return [...lgs];
      });
      timeout.current = window.setTimeout(() => {
        searchLeague(q);
      }, 500);
    },
    [searchLeague],
  );
  const onSearchTeam1 = useCallback(
    (q: string) => {
      if (timeout.current !== -1) {
        window.clearTimeout(timeout.current);
      }
      setQueryTeam1((tms) => {
        tms[Math.floor(currentIndex.current / 6)] = q;
        return [...tms];
      });
      timeout.current = window.setTimeout(() => {
        searchTeams(q);
      }, 500);
    },
    [searchTeams],
  );
  const onSearchTeam2 = useCallback(
    (q: string) => {
      if (timeout.current !== -1) {
        window.clearTimeout(timeout.current);
      }
      setQueryTeam2((tms) => {
        tms[Math.floor(currentIndex.current / 6)] = q;
        return [...tms];
      });
      timeout.current = window.setTimeout(() => {
        searchTeams(q);
      }, 500);
    },
    [searchTeams],
  );

  const onSearchLocation = useCallback(
    (q: string) => {
      if (timeout.current !== -1) {
        window.clearTimeout(timeout.current);
      }
      setQueryLocation((lcs) => {
        lcs[Math.floor(currentIndex.current / 6)] = q;
        return [...lcs];
      });
      timeout.current = window.setTimeout(() => {
        searchLocation(q);
      }, 500);
    },
    [searchLocation],
  );

  const setSelectedTeam1Cont = useCallback(
    (team: { id: IDType; name: Translation } | undefined) => {
      setSelectedTeam1((tms) => {
        tms[Math.floor(currentIndex.current / 6)] = team;
        if (team) currentIndex.current++;
        return [...tms];
      });
    },
    [],
  );
  const setSelectedTeam2Cont = useCallback(
    (team: { id: IDType; name: Translation } | undefined) => {
      setSelectedTeam2((tms) => {
        tms[Math.floor(currentIndex.current / 6)] = team;
        if (team) currentIndex.current++;
        return [...tms];
      });
    },
    [],
  );
  const setSelectedLeagueCont = useCallback(
    (league: { id: IDType; name: Translation } | undefined) => {
      setSelectedLeague((lgs) => {
        lgs[Math.floor(currentIndex.current / 6)] = league;
        setSelectedTeam1Cont(undefined);
        setSelectedTeam2Cont(undefined);
        if (league) currentIndex.current++;
        return [...lgs];
      });
    },
    [setSelectedTeam1Cont, setSelectedTeam2Cont],
  );
  const setDateCont = useCallback((date: Date | undefined) => {
    setDate((d) => {
      d[Math.floor(currentIndex.current / 6)] = date;
      return [...d];
    });
  }, []);
  const setMatchDayCont = useCallback((matchDay: number | undefined) => {
    if (matchDay) {
      setMatchDay((mds) => {
        mds[Math.floor(currentIndex.current / 6)] = matchDay;
        return [...mds];
      });
    }
  }, []);
  const setSelectedLocationCont = useCallback(
    (location: { id: IDType; name: Translation } | undefined) => {
      if (location) currentIndex.current++;
      setSelectedLocation((lcs) => {
        lcs[Math.floor(currentIndex.current / 6)] = location;
        return [...lcs];
      });
    },
    [],
  );

  const onDeleteRow = useCallback((idx: number) => {
    setDate((m) => {
      m.splice(idx, 1);
      return [...m];
    });
    setQueryTeam1((m) => {
      m.splice(idx, 1);
      return m;
    });
    setQueryTeam2((m) => {
      m.splice(idx, 1);
      return m;
    });
    setQueryLocation((m) => {
      m.splice(idx, 1);
      return m;
    });
    setQueryLeague((m) => {
      m.splice(idx, 1);
      return m;
    });
    setMatchDay((m) => {
      m.splice(idx, 1);
      return m;
    });
    setSelectedTeam1((m) => {
      m.splice(idx, 1);
      return m;
    });
    setSelectedTeam2((m) => {
      m.splice(idx, 1);
      return m;
    });
    setSelectedLeague((m) => {
      m.splice(idx, 1);
      return m;
    });
    setSelectedLocation((m) => {
      m.splice(idx, 1);
      return m;
    });
  }, []);
  const onAddRow = useCallback(() => {
    currentIndex.current = dates.length * 6;
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }, 100);
    setQueryTeam1((m) => m.concat(['']));
    setQueryTeam2((m) => m.concat(['']));
    setQueryLocation((m) => m.concat(['']));
    setQueryLeague((m) => m.concat(['']));
    setMatchDay((m) => m.concat([m[m.length - 1]]));
    setSelectedTeam1((m) => m.concat([undefined]));
    setSelectedTeam2((m) => m.concat([undefined]));
    setSelectedLeague((m) => m.concat([m[m.length - 1]]));
    setSelectedLocation((m) => m.concat([undefined]));
    setDate((m) => m.concat([m[m.length - 1]]));
  }, [dates.length]);
  const onSetFocus = useCallback((index: number | undefined) => {
    if (index) currentIndex.current = index;
  }, []);
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const onUploadSheets = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      if (e.target.files && e.target.files.length !== 0) {
        setFiles(e.target.files);
      }
    },
    [],
  );
  const [errors, setErrors] = useState<ParseError[]>([]);
  const onValidateSheets = useCallback(() => {
    if (files) {
      setLoading(true);
      parseSheets(files).then((parsed) => {
        setLoading(false);
        setErrors(parsed.errors);
        setQueryLeague(parsed.matches.map((m) => m.leagueString));
        setQueryLocation(parsed.matches.map((m) => m.locationString));
        setQueryTeam1(parsed.matches.map((m) => m.team1String));
        setQueryTeam2(parsed.matches.map((m) => m.team2String));
        setSelectedLeague(parsed.matches.map((m) => m.league));
        setSelectedLocation(parsed.matches.map((m) => m.location));
        setSelectedTeam2(parsed.matches.map((m) => m.team2));
        setSelectedTeam1(parsed.matches.map((m) => m.team1));
        setMatchDay(parsed.matches.map((m) => m.matchDay));
        setDate(parsed.matches.map((m) => m.date));
      });
    }
  }, [files]);
  const [info, setInfo] = useState(false);
  const toggleInfo = useCallback(() => {
    setInfo((i) => !i);
  }, []);
  const sent = useRef(false);
  const onSubmit = useCallback(() => {
    try {
      const matchCreates: MatchCreate[] = dates.map((date, index) => {
        const team1 = selectedTeam1s[index];

        if (!team1) {
          setCreateError({ index, type: 'errorTeam1' });
          throw new Error(`Team1 not set on Match ${index}`);
        }
        const team2 = selectedTeam2s[index];
        if (!team2) {
          setCreateError({ index, type: 'errorTeam2' });
          throw new Error(`Team2 not set on Match ${index}`);
        }
        const league = selectedLeagues[index];
        if (!league) {
          setCreateError({ index, type: 'errorLeague' });
          throw new Error(`League not set on Match ${index}`);
        }
        if (!date || Number.isNaN(date.getTime())) {
          setCreateError({ index, type: 'errorDate' });
          throw new Error(`Date not set on Match ${index}`);
        }
        return {
          matchDay: matchDays[index],
          locationId: locations[index]?.id,
          originalStartTime: formatDate(date, l, true),
          team1Id: team1.id,
          team2Id: team2.id,
          leagueId: league.id,
          refereeId: undefined,
        };
      });
      setCreateError(undefined);
      sent.current = true;
      createMultiple(matchCreates);
    } catch (e) {
      Sentry.captureException(e);
    }
  }, [
    createMultiple,
    dates,
    l,
    locations,
    matchDays,
    selectedLeagues,
    selectedTeam1s,
    selectedTeam2s,
  ]);
  const reducedLocations = useMemo(
    () =>
      locations ? locations.map((loc) => ({ id: loc.id, name: loc.name })) : [],
    [locations],
  );
  const reducedTeams = useMemo(
    () => (teams ? teams.map((loc) => ({ id: loc.id, name: loc.name })) : []),
    [teams],
  );
  const reducedLeagues = useMemo(
    () =>
      leagues ? leagues.map((loc) => ({ id: loc.id, name: loc.name })) : [],
    [leagues],
  );
  return (
    <>
      <Row>
        <h6>{translate('uploadSheet', l)}</h6>
      </Row>
      <Row className="mb-4 ">
        <Col xs={6}>
          <InputGroup>
            <Input
              type="file"
              onChange={onUploadSheets}
              multiple
              accept="text/csv,application/xml"
            />
            <button
              type="button"
              className="input-group-addon"
              onClick={toggleInfo}>
              <FontAwesomeIcon icon={faInfo} />
            </button>
          </InputGroup>
        </Col>
        <Col xs={6}>
          <Button
            color="primary"
            onClick={onValidateSheets}
            disabled={!files || files.length === 0}>
            {translate('validateSheet', l)}
          </Button>
        </Col>
      </Row>
      {loading && (
        <Row className="my-4">
          <Loading small />
        </Row>
      )}
      {status === 'idle' && sent.current && (
        <Row className="my-4">
          <Col xs={12} className="text-center">
            <span className="text-success">Success</span>
          </Col>
        </Row>
      )}
      {errors.length !== 0 && (
        <Row className="my-4">
          {errors.map((e) => (
            <div key={`${e.file}-${e.line}-${e.message}`}>
              <span className="text-danger">
                {translate(e.message, l, {
                  '[line]': e.line.toString(10),
                  '[file]': e.file,
                })}
              </span>
            </div>
          ))}
        </Row>
      )}
      <Modal
        isOpen={info}
        modalTransition={DefaultFadeTrans}
        backdrop
        unmountOnClose={false}>
        <div className="default-modal-content">
          <button type="button" className="close" onClick={toggleInfo}>
            <FontAwesomeIcon icon={faClose} />
          </button>
          <span>{translate('allowedSheets', l)}</span>
        </div>
      </Modal>
      {!!createError && (
        <Row>
          <Col xs={12}>
            <h6 className="text-danger">
              {`${translate(createError.type, l)}. Zeile: ${
                createError.index + 1
              }`}
            </h6>
          </Col>
        </Row>
      )}
      {Array(dates.length)
        .fill(0)
        .map((_, index) => (
          <div
            className="bulk-game"
            key={`bulk-create${generatePW(index + 1)}`}>
            <Row>
              <Col
                xs={12}
                md={6}
                className={
                  createError &&
                  createError.index === index &&
                  createError.type === 'errorDate'
                    ? 'alert-danger'
                    : ''
                }>
                <DateInput
                  value={dates[index] ?? new Date()}
                  onChange={setDateCont}
                  name={`match-date${index}`}
                  isFocused={currentIndex.current === index * 6}
                  index={index * 6}
                  onFocus={onSetFocus}
                  label="date"
                  type="datetime"
                  className={
                    createError &&
                    createError.index === index &&
                    createError.type === 'errorDate'
                      ? 'alert-danger'
                      : ''
                  }
                />
              </Col>
              <Col xs={12} md={6}>
                <TextInput
                  label="matchDay"
                  onChange={setMatchDayCont}
                  isFocused={currentIndex.current === index * 6 + 1}
                  index={index * 6 + 1}
                  onFocus={onSetFocus}
                  name={`matchday${index}`}
                  value={matchDays[index]}
                />
              </Col>
            </Row>
            <Row>
              <Col
                xs={12}
                md={6}
                className={
                  createError &&
                  createError.index === index &&
                  createError.type === 'errorLeague'
                    ? 'alert-danger'
                    : ''
                }>
                <SearchInput
                  value={queryLeague[index]}
                  searching={searching}
                  isFocused={currentIndex.current === index * 6 + 2}
                  index={index * 6 + 2}
                  onFocus={onSetFocus}
                  onChange={onSearchLeague}
                  label="searchLeague"
                  name={`league${index}`}
                  items={reducedLeagues}
                  selectedItem={selectedLeagues[index]}
                  onSelect={setSelectedLeagueCont}
                  className={
                    createError &&
                    createError.index === index &&
                    createError.type === 'errorLeague'
                      ? 'alert-danger'
                      : ''
                  }
                />
              </Col>
              <Col xs={12} md={6}>
                <SearchInput
                  value={queryLocation[index]}
                  searching={searching}
                  onChange={onSearchLocation}
                  isFocused={currentIndex.current === index * 6 + 3}
                  index={index * 6 + 3}
                  onFocus={onSetFocus}
                  label="searchLocation"
                  name={`location${index}`}
                  items={reducedLocations}
                  selectedItem={selectedLocations[index]}
                  onSelect={setSelectedLocationCont}
                />
              </Col>
            </Row>
            <Row>
              <Col
                xs={12}
                md={6}
                className={
                  createError &&
                  createError.index === index &&
                  createError.type === 'errorTeam1'
                    ? 'alert-danger'
                    : ''
                }>
                <SearchInput
                  value={queryTeam1[index]}
                  searching={searching}
                  isFocused={currentIndex.current === index * 6 + 4}
                  index={index * 6 + 4}
                  onFocus={onSetFocus}
                  onChange={onSearchTeam1}
                  label="searchTeam1"
                  name={`team1${index}`}
                  items={reducedTeams}
                  selectedItem={selectedTeam1s[index]}
                  onSelect={setSelectedTeam1Cont}
                  className={
                    createError &&
                    createError.index === index &&
                    createError.type === 'errorTeam1'
                      ? 'alert-danger'
                      : ''
                  }
                />
              </Col>
              <Col
                xs={12}
                md={6}
                className={
                  createError &&
                  createError.index === index &&
                  createError.type === 'errorTeam2'
                    ? 'alert-danger'
                    : ''
                }>
                <SearchInput
                  value={queryTeam2[index]}
                  searching={searching}
                  isFocused={currentIndex.current === index * 6 + 5}
                  index={index * 6 + 5}
                  onFocus={onSetFocus}
                  onChange={onSearchTeam2}
                  label="searchTeam2"
                  name={`team2${index}`}
                  items={reducedTeams}
                  selectedItem={selectedTeam2s[index]}
                  onSelect={setSelectedTeam2Cont}
                  className={
                    createError &&
                    createError.index === index &&
                    createError.type === 'errorTeam2'
                      ? 'alert-danger'
                      : ''
                  }
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={12} className="text-center">
                <Button
                  color="primary"
                  onClick={() => {
                    onDeleteRow(index);
                  }}
                  className="next-match">
                  <FontAwesomeIcon icon={faMinus} className="text-white me-4" />
                  <span>{translate('deleteMatch', l)}</span>
                  <FontAwesomeIcon icon={faMinus} className="text-white ms-4" />
                </Button>
              </Col>
            </Row>
          </div>
        ))}

      <Row className="my-4">
        <Col xs={6} className="text-center">
          <Button color="primary" onClick={onAddRow} className="next-match">
            <FontAwesomeIcon icon={faPlus} className="text-white me-4" />
            <span>{translate('newMatch', l)}</span>
            <FontAwesomeIcon icon={faPlus} className="text-white ms-4" />
          </Button>
        </Col>
        <Col xs={6} className="text-center">
          <Button color="primary" onClick={onSubmit} disabled={sent.current}>
            <span>{translate('submitAll', l)}</span>
          </Button>
        </Col>
      </Row>

      {error && (
        <Row className="my-4">
          <Col xs={12} className="text-center">
            <span className="text-danger">{translate(error, l)}</span>
          </Col>
        </Row>
      )}
    </>
  );
};

export default connector(AdminCreateBulkMatch);
// relo ad
