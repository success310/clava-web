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
import { Button, FormGroup, Label } from 'reactstrap';
import { ClavaContext } from '../../../../config/contexts';
import { translate } from '../../../../config/translator';
import { connector } from './redux';
import TextInput from '../TextInput';
import SearchInput from '../SearchInput';
import {
  Ad,
  AdPositionEnum,
  File,
  ImageTypeEnum,
} from '../../../../client/api';
import DateInput from '../DateInput';
import { formatDate, getBiggest } from '../../../../config/utils';
import ClavaPicker from '../../../components/Form/ClavaPicker';
import CheckboxInput from '../CheckboxInput';
import FileInput, { ClavaFile } from '../FileInput';
import client from '../../../../client';

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
  const [name, setName] = useState('');
  const [color, setColor] = useState<string>('');
  const [position, setPosition] = useState<AdPositionEnum>(
    AdPositionEnum.HOME_MATCH,
  );
  const [priority, setPriority] = useState(1);
  const [url, setUrl] = useState('');
  const [start, setStart] = useState<Date>(new Date());
  const [stop, setStop] = useState<Date>(new Date());
  const [paused, setPaused] = useState<boolean>(false);
  const [fileMobile, setFileMobile] = useState<File>();
  const [fileDesktop, setFileDesktop] = useState<File>();
  const progressTarget = useRef<number>(-1);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState<string>();
  const [useSameFile, setUseSameFile] = useState(false);
  const timeout = useRef<number>(-1);

  useEffect(() => {
    if (
      adminElemId &&
      !Number.isNaN(parseInt(adminElemId, 10)) &&
      status === 'idle'
    ) {
      if (!ad) getAd(parseInt(adminElemId, 10));
      if (ad) {
        if (adminMethod === 'edit') {
          setName(ad.name);
          setColor(ad.color ?? '');
          setPriority(ad.priority);
          setUrl(ad.url);
          setPosition(ad.position);
          setStart(new Date(ad.start));
          setStop(new Date(ad.stop));
          setPaused(ad.paused ?? false);
          setFileMobile(ad.fileMobile);
          setFileDesktop(ad.fileDesktop);
        }
        setSelectedAd(ad);
      }
    } else if (adminMethod === 'edit' && status !== 'loading') {
      setMethod('search');
    }
  }, [adminElemId, getAd, method, status, ad, adminMethod]);
  const reset = useCallback(() => {
    setSelectedAd(undefined);
    setName('');
    setColor('');
    setPriority(1);
    setUrl('');
    setPosition(AdPositionEnum.HOME_MATCH);
    setStart(new Date());
    setStop(new Date());
    setPaused(false);
    setFileMobile(undefined);
    setFileDesktop(undefined);
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
      setName(selectedAd.name);
      setColor(selectedAd.color ?? '');
      setPriority(selectedAd.priority);
      setUrl(selectedAd.url);
      setPosition(selectedAd.position);
      setStart(new Date(selectedAd.start));
      setStop(new Date(selectedAd.stop));
      setPaused(selectedAd.paused ?? false);
      setFileMobile(selectedAd.fileMobile);
      setFileDesktop(selectedAd.fileDesktop);
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
      window.setTimeout(() => {
        searchAd(q);
      }, 100);
    },
    [searchAd],
  );
  const onEdit = useCallback(() => {
    if (selectedAd && fileMobile && (useSameFile || fileDesktop)) {
      patchAd(selectedAd.id, {
        paused,
        start: formatDate(start, l, true),
        stop: formatDate(stop, l, true),
        name,
        priority,
        fileDesktopId: fileDesktop
          ? fileDesktop.id.toString(10)
          : fileMobile.id.toString(10),
        position,
        fileMobileId: fileMobile.id.toString(10),
        url,
        color,
      });
    }
  }, [
    color,
    fileDesktop,
    fileMobile,
    l,
    name,
    patchAd,
    paused,
    position,
    priority,
    selectedAd,
    start,
    stop,
    url,
    useSameFile,
  ]);
  const onCreate = useCallback(() => {
    if (fileMobile && (useSameFile || fileDesktop))
      createAd({
        url,
        start: formatDate(start, l, true),
        stop: formatDate(stop, l, true),
        name,
        priority,
        position,
        fileMobileId: fileMobile.id,
        fileDesktopId: fileDesktop ? fileDesktop.id : fileMobile.id,
        color,
        paused,
      });
  }, [
    fileMobile,
    useSameFile,
    fileDesktop,
    createAd,
    url,
    start,
    l,
    stop,
    name,
    priority,
    position,
    color,
    paused,
  ]);
  const setPositionCont = useCallback((val: string) => {
    setPosition(val as AdPositionEnum);
  }, []);

  const onSetFileMobile = useCallback(
    (file: ClavaFile | undefined) => {
      if (file) {
        progressTarget.current = 0;
        client()
          .uploadFile(
            file,
            position === AdPositionEnum.HOME_MATCH ||
              position === AdPositionEnum.LEAGUE_MATCH_MATCH
              ? ImageTypeEnum.AD_MOBILE_MEDIUM
              : ImageTypeEnum.AD_MOBILE_SMALL,
            name,
            (p) => {
              setFileUploadProgress(Math.round((p.loaded * 100) / p.total));
            },
          )
          .then(
            (data) => {
              if (data) {
                setFileMobile(data);
              } else {
                setFileUploadError(translate('uploadError', l));
              }
            },
            (error) => {
              setFileUploadError(error);
            },
          );
      } else {
        setFileMobile(undefined);
      }
    },
    [l, name, position],
  );
  const onSetFileDesktop = useCallback(
    (file: ClavaFile | undefined) => {
      if (file) {
        progressTarget.current = 1;
        client()
          .uploadFile(
            file,
            position === AdPositionEnum.HOME_MATCH ||
              position === AdPositionEnum.LEAGUE_MATCH_MATCH
              ? ImageTypeEnum.AD_MOBILE_MEDIUM
              : ImageTypeEnum.AD_MOBILE_SMALL,
            name,
            (p) => {
              setFileUploadProgress(Math.round((p.loaded * 100) / p.total));
            },
          )
          .then(
            (data) => {
              if (data) {
                setFileDesktop(data);
              } else {
                setFileUploadError(translate('uploadError', l));
              }
            },
            (error) => {
              setFileUploadError(error);
            },
          );
      } else {
        setFileMobile(undefined);
      }
    },
    [l, name, position],
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
        <TextInput value={name} onChange={setName} name="title" label="title" />

        <FormGroup>
          <Label>{translate('adPosition', l)}</Label>
          <ClavaPicker
            disabled={!!fileDesktop || !!fileMobile}
            items={[
              {
                key: AdPositionEnum.HOME_MATCH,
                label: translate('homeMatchAd', l),
                value: AdPositionEnum.HOME_MATCH,
              },
              {
                key: AdPositionEnum.MATCH_HISTORY_BOTTOM,
                label: translate('matchHistoryBottomAd', l),
                value: AdPositionEnum.MATCH_HISTORY_BOTTOM,
              },
              {
                key: AdPositionEnum.LEAGUE_MATCH_MATCH,
                label: translate('leagueMatchAd', l),
                value: AdPositionEnum.LEAGUE_MATCH_MATCH,
              },
            ]}
            disabledMsg={
              !!fileDesktop || !!fileMobile
                ? translate('deleteImageToChoose', l)
                : ''
            }
            value={position}
            onValueChange={setPositionCont}
          />
        </FormGroup>
        <DateInput
          label="startDate"
          onChange={setStart}
          value={start}
          name="startDate"
          type="datetime"
        />
        <DateInput
          label="stopDate"
          onChange={setStop}
          value={stop}
          name="stopDate"
          type="datetime"
        />
        <CheckboxInput
          label="paused"
          onChange={setPaused}
          name="priority"
          value={paused}
        />
        <TextInput value={url} onChange={setUrl} name="url" label="url" />
        <TextInput
          value={color}
          onChange={setColor}
          name="color"
          label="color"
        />
        <TextInput
          value={priority}
          onChange={setPriority}
          name="priority"
          label="priority"
          multiline
        />
        {fileUploadError && (
          <span className="text-danger">{fileUploadError}</span>
        )}
        <FileInput
          name="fileMobile"
          onChange={onSetFileMobile}
          progress={progressTarget.current === 0 ? fileUploadProgress : 0}
          preview={getBiggest(fileMobile)}
        />
        <CheckboxInput
          label="useSameFile"
          onChange={setUseSameFile}
          name="useSameFile"
          value={useSameFile}
        />
        {!useSameFile && (
          <FileInput
            name="fileDesktop"
            onChange={onSetFileDesktop}
            progress={progressTarget.current === 1 ? fileUploadProgress : 0}
            preview={getBiggest(fileDesktop)}
          />
        )}
        <Button color="primary" onClick={onCreate}>
          {translate('submit', l)}
        </Button>
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

        <Button color="primary" onClick={onEdit}>
          {translate('submit', l)}
        </Button>
      </fieldset>
    </div>
  );
};

export default connector(AdminpanelAds);
// relo
