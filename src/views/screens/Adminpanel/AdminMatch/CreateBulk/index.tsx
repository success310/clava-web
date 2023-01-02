import { Button, Col, Input, InputGroup, Modal, Row } from 'reactstrap';
import React, {
  ChangeEventHandler,
  useCallback,
  useContext,
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
import SearchInput from '../../SearchInput';
import TextInput from '../../TextInput';
import {
  LeagueListElement,
  Location,
  TeamListElement,
} from '../../../../../client/api';
import { connector } from './redux';
import DateInput from '../../DateInput';
import { generatePW } from '../../../../../config/utils';
import { translate, TranslatorKeys } from '../../../../../config/translator';
import { ClavaContext } from '../../../../../config/contexts';
import Loading from '../../../../components/Loading';
import { DefaultFadeTrans } from '../../../../../config/constants';
import client from '../../../../../client';

type ParseError = {
  file: string;
  line: number;
  message: TranslatorKeys;
};
type MatchCreateCont = {
  matchDay: number;
  team1: TeamListElement | undefined;
  team1String: string;
  league: LeagueListElement | undefined;
  leagueString: string;
  team2: TeamListElement | undefined;
  team2String: string;
  date: Date | undefined;
  location: Location | undefined;
  locationString: string;
};

type SingleElemOfMatch<T extends keyof MatchCreateCont> = {
  key: T;
  value: MatchCreateCont[T];
};

type Parsed = {
  errors: ParseError[];
  matches: MatchCreateCont[];
};

type SearchResult =
  | {
      type: 'team';
      result: TeamListElement[];
    }
  | { type: 'league'; result: LeagueListElement[] }
  | { type: 'location'; result: Location[] };

const foundResults: Record<string, SearchResult> = {};

function determineLeague(leagueString: string): Promise<LeagueListElement[]> {
  if (leagueString in foundResults) {
    const res = foundResults[leagueString];
    if (res.type === 'league')
      return new Promise<LeagueListElement[]>((r) => {
        r(res.result);
      });
  }
  return client().searchLeagues(leagueString, 0, 10);
}

function determineTeam(teamString: string): Promise<TeamListElement[]> {
  if (teamString in foundResults) {
    const res = foundResults[teamString];
    if (res.type === 'team')
      return new Promise<TeamListElement[]>((r) => {
        r(res.result);
      });
  }
  return client().searchTeams(teamString, 0, 10);
}

function determineLocation(
  locationString: string | undefined,
): Promise<Location[]> {
  if (locationString) {
    if (locationString in foundResults) {
      const res = foundResults[locationString];
      if (res.type === 'location')
        return new Promise<Location[]>((r) => {
          r(res.result);
        });
    }
    return client().searchLocations(locationString, 0, 10);
  }
  return new Promise<Location[]>((r) => {
    r([]);
  });
}

function createMatch(
  matchday: number,
  date: Date | undefined,
  leagueString: string,
  team1String: string,
  team2String: string,
  locationString?: string,
): Promise<MatchCreateCont> {
  return new Promise<MatchCreateCont>((resolve) => {
    determineLeague(leagueString).then((leagues) => {
      determineTeam(team1String).then((team1s) => {
        determineTeam(team2String).then((team2s) => {
          determineLocation(locationString).then((locations) => {
            resolve({
              matchDay: matchday,
              team1: team1s.length ? team1s[0] : undefined,
              team2: team2s.length ? team2s[0] : undefined,
              league: leagues.length ? leagues[0] : undefined,
              location: locations.length ? locations[0] : undefined,
              date,
              team1String,
              team2String,
              leagueString,
              locationString: locationString ?? '',
            });
          });
        });
      });
    });
  });
}

function parseCsv(file: File): Promise<Parsed> {
  return new Promise<Parsed>((resolve) => {
    Papa.parse(file, {
      skipEmptyLines: true,
      complete: (result) => {
        console.log(result);
        const matches: MatchCreateCont[] = [];
        const errors: ParseError[] = [];
        const promises: Promise<MatchCreateCont>[] = [];
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
              return;
            }
            const date = new Date(line[1]);
            const time = new Date(line[2]);
            date.setHours(time.getHours());
            date.setMinutes(time.getMinutes());
            date.setSeconds(0);
            date.setMilliseconds(0);
            const leagueString = line[3];
            const team1String = line[4];
            const team2String = line[5];
            if (line.length > 6) {
              const locationString = line[6];
              promises.push(
                createMatch(
                  matchday,
                  date,
                  leagueString,
                  team1String,
                  team2String,
                  locationString,
                ),
              );
            } else {
              promises.push(
                createMatch(
                  matchday,
                  date,
                  leagueString,
                  team1String,
                  team2String,
                ),
              );
            }
          } else if (index !== 0) {
            errors.push({
              file: file.name,
              line: index + 1,
              message: 'wrongLine',
            });
          } else {
            errors.push({
              file: file.name,
              line: index + 1,
              message: 'probablyHeader',
            });
          }
        });
        Promise.all(promises).then((results) => {
          results.forEach((r) => {
            matches.push(r);
          });
          resolve({ errors, matches });
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
  locations,
  createSingleMatch,
}) => {
  const { l } = useContext(ClavaContext);
  const [queryLeague, setQueryLeague] = useState<string[]>(['']);
  const [queryTeam1, setQueryTeam1] = useState<string[]>(['']);
  const [queryTeam2, setQueryTeam2] = useState<string[]>(['']);
  const [queryLocation, setQueryLocation] = useState<string[]>(['']);
  const [selectedLocations, setSelectedLocation] = useState<
    (Location | undefined)[]
  >([]);
  const [selectedLeagues, setSelectedLeague] = useState<
    (LeagueListElement | undefined)[]
  >([]);
  const [selectedTeam1s, setSelectedTeam1] = useState<
    (TeamListElement | undefined)[]
  >([]);
  const [selectedTeam2s, setSelectedTeam2] = useState<
    (TeamListElement | undefined)[]
  >([]);
  const [dates, setDate] = useState<(Date | undefined)[]>([new Date()]);
  const [matchDays, setMatchDay] = useState<number[]>([-1]);
  const currentIndex = useRef(0);
  const timeout = useRef<number>(-1);
  const onSearchLeague = useCallback(
    (q: string) => {
      if (timeout.current !== -1) {
        window.clearTimeout(timeout.current);
      }
      setQueryLeague((lgs) => {
        lgs[Math.floor(currentIndex.current / 6)] = q;
        return [...lgs];
      });
      window.setTimeout(() => {
        searchLeague(q);
      }, 100);
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
      window.setTimeout(() => {
        searchTeams(q);
      }, 100);
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
      window.setTimeout(() => {
        searchTeams(q);
      }, 100);
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
      window.setTimeout(() => {
        searchLocation(q);
      }, 100);
    },
    [searchLocation],
  );

  const setSelectedLeagueCont = useCallback(
    (league: LeagueListElement | undefined) => {
      if (league) currentIndex.current++;
      setSelectedLeague((lgs) => {
        lgs[Math.floor(currentIndex.current / 6)] = league;
        return [...lgs];
      });
    },
    [],
  );
  const setSelectedTeam1Cont = useCallback(
    (team: TeamListElement | undefined) => {
      if (team) currentIndex.current++;
      setSelectedTeam1((tms) => {
        tms[Math.floor(currentIndex.current / 6)] = team;
        return [...tms];
      });
    },
    [],
  );
  const setSelectedTeam2Cont = useCallback(
    (team: TeamListElement | undefined) => {
      if (team) currentIndex.current++;
      setSelectedTeam2((tms) => {
        tms[Math.floor(currentIndex.current / 6)] = team;
        return [...tms];
      });
    },
    [],
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
    (location: Location | undefined) => {
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
      console.log(document.body.scrollHeight);
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
        console.log(parsed);
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
  const onSubmit = useCallback(() => {
    console.log(currentIndex.current);
  }, []);
  return (
    <>
      <Row>
        <h6>{translate('uploadSheet', l)}</h6>
      </Row>
      <Row className="mb-4">
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
      {errors.length !== 0 && (
        <Row className="my-4">
          {errors.map((error) => (
            <div key={`${error.file}-${error.line}-${error.message}`}>
              <span className="text-danger">
                {translate(error.message, l, {
                  '[line]': error.line.toString(10),
                  '[file]': error.file,
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
      {Array(dates.length)
        .fill(0)
        .map((_, index) => (
          <div className="bulk-game" key={`bulk-create${generatePW(index)}`}>
            <Row>
              <Col xs={12} md={6}>
                <DateInput
                  value={dates[index] ?? new Date()}
                  onChange={setDateCont}
                  name={`match-date${index}`}
                  isFocused={currentIndex.current === index * 6}
                  index={index * 6}
                  onFocus={onSetFocus}
                  label="date"
                  type="datetime"
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
              <Col xs={12} md={6}>
                <SearchInput
                  value={queryLeague[index]}
                  searching={searching}
                  isFocused={currentIndex.current === index * 6 + 2}
                  index={index * 6 + 2}
                  onFocus={onSetFocus}
                  onChange={onSearchLeague}
                  label="searchLeague"
                  name={`league${index}`}
                  items={leagues}
                  selectedItem={selectedLeagues[index]}
                  onSelect={setSelectedLeagueCont}
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
                  items={locations}
                  selectedItem={selectedLocations[index]}
                  onSelect={setSelectedLocationCont}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <SearchInput
                  value={queryTeam1[index]}
                  searching={searching}
                  isFocused={currentIndex.current === index * 6 + 4}
                  index={index * 6 + 4}
                  onFocus={onSetFocus}
                  onChange={onSearchTeam1}
                  label="searchTeam1"
                  name={`team1${index}`}
                  items={teams}
                  selectedItem={selectedTeam1s[index]}
                  onSelect={setSelectedTeam1Cont}
                />
              </Col>
              <Col xs={12} md={6}>
                <SearchInput
                  value={queryTeam2[index]}
                  searching={searching}
                  isFocused={currentIndex.current === index * 6 + 5}
                  index={index * 6 + 5}
                  onFocus={onSetFocus}
                  onChange={onSearchTeam2}
                  label="searchTeam2"
                  name={`team2${index}`}
                  items={teams}
                  selectedItem={selectedTeam2s[index]}
                  onSelect={setSelectedTeam2Cont}
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
          <Button color="primary" onClick={onSubmit}>
            <span>{translate('submitAll', l)}</span>
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default connector(AdminCreateBulkMatch);
// reload