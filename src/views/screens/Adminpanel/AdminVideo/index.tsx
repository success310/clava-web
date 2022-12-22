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
import TextInput from '../TextInput';
import SearchInput from '../SearchInput';
import { ExternalVideo } from '../../../../client/api';
import DateInput from '../DateInput';
import { formatDate } from '../../../../config/utils';
import ClavaSwitch from '../../../components/Form/ClavaSwitch';
import { IDType } from '../../../../config/types';

const AdminpanelVideo: React.FC<ConnectedProps<typeof connector>> = ({
  video,
  videos,
  patchVideo,
  getVideo,
  aois,
  getAois,
  createVideo,
  status,
  searching,
  deleteVideo,
  searchVideo,
}) => {
  const { l } = useContext(ClavaContext);
  const { adminMethod, adminElemId } = useParams();
  const [method, setMethod] = useState<string>(adminMethod ?? 'search');
  const [query, setQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<ExternalVideo>();
  const [title, setTitle] = useState('');
  const [length, setLength] = useState('');
  const [selectedAoi, setSelectedAoi] = useState<IDType>(1);
  const [summary, setSummary] = useState('');
  const [url, setUrl] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const timeout = useRef<number>(-1);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  useEffect(() => {
    if (aois.length === 0) getAois();
  }, [aois]);
  useEffect(() => {
    if (
      adminElemId &&
      !Number.isNaN(parseInt(adminElemId, 10)) &&
      status === 'idle'
    ) {
      if (!video) getVideo(parseInt(adminElemId, 10));
      if (video) {
        if (adminMethod === 'edit') {
          setTitle(video.name.textDE);
          setSummary(video.summary.textDE);
          setSelectedAoi(video.areasOfInterest[0].id);
          setUrl(video.url);
          setLength(video.length);
          setDate(new Date(video.date));
          setThumbnailUrl(video.thumbnail.url);
        }
        setSelectedVideo(video);
      }
    } else if (adminMethod === 'edit' && status !== 'loading') {
      setMethod('search');
    }
  }, [adminElemId, getVideo, method, status, video]);
  const reset = useCallback(() => {
    setSelectedVideo(undefined);
    setTitle('');
    setSummary('');
    setSelectedAoi(1);
    setUrl('');
    setDate(new Date());
    setThumbnailUrl('');
    setLength('');
  }, []);
  const toggleCreate = useCallback(() => {
    reset();
    setMethod((m) => (m === 'create' ? 'search' : 'create'));
  }, [reset]);
  const toggleSearch = useCallback(() => {
    setMethod('search');
  }, []);
  const toggleEdit = useCallback(() => {
    if (selectedVideo) {
      setTitle(selectedVideo.name.textDE);
      setSummary(selectedVideo.summary.textDE);
      setSelectedAoi(selectedVideo.areasOfInterest[0].id);
      setUrl(selectedVideo.url);
      setLength(selectedVideo.length);
      setDate(new Date(selectedVideo.date));
      setThumbnailUrl(selectedVideo.thumbnail.url);
      setMethod((m) => (m === 'edit' ? 'search' : 'edit'));
    } else {
      reset();
      setMethod('search');
    }
  }, [reset, selectedVideo]);
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
        searchVideo(q);
      }, 100);
    },
    [searchVideo],
  );
  const onEdit = useCallback(() => {
    if (selectedVideo) {
      patchVideo(selectedVideo.id);
    }
  }, [patchVideo, selectedVideo]);
  const onCreate = useCallback(() => {
    createVideo({
      url,
      date: formatDate(date, l, true, false, true),
      name: title,
      summary,
      length,
      thumbnailUrl,
      areasOfInterestIds: [selectedAoi],
    });
  }, [
    createVideo,
    date,
    l,
    length,
    selectedAoi,
    summary,
    thumbnailUrl,
    title,
    url,
  ]);
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
          label="searchVideo"
          onSelect={setSelectedVideo}
          items={videos}
          searching={searching}
        />
        {selectedVideo && (
          <div className="options">
            <Button color="primary" onClick={toggleEdit}>
              {translate('editVideo', l)}
            </Button>
            <Button color="danger" onClick={toggleDelete}>
              {translate('deleteVideo', l)}
            </Button>
          </div>
        )}
      </fieldset>
      <fieldset className={`form ${method === 'create' ? 'open' : 'close'}`}>
        <button className="form-toggler" onClick={toggleCreate} type="button">
          <h6>{translate('createVideo', l)}</h6>
          <FontAwesomeIcon
            icon={method === 'create' ? faChevronUp : faChevronDown}
          />
        </button>
        {aois.length !== 0 && (
          <ClavaSwitch
            items={aois.map((aoi) => ({
              label: showTranslated(aoi.name, l),
              value: aoi.id,
            }))}
            value={selectedAoi}
            onChange={setSelectedAoi}
          />
        )}
        <TextInput
          value={title}
          onChange={setTitle}
          name="title"
          label="title"
        />
        <TextInput
          value={summary}
          onChange={setSummary}
          name="summary"
          label="summary"
          multiline
        />
        <TextInput
          value={length}
          onChange={setLength}
          name="length"
          label="length"
        />
        <DateInput
          value={date}
          onChange={setDate}
          name="date"
          label="date"
          type="date"
        />
        <TextInput value={url} onChange={setUrl} name="url" label="url" />
        <TextInput
          value={thumbnailUrl}
          onChange={setThumbnailUrl}
          name="thumbnailUrl"
          label="thumbnailUrl"
        />
        <Button color="primary" onClick={onCreate}>
          {translate('submit', l)}
        </Button>
      </fieldset>
      <fieldset
        className={`form ${selectedVideo ? '' : 'disabled'} ${
          method === 'edit' ? 'open' : 'close'
        }`}>
        <button className="form-toggler" onClick={toggleEdit} type="button">
          <h6>
            {translate('editVideo', l) +
              (selectedVideo ? ` [${selectedVideo.id}]` : '')}
          </h6>
          <FontAwesomeIcon
            icon={method === 'edit' ? faChevronUp : faChevronDown}
          />
        </button>

        {aois.length !== 0 && (
          <ClavaSwitch
            items={aois.map((aoi) => ({
              label: showTranslated(aoi.name, l),
              value: aoi.id,
            }))}
            value={selectedAoi}
            onChange={setSelectedAoi}
          />
        )}
        <TextInput
          value={title}
          onChange={setTitle}
          name="title"
          label="title"
        />
        <TextInput
          value={summary}
          onChange={setSummary}
          name="summary"
          label="summary"
          multiline
        />
        <TextInput
          value={length}
          onChange={setLength}
          name="length"
          label="length"
        />
        <DateInput
          value={date}
          onChange={setDate}
          name="date"
          label="date"
          type="date"
        />
        <TextInput value={url} onChange={setUrl} name="url" label="url" />
        <TextInput
          value={thumbnailUrl}
          onChange={setThumbnailUrl}
          name="thumbnailUrl"
          label="thumbnailUrl"
        />
        {/*        <FileInput
          preview={thumbnail?.url ?? faVideo}
          onChange={setThumbnail}
          name="url"
        />*/}
        <Button color="primary" onClick={onEdit}>
          {translate('submit', l)}
        </Button>
      </fieldset>
    </div>
  );
};

export default connector(AdminpanelVideo);
// r el
