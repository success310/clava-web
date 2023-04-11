import { ConnectedProps } from 'react-redux';
import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { faRefresh, faSearch } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
} from 'reactstrap';
import { ClavaContext } from '../../../../config/contexts';
import { translate, TranslatorKeys } from '../../../../config/translator';
import { connector } from './redux';
import MatchList from './MatchList';
import { MatchChange, MatchFilterRemoveType, MatchFilterType } from './types';
import MatchFilter from './MatchFilter';
import { getMatchDate } from '../../../../config/utils';
import Loading from '../../../components/Loading';
import { IDType } from '../../../../config/types';
import { MatchCreate, MatchPatch } from '../../../../client/api';
import matchDay from '../../../components/MatchDays/MatchDay';

function isMatchCreate(value: MatchCreate | undefined): value is MatchCreate {
  return !!value;
}

const AdminpanelMatch: React.FC<ConnectedProps<typeof connector>> = ({
  match,
  matches,
  getMatch,
  bulkDelete,
  aois,
  status,
  bulkPatch,
  deletedMatches,
  resetMatches,
  bulkCreate,
  deleteMatch,
  searching,
  searchMatchFiltered,
}) => {
  const { l, aoi } = useContext(ClavaContext);
  const [query, setQuery] = useState('');
  const [selectedMatches, setSelectedMatches] = useState<number[]>([]);
  const [filters, setFilters] = useState<MatchFilterType[]>([]);
  const [wantDelete, setWantDelete] = useState(false);
  const [bulkAktions, setBulkActions] = useState(false);
  const isSaving = useRef(false);
  const isDeleting = useRef<false | IDType[]>(false);
  const wasDeleting = useRef<boolean>(false);
  const wasSaving = useRef(false);
  const [changes, setChanges] = useState<MatchChange[]>([]);
  const [discardChanges, setDiscardChanges] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<TranslatorKeys[]>([]);
  const toggleBulkActions = useCallback(() => {
    setWantDelete(false);
    setBulkActions((ba) => !ba);
  }, []);
  const addFilter = useCallback((filter: MatchFilterType) => {
    setFilters((oldFilters) => oldFilters.concat([filter]));
  }, []);
  useEffect(() => {
    if (isDeleting.current && Array.isArray(isDeleting.current)) {
      for (let i = 0; i < deletedMatches.length; i++) {
        const idx = isDeleting.current.indexOf(deletedMatches[i]);
        if (idx !== -1) {
          isDeleting.current.splice(idx, 1);
        }
      }
      if (isDeleting.current.length === 0) {
        isDeleting.current = false;
      }
    }
  }, [deletedMatches]);
  useEffect(() => {
    if (isSaving.current && wasSaving.current) {
      isSaving.current = false;
      setChanges([]);
      setSuccess(true);
    }
  }, [matches]);
  const searchTimeout = useRef(0);
  const onSearchMatch = useCallback(
    (event?: ChangeEvent<HTMLInputElement>) => {
      setWantDelete(false);
      wasSaving.current = false;
      wasDeleting.current = false;
      let q = query;
      if (event) {
        setQuery(event.target.value);
        q = event.target.value;
      }
      if (q.length === 0) {
        resetMatches();
      }
      if (changes.length) setDiscardChanges(true);
      else if (q.length >= 3) {
        clearTimeout(searchTimeout.current);
        searchTimeout.current = window.setTimeout(() => {
          searchMatchFiltered(q, filters, 0, 30);
          window.clearTimeout(searchTimeout.current);
        }, 1000);
      }
    },
    [query, changes.length, resetMatches, searchMatchFiltered, filters],
  );
  const changeFilter = useCallback(
    (filter: MatchFilterType) => {
      setWantDelete(false);
      const old = filters.find((oldFilter) => oldFilter.type === filter.type);
      if (query.length >= 3) onSearchMatch();
      if (old) {
        setFilters((oldFilters) =>
          oldFilters.map((oldFilter) =>
            oldFilter.type === filter.type ? filter : oldFilter,
          ),
        );
      } else addFilter(filter);
    },
    [addFilter, filters, onSearchMatch, query.length],
  );
  const isFiltered = useMemo(
    () =>
      !(
        filters.length === 0 ||
        (filters.length === 1 &&
          filters[0].type === 'aoiId' &&
          filters[0].value === aoi)
      ),
    [aoi, filters],
  );
  const filteredMatches = useMemo(() => {
    if (!isFiltered) return matches;
    return matches.filter((m) =>
      filters.reduce((prev, current) => {
        if (!prev) return false;
        const date = getMatchDate(m).getTime();
        switch (current.type) {
          case 'dateTo':
            return date <= current.value;
          case 'dateFrom':
            return date >= current.value;
          case 'teamId':
            return m.team2.id === current.value || m.team1.id === current.value;
          case 'matchDay':
          case 'leagueId':
            return m[current.type] === current.value;
          case 'aoiId':
          default:
            return true;
        }
      }, true),
    );
  }, [filters, isFiltered, matches]);
  const resetFilters = useCallback(
    (f?: MatchFilterRemoveType) => {
      setWantDelete(false);
      const newFilters = f
        ? filters.filter((oldFilter) => oldFilter.type !== f.type)
        : [];
      setFilters(newFilters);
      if (query.length > 3) searchMatchFiltered(query, newFilters, 0, 30);
    },
    [filters, query, searchMatchFiltered],
  );
  const selectMatch = useCallback(
    (index: number) => {
      setWantDelete(false);
      setSelectedMatches((sm) => {
        if (index === -1) {
          if (sm.length === filteredMatches.length) return [];
          return filteredMatches.map((_, i) => i);
        }
        const i = sm.indexOf(index);
        if (i === -1) return sm.concat([index]);
        return sm.slice(0, i).concat(sm.slice(i + 1));
      });
    },
    [filteredMatches],
  );

  const applyFilter = useCallback(() => {
    if (changes.length) setDiscardChanges(true);
    else if (matches.length === 0)
      searchMatchFiltered(query.length === 0 ? ' ' : query, filters, 0, 30);
    else {
      setFilters([]);
      if (query.length > 3) searchMatchFiltered(query, [], 0, 30);
    }
  }, [changes.length, matches.length, searchMatchFiltered, query, filters]);
  const toggleWantDelete = useCallback(() => {
    setWantDelete((wd) => !wd);
  }, []);
  const finallyDelete = useCallback(() => {
    isDeleting.current = filteredMatches
      .filter((_, i) => selectedMatches.indexOf(i) !== -1)
      .map((m) => m.id);
    setWantDelete(false);
    wasDeleting.current = true;
    bulkDelete(isDeleting.current);
  }, [filteredMatches, bulkDelete, selectedMatches]);
  const onSave = useCallback(() => {
    const errors: TranslatorKeys[] = [];
    const patches = changes
      .map<MatchPatch>((change) => {
        if (
          change.type === 'create' ||
          !change.change ||
          !change.change.matchId
        )
          return {
            locationId: -1,
          };
        return {
          locationId: change.change.matchId,
          matchDay: change.change.matchDay,
          startTime: change.change.startTime,
        };
      })
      .filter((p) => p.locationId !== -1);

    const creations = changes
      .filter((c) => c.type === 'create')
      .map<MatchCreate | undefined>((change) => {
        if (!change.change) return undefined; // Todo ba de jeweils a fehlermeldung
        if (!change.change.matchDay) return undefined;
        if (!change.change.team2Id) return undefined;
        if (!change.change.team1Id) return undefined;
        if (!change.change.startTime) return undefined;
        if (!change.change.leagueId) return undefined;
        return {
          matchDay: change.change.matchDay,
          team1Id: change.change.team1Id,
          team2Id: change.change.team2Id,
          originalStartTime: change.change.startTime,
          leagueId: change.change.leagueId,
        };
      })
      .filter<MatchCreate>(isMatchCreate);
    if (patches.length !== 0) {
      isSaving.current = true;
      wasDeleting.current = false;
      wasSaving.current = true;
      bulkPatch(patches);
    }
    if (creations.length !== 0) {
      isSaving.current = true;
      wasDeleting.current = false;
      wasSaving.current = true;
      bulkCreate(creations);
    }
    setError(errors);
  }, [bulkCreate, bulkPatch, changes]);
  const discardAllChanges = useCallback(() => {
    setDiscardChanges(false);
    setChanges([]);
  }, []);
  const addChange = useCallback(
    (c: MatchChange) => {
      wasSaving.current = false;
      wasDeleting.current = false;
      const old = changes.find((oldChange) => oldChange.index === c.index);
      if (old) {
        setChanges(
          changes.map((oldChange) =>
            oldChange.index === c.index ? c : oldChange,
          ),
        );
      } else setChanges(changes.concat([c]));
    },
    [changes],
  );
  return (
    <div className="adminpanel-match">
      <fieldset className="form open">
        <h5>{translate('createMatch', l)}</h5>
        <Row className="match-section">
          <Col xs={12}>
            <Button type="button" color="secondary">
              {translate('createSingle', l)}
            </Button>
            <Button type="button" color="secondary" className="ms-2">
              {translate('createBulk', l)}
            </Button>
          </Col>
        </Row>
        <h5>{translate('editMatch', l)}</h5>
        <Row className="match-section">
          <Col xs={12} sm={6}>
            <FormGroup>
              <Label htmlFor="searchMatch">
                {translate('searchMatchExpl', l)}
              </Label>
              <InputGroup className={searching ? 'searching' : ''}>
                <Input
                  type="text"
                  id="searchMatch"
                  value={query}
                  onChange={onSearchMatch}
                />
                <div className="input-group-addon refreshing">
                  <FontAwesomeIcon icon={faRefresh} />
                </div>
                <div className="input-group-addon">
                  <FontAwesomeIcon icon={faSearch} />
                </div>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <h5>{translate('filter', l)}</h5>
        <MatchFilter
          filter={filters}
          canApplyFilter={matches.length === 0}
          reset={resetFilters}
          addFilter={changeFilter}
          applyFilter={applyFilter}
        />
        {discardChanges && (
          <Row>
            <Col xs={12} className="text-center">
              <span className="text-danger">
                {translate('discardUnsavedChanges', l)}
              </span>
            </Col>
            <Col xs={12} className="text-center">
              <Button type="button" color="primary" onClick={discardAllChanges}>
                {translate('discardChanges', l)}
              </Button>
            </Col>
          </Row>
        )}
        {wantDelete && (
          <Row>
            <Col xs={12} className="text-center">
              <span>
                {translate('sureWantDelete', l, {
                  '[title]': filteredMatches
                    .filter((_, i) => selectedMatches.indexOf(i) !== -1)
                    .map((m) => m.id)
                    .join(', '),
                })}
              </span>
            </Col>
            <Col xs={12} className="text-center">
              <Button type="button" color="primary" onClick={finallyDelete}>
                {translate('yes', l)}
              </Button>
            </Col>
          </Row>
        )}
        <h5>{translate('matchActions', l)}</h5>
        <Row>
          <Col xs={2}>
            <Button
              type="button"
              color="danger"
              onClick={toggleWantDelete}
              disabled={selectedMatches.length === 0}>
              {translate('deleteMatch', l)}
            </Button>
          </Col>
          <Col xs={2}>
            <Button
              type="button"
              color="secondary"
              onClick={toggleBulkActions}
              disabled={selectedMatches.length < 2}>
              {translate('bulkActions', l)}
            </Button>
          </Col>
          <Col xs={4} />
          <Col xs={4}>
            <Button
              type="button"
              color="primary"
              onClick={onSave}
              disabled={changes.length === 0 || isSaving.current}>
              {translate('saveChanges', l)}
            </Button>
            <br />
            {isSaving.current || isDeleting.current ? (
              <Loading small />
            ) : wasSaving.current ? (
              <span className={success ? 'text-success' : 'text-danger'}>
                {translate(success ? 'saveSuccess' : 'saveFailed', l)}
                {!success && (
                  <>
                    <br />
                    {error}
                  </>
                )}
              </span>
            ) : wasDeleting.current ? (
              <span className={success ? 'text-success' : 'text-danger'}>
                {translate(success ? 'deleteSuccess' : 'deleteFailed', l)}
                {!success && (
                  <>
                    <br />
                    {error}
                  </>
                )}
              </span>
            ) : (
              <span
                className={
                  changes.length === 0 ? 'text-neutral' : 'text-warning'
                }>
                {translate(
                  changes.length === 0 ? 'noUnsavedChanges' : 'unsavedChanges',
                  l,
                  { '[numChanges]': changes.length.toString() },
                )}
              </span>
            )}
          </Col>
        </Row>
        <h5>
          {`${translate('selectedMatches', l)} ${selectedMatches.length}`}
        </h5>
        <MatchList
          matches={filteredMatches}
          selectedMatches={selectedMatches}
          selectMatch={selectMatch}
          addChange={addChange}
          changes={changes}
        />
      </fieldset>
    </div>
  );
};

export default connector(AdminpanelMatch);
// relo ad
