import { ConnectedProps } from 'react-redux';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row } from 'reactstrap';
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
  getStats,
  outSummary,
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
  const message = useRef('');
  const isDownloading = useRef(false);
  const isDeleting = useRef(false);
  const timeout = useRef<number>(-1);
  useEffect(() => {
    if (outSummary.length === 0) {
      getStats();
    }
  }, [outSummary.length]);
  const selectedOutSummary = useMemo(() => {
    if (outSummary.length === 0 || !selectedAd) return undefined;
    return outSummary.find((o) => selectedAd.url.indexOf(o.key) !== -1);
  }, [outSummary, selectedAd]);
  const onSearch = useCallback(
    (q: string) => {
      if (timeout.current !== -1) {
        window.clearTimeout(timeout.current);
      }
      setQuery(q);
      timeout.current = window.setTimeout(() => {
        searchAd(q);
        window.clearTimeout(timeout.current);
      }, 500);
    },
    [searchAd],
  );
  const filteredAds = useMemo(
    () =>
      ads.filter(
        (a) =>
          a.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          a.url.indexOf(query.toLowerCase()) !== -1,
      ),
    [ads, query],
  );
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
      setSelectedAd(ad);
      setMethod('edit');
      message.current = translate('successCreate', l);
    } else if (ad && isDownloading.current && status !== 'loading') {
      isDownloading.current = false;
      message.current = translate('successEdit', l);
      setSelectedAd(ad);
    } else if (ad && isDeleting.current && status !== 'loading') {
      isDeleting.current = false;
      message.current = translate('successDelete', l);
      setSelectedAd(undefined);
    }
  }, [adminElemId, getAd, method, status, ad, adminMethod, l]);
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

  const onEdit = useCallback(
    (adPatch: AdPatch) => {
      if (selectedAd) {
        const patch: AdPatch = {};
        if (selectedAd.name !== adPatch.name) patch.name = adPatch.name;
        if (selectedAd.url !== adPatch.url) patch.url = adPatch.url;
        if (adPatch.color !== selectedAd.color) patch.color = adPatch.color;
        if (adPatch.paused !== selectedAd.paused) patch.paused = adPatch.paused;
        if (adPatch.stop !== selectedAd.stop) patch.stop = adPatch.stop;
        if (adPatch.position !== selectedAd.position)
          patch.position = adPatch.position;
        if (adPatch.fileDesktopId !== selectedAd.fileDesktop.id)
          patch.fileDesktopId = adPatch.fileDesktopId;
        if (adPatch.fileMobileId !== selectedAd.fileMobile.id)
          patch.fileMobileId = adPatch.fileDesktopId;
        if (adPatch.priority !== selectedAd.priority)
          patch.priority = adPatch.priority;
        if (adPatch.start !== selectedAd.start) patch.start = adPatch.start;
        isDownloading.current = true;
        patchAd(selectedAd.id, patch);
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
      isDeleting.current = true;
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
          items={filteredAds}
          searching={searching}
        />
        {selectedAd && (
          <>
            <div className="options">
              <Button color="primary" onClick={toggleEdit}>
                {translate('editAd', l)}
              </Button>
              <Button color="danger" onClick={toggleDelete}>
                {translate('deleteAd', l)}
              </Button>
            </div>
            {selectedOutSummary && (
              <Row className="mt-2">
                <Col xs={12}>
                  <span>{`${selectedOutSummary.sum} Clicks`}</span>
                </Col>
              </Row>
            )}
          </>
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
