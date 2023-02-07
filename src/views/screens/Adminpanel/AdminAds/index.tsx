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
import { translate } from '../../../../config/translator';
import { connector } from './redux';
import SearchInput from '../SearchInput';
import { Ad, AdCreate, AdPatch } from '../../../../client/api';
import EditCreateAd from './EditCreate';

const AdminpanelAds: React.FC<ConnectedProps<typeof connector>> = ({
  status,
  searching,
  deleteAd,
  getAd,
  ad,
  ads,
  createAd,
  patchAd,
  searchAd,
}) => {
  const { l } = useContext(ClavaContext);
  const { adminMethod, adminElemId } = useParams();
  const [method, setMethod] = useState<string>(adminMethod ?? 'search');
  const [query, setQuery] = useState('');
  const [selectedAd, setSelectedAd] = useState<Ad>();
  const isCreating = useRef(false);
  const isDownloading = useRef(false);
  const timeout = useRef<number>(-1);

  useEffect(() => {
    if (
      adminElemId &&
      !Number.isNaN(parseInt(adminElemId, 10)) &&
      status === 'idle'
    ) {
      if (!ad) getAd(parseInt(adminElemId, 10));
      if (ad) {
        setSelectedAd(ad);
      }
    } else if (adminMethod === 'edit' && status !== 'loading') {
      setMethod('search');
    } else if (ad && isCreating.current && status !== 'loading') {
      isCreating.current = false;
      setMethod('edit');
    } else if (ad && isDownloading.current && status !== 'loading') {
      isDownloading.current = false;
      setSelectedAd(ad);
    }
  }, [adminElemId, getAd, method, status, ad, adminMethod]);
  const reset = useCallback(() => {
    setSelectedAd(undefined);
  }, []);
  const toggleCreate = useCallback(() => {
    reset();
    setMethod((m) => (m === 'create' ? 'search' : 'create'));
  }, [reset]);
  const toggleSearch = useCallback(() => {
    setMethod('search');
  }, []);
  const toggleEdit = useCallback(() => {
    if (selectedAd) {
      setMethod((m) => (m === 'edit' ? 'search' : 'edit'));
    } else {
      reset();
      setMethod('search');
    }
  }, [reset, selectedAd]);
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
        searchAd(q);
      }, 500);
    },
    [searchAd],
  );
  const onEdit = useCallback(
    (adPatch: AdPatch) => {
      if (selectedAd) {
        isDownloading.current = true;
        patchAd(selectedAd.id, adPatch);
      }
    },
    [patchAd, selectedAd],
  );
  const onCreate = useCallback(
    (adCreate: AdCreate) => {
      isCreating.current = true;
      createAd(adCreate);
    },
    [createAd],
  );
  const onDelete = useCallback(() => {
    if (selectedAd) {
      isDownloading.current = true;
      deleteAd(selectedAd.id);
      setMethod('search');
    }
  }, [deleteAd, selectedAd]);
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
          label="searchAds"
          isFocused={method === 'search'}
          selectedItem={selectedAd}
          name="searchAds"
          onSelect={setSelectedAd}
          items={ads}
          searching={searching}
        />
        {selectedAd && (
          <div className="options">
            <Button color="primary" onClick={toggleEdit}>
              {translate('editAd', l)}
            </Button>
            <Button color="danger" onClick={toggleDelete}>
              {translate('deleteAd', l)}
            </Button>
          </div>
        )}
      </fieldset>
      <fieldset className={`form ${method === 'create' ? 'open' : 'close'}`}>
        <button className="form-toggler" onClick={toggleCreate} type="button">
          <h6>{translate('createAd', l)}</h6>
          <FontAwesomeIcon
            icon={method === 'create' ? faChevronUp : faChevronDown}
          />
        </button>
        {method === 'create' && (
          <EditCreateAd onSubmit={onCreate} selectedAd={undefined} />
        )}
      </fieldset>
      <fieldset
        className={`form ${selectedAd ? '' : 'disabled'} ${
          method === 'edit' ? 'open' : 'close'
        }`}>
        <button className="form-toggler" onClick={toggleEdit} type="button">
          <h6>
            {translate('editVideo', l) +
              (selectedAd ? ` [${selectedAd.id}]` : '')}
          </h6>
          <FontAwesomeIcon
            icon={method === 'edit' ? faChevronUp : faChevronDown}
          />
        </button>
        {!!selectedAd && (
          <EditCreateAd onSubmit={onEdit} selectedAd={selectedAd} />
        )}
      </fieldset>
      <fieldset
        className={`form ${selectedAd ? '' : 'disabled'} ${
          method === 'delete' ? 'open' : 'close'
        }`}>
        <button className="form-toggler" onClick={toggleDelete} type="button">
          <h6>
            {translate('deleteAd', l) +
              (selectedAd ? ` [${selectedAd.id}]` : '')}
          </h6>
          <FontAwesomeIcon
            icon={method === 'delete' ? faChevronUp : faChevronDown}
          />
        </button>
        <div>
          {!!selectedAd && (
            <span>
              {translate('sureWantDelete', l, {
                '[title]': `"${selectedAd.name}"`,
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

export default connector(AdminpanelAds);
// rel oa
