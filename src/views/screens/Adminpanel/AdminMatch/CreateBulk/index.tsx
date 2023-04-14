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
import { faClose, faInfo } from '@fortawesome/pro-regular-svg-icons';
import Papa from 'papaparse';
import { SearchRequest, SearchTypeEnum } from '../../../../../client/api';
import { connector } from './redux';
import { translate, TranslatorKeys } from '../../../../../config/translator';
import { ClavaContext } from '../../../../../config/contexts';
import Loading from '../../../../components/Loading';
import { DefaultFadeTrans } from '../../../../../config/constants';
import client from '../../../../../client';
import { MatchCreateParsed } from '../types';

type ParseError = {
  file: string;
  line: number;
  message: TranslatorKeys;
};

type Parsed = {
  errors: ParseError[];
  matches: MatchCreateParsed[];
};

function parseCsv(file: File): Promise<Parsed> {
  return new Promise<Parsed>((resolve) => {
    Papa.parse(file, {
      skipEmptyLines: true,
      complete: (result) => {
        const matches: MatchCreateParsed[] = [];
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
    const matches: MatchCreateParsed[] = [];
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
  rowAdder,
  status,
  error,
}) => {
  const { l } = useContext(ClavaContext);

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
        setErrors(parsed.errors);
        parsed.matches.forEach(rowAdder);
        setLoading(false);
      });
    }
  }, [files, rowAdder]);
  const [info, setInfo] = useState(false);
  const toggleInfo = useCallback(() => {
    setInfo((i) => !i);
  }, []);
  const sent = useRef(false);

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
// reload
