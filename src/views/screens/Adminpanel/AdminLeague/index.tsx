import { ConnectedProps } from 'react-redux';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-regular-svg-icons';
import { Button } from 'reactstrap';
import { ClavaContext } from '../../../../config/contexts';
import { connector } from './redux';
import { showTranslated, translate } from '../../../../config/translator';
import SearchInput from '../SearchInput';
import {
  League,
  LeagueCreate,
  LeagueListElement,
  LeaguePatch,
} from '../../../../client/api';
import EditCreateLeague from './EditCreate';

const AdminpanelLeague: React.FC<ConnectedProps<typeof connector>> = ({
  league,
  aois,
  getAois,
  getLeague,
  status,
  searchLeague,
  deleteLeague,
  createLeague,
  patchLeague,
  searching,
  leagues,
}) => {
  const { l } = useContext(ClavaContext);
  const { adminMethod, adminElemId } = useParams();
  const [method, setMethod] = useState<string>(adminMethod ?? 'search');
  const [query, setQuery] = useState('');
  const [selectedLeague, setSelectedLeague] = useState<League>();
  const isCreating = useRef(false);
  const isDownloading = useRef(false);
  const timeout = useRef<number>(-1);
  useEffect(() => {
    if (
      adminElemId &&
      !Number.isNaN(parseInt(adminElemId, 10)) &&
      status === 'idle'
    ) {
      if (!league) getLeague(parseInt(adminElemId, 10));
      if (league) {
        setSelectedLeague(league);
      }
    } else if (adminMethod === 'edit' && status !== 'loading') {
      setMethod('search');
    } else if (league && isCreating.current && status !== 'loading') {
      isCreating.current = false;
      setSelectedLeague(undefined);
      setSelectedLeague(league);
      setMethod('edit');
    } else if (league && isDownloading.current && status !== 'loading') {
      isDownloading.current = false;
      setSelectedLeague(league);
    }
  }, [adminElemId, getLeague, method, status, league, adminMethod]);
  const reset = useCallback(() => {
    setSelectedLeague(undefined);
  }, []);
  const toggleCreate = useCallback(() => {
    reset();
    setMethod((m) => (m === 'create' ? 'search' : 'create'));
  }, [reset]);
  const toggleSearch = useCallback(() => {
    setMethod('search');
  }, []);
  const toggleEdit = useCallback(() => {
    if (selectedLeague) {
      setMethod((m) => (m === 'edit' ? 'search' : 'edit'));
    } else {
      reset();
      setMethod('search');
    }
  }, [reset, selectedLeague]);
  const toggleDelete = useCallback(() => {
    setMethod((m) => (m === 'delete' ? 'search' : 'delete'));
  }, []);
  const onSearch = useCallback(
    (q: string) => {
      if (timeout.current !== -1) {
        window.clearTimeout(timeout.current);
      }
      setQuery(q);
      timeout.current = window.setTimeout(() => {
        searchLeague(q);
      }, 500);
    },
    [searchLeague],
  );
  const onEdit = useCallback(
    (leaguePatch: LeaguePatch) => {
      if (selectedLeague) {
        isDownloading.current = true;
        patchLeague(selectedLeague.id, leaguePatch);
      }
    },
    [patchLeague, selectedLeague],
  );
  const onCreate = useCallback(
    (leagueCreate: LeagueCreate) => {
      isCreating.current = true;
      createLeague(leagueCreate);
    },
    [createLeague],
  );
  const onDelete = useCallback(() => {
    if (selectedLeague) {
      isDownloading.current = true;
      deleteLeague(selectedLeague.id);
      setMethod('search');
    }
  }, [deleteLeague, selectedLeague]);
  useEffect(() => {
    if (aois.length === 0) getAois();
  }, [aois, getAois]);
  const setSelectedLeagueCont = useCallback(
    (leag: LeagueListElement | undefined) => {
      if (leag) {
        isDownloading.current = true;
        getLeague(leag.id);
      } else setSelectedLeague(undefined);
    },
    [getLeague],
  );
  return (
    <div>
      <fieldset className={`form ${method === 'search' ? 'open' : 'close'}`}>
        <button className="form-toggler" onClick={toggleSearch} type="button">
          <h6>{translate('search', l)}</h6>
          <FontAwesomeIcon
            icon={method === 'search' ? faChevronUp : faChevronDown}
          />
        </button>
        <SearchInput
          value={query}
          onChange={onSearch}
          label="searchLeagues"
          isFocused={method === 'search'}
          selectedItem={selectedLeague}
          name="searchAds"
          onSelect={setSelectedLeagueCont}
          items={leagues}
          searching={searching}
        />
        {selectedLeague && (
          <div className="options">
            <Button color="primary" onClick={toggleEdit}>
              {translate('editLeague', l)}
            </Button>
            <Button color="danger" onClick={toggleDelete}>
              {translate('deleteLeague', l)}
            </Button>
          </div>
        )}
      </fieldset>
      <fieldset className={`form ${method === 'create' ? 'open' : 'close'}`}>
        <button className="form-toggler" onClick={toggleCreate} type="button">
          <h6>{translate('createLeague', l)}</h6>
          <FontAwesomeIcon
            icon={method === 'create' ? faChevronUp : faChevronDown}
          />
        </button>
        {method === 'create' && (
          <EditCreateLeague
            onSubmit={onCreate}
            selectedLeague={undefined}
            aois={aois}
          />
        )}
      </fieldset>
      <fieldset
        className={`form ${selectedLeague ? '' : 'disabled'} ${
          method === 'edit' ? 'open' : 'close'
        }`}>
        <button className="form-toggler" onClick={toggleEdit} type="button">
          <h6>
            {translate('editLeague', l) +
              (selectedLeague ? ` [${selectedLeague.id}]` : '')}
          </h6>
          <FontAwesomeIcon
            icon={method === 'edit' ? faChevronUp : faChevronDown}
          />
        </button>
        {!!selectedLeague && (
          <EditCreateLeague
            onSubmit={onEdit}
            selectedLeague={selectedLeague}
            aois={aois}
          />
        )}
      </fieldset>
      <fieldset
        className={`form ${selectedLeague ? '' : 'disabled'} ${
          method === 'delete' ? 'open' : 'close'
        }`}>
        <button className="form-toggler" onClick={toggleDelete} type="button">
          <h6>
            {translate('deleteLeague', l) +
              (selectedLeague ? ` [${selectedLeague.id}]` : '')}
          </h6>
          <FontAwesomeIcon
            icon={method === 'delete' ? faChevronUp : faChevronDown}
          />
        </button>
        <div>
          {!!selectedLeague && (
            <span>
              {translate('sureWantDelete', l, {
                '[title]': `"${showTranslated(selectedLeague.name, l)}"`,
              })}
            </span>
          )}
        </div>
        <Button type="button" color="primary" onClick={onDelete}>
          <span>{translate('yes', l)}</span>
        </Button>
      </fieldset>
    </div>
  );
};

export default connector(AdminpanelLeague);
// reload
