import { ConnectedProps } from 'react-redux';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import { ClavaContext } from '../../../../config/contexts';
import { translate } from '../../../../config/translator';
import { connector } from './redux';
import SearchInput from '../SearchInput';
import { MatchListElement } from '../../../../client/api';
import AdminCreateMatch from './Create';
import AdminEditMatch from './Edit';

const AdminpanelMatch: React.FC<ConnectedProps<typeof connector>> = ({
  match,
  matches,
  getMatch,
  status,
  searching,
  searchMatch,
}) => {
  const { l } = useContext(ClavaContext);
  const { adminMethod, adminElemId } = useParams();
  const navigate = useNavigate();
  const [method, setMethod] = useState<string>(adminMethod ?? 'search');
  const [query, setQuery] = useState('');

  const [selectedMatch, setSelectedMatch] = useState<MatchListElement>();
  const timeout = useRef<number>(-1);

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
    } else if (match) {
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
        getMatch(m.id);
      }
      setSelectedMatch(m);
    },
    [getMatch],
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
          label="searchMatches"
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
    </div>
  );
};

export default connector(AdminpanelMatch);
// reload
