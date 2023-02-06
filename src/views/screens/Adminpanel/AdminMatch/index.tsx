import { ConnectedProps } from 'react-redux';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import { ClavaContext } from '../../../../config/contexts';
import { showTranslated, translate } from '../../../../config/translator';
import { connector } from './redux';
import SearchInput from '../SearchInput';
import { MatchListElement } from '../../../../client/api';
import AdminCreateMatch from './Create';
import AdminEditMatch from './Edit';
import AdminCreateBulkMatch from './CreateBulk';

const AdminpanelMatch: React.FC<ConnectedProps<typeof connector>> = ({
  match,
  matches,
  getMatch,
  status,
  deleteMatch,
  searching,
  searchMatch,
}) => {
  const { l } = useContext(ClavaContext);
  const { adminMethod, adminElemId } = useParams();
  const [method, setMethod] = useState<string>(adminMethod ?? 'search');
  const [query, setQuery] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<MatchListElement>();
  const timeout = useRef<number>(-1);
  const isDownloading = useRef(false);
  useEffect(() => {
    if (
      adminElemId &&
      !Number.isNaN(parseInt(adminElemId, 10)) &&
      status === 'idle'
    ) {
      if (!match) getMatch(parseInt(adminElemId, 10));
      if (match) {
        setSelectedMatch(match);
      }
    } else if (adminMethod === 'edit' && status !== 'loading') {
      setMethod('search');
    } else if (match && isDownloading.current) {
      isDownloading.current = false;
      setSelectedMatch(match);
    }
  }, [adminElemId, getMatch, method, status, match, adminMethod]);
  const reset = useCallback(() => {
    setSelectedMatch(undefined);
    setQuery('');
  }, []);
  const toggleCreate = useCallback(() => {
    reset();
    setMethod((m) => (m === 'create' ? 'search' : 'create'));
  }, [reset]);
  const toggleSearch = useCallback(() => {
    setMethod('search');
  }, []);
  const toggleEdit = useCallback(() => {
    if (selectedMatch) {
      setMethod((m) => (m === 'edit' ? 'search' : 'edit'));
    } else {
      reset();
      setMethod('search');
    }
  }, [reset, selectedMatch]);
  const toggleDelete = useCallback(() => {
    setMethod((m) => (m === 'delete' ? 'search' : 'delete'));
  }, []);
  const toggleCreateBulk = useCallback(() => {
    setMethod((m) => (m === 'create-bulk' ? 'search' : 'create-bulk'));
  }, []);
  const onSearch = useCallback(
    (q: string) => {
      if (timeout.current !== -1) {
        window.clearTimeout(timeout.current);
      }
      setQuery(q);
      window.setTimeout(() => {
        searchMatch(q);
      }, 100);
    },
    [searchMatch],
  );
  const setSelectedMatchCont = useCallback(
    (m: MatchListElement | undefined) => {
      if (m) {
        isDownloading.current = true;
        getMatch(m.id);
      }
    },
    [getMatch],
  );
  const onDelete = useCallback(() => {
    if (selectedMatch) {
      isDownloading.current = true;
      deleteMatch(selectedMatch.id);
    }
  }, [deleteMatch, selectedMatch]);
  return (
    <div>
      <fieldset className={`form ${method === 'search' ? 'open' : 'close'}`}>
        <button className="form-toggler" onClick={toggleSearch} type="button">
          <h6>{translate('search', l)}</h6>
          <span>{translate('searchMatchExpl', l)}</span>
          <FontAwesomeIcon
            icon={method === 'search' ? faChevronUp : faChevronDown}
          />
        </button>
        <SearchInput
          value={query}
          onChange={onSearch}
          selectedItem={selectedMatch}
          label="searchMatches"
          isFocused={method === 'search'}
          name="searchMatches"
          onSelect={setSelectedMatchCont}
          items={matches}
          searching={searching}
        />
        {selectedMatch && (
          <div className="options">
            <Button color="primary" onClick={toggleEdit}>
              {translate('editMatch', l)}
            </Button>
            <Button color="danger" onClick={toggleDelete}>
              {translate('deleteMatch', l)}
            </Button>
          </div>
        )}
      </fieldset>
      <fieldset className={`form ${method === 'create' ? 'open' : 'close'}`}>
        <button className="form-toggler" onClick={toggleCreate} type="button">
          <h6>{translate('createMatch', l)}</h6>
          <FontAwesomeIcon
            icon={method === 'create' ? faChevronUp : faChevronDown}
          />
        </button>
        {method === 'create' && <AdminCreateMatch />}
      </fieldset>
      <fieldset className={`form ${method === 'edit' ? 'open' : 'close'}`}>
        <button className="form-toggler" onClick={toggleEdit} type="button">
          <h6>{translate('editMatch', l)}</h6>
          <FontAwesomeIcon
            icon={method === 'edit' ? faChevronUp : faChevronDown}
          />
        </button>
        {method === 'edit' && match && <AdminEditMatch selectedMatch={match} />}
        {method === 'edit' && !selectedMatch && (
          <span className="text-danger bold">
            {translate('matchNotFound', l)}
          </span>
        )}
      </fieldset>
      <fieldset
        className={`form ${selectedMatch ? '' : 'disabled'} ${
          method === 'delete' ? 'open' : 'close'
        }`}>
        <button className="form-toggler" onClick={toggleDelete} type="button">
          <h6>
            {translate('deleteLeague', l) +
              (selectedMatch ? ` [${selectedMatch.id}]` : '')}
          </h6>
          <FontAwesomeIcon
            icon={method === 'delete' ? faChevronUp : faChevronDown}
          />
        </button>
        <div>
          {!!selectedMatch && (
            <span>
              {translate('sureWantDelete', l, {
                '[title]': `"${showTranslated(
                  selectedMatch.team1.name,
                  l,
                )} vs. ${showTranslated(selectedMatch.team2.name, l)}"`,
              })}
            </span>
          )}
        </div>
        <Button type="button" color="primary" onClick={onDelete}>
          <span>{translate('yes', l)}</span>
        </Button>
      </fieldset>
      <fieldset
        className={`form ${method === 'create-bulk' ? 'open' : 'close'}`}>
        <button
          className="form-toggler"
          onClick={toggleCreateBulk}
          type="button">
          <h6>{translate('createBulk', l)}</h6>
          <FontAwesomeIcon
            icon={method === 'create-bulk' ? faChevronUp : faChevronDown}
          />
        </button>
        {method === 'create-bulk' && <AdminCreateBulkMatch />}
      </fieldset>
    </div>
  );
};

export default connector(AdminpanelMatch);
// reload
