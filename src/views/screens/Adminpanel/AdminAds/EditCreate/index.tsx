import React, { useCallback, useContext, useRef, useState } from 'react';
import { Button, FormGroup, Label } from 'reactstrap';
import {
  Ad,
  AdCreate,
  AdPatch,
  AdPositionEnum,
  File,
  ImageTypeEnum,
} from '../../../../../client/api';
import { translate } from '../../../../../config/translator';
import ClavaPicker from '../../../../components/Form/ClavaPicker';
import DateInput from '../../DateInput';
import CheckboxInput from '../../CheckboxInput';
import TextInput from '../../TextInput';
import FileInput, { ClavaFile } from '../../FileInput';
import { formatDate, getBiggest } from '../../../../../config/utils';
import { ClavaContext } from '../../../../../config/contexts';
import client from '../../../../../client';

type EditCreateProps =
  | {
      selectedAd: undefined;
      onSubmit: (ad: AdCreate) => void;
    }
  | {
      selectedAd: Ad;
      onSubmit: (ad: AdPatch) => void;
    };

const EditCreateAd: React.FC<EditCreateProps> = ({ selectedAd, onSubmit }) => {
  const { l } = useContext(ClavaContext);
  const [name, setName] = useState(selectedAd?.name ?? '');
  const [color, setColor] = useState<string>(selectedAd?.color ?? '');
  const [position, setPosition] = useState<AdPositionEnum>(
    selectedAd?.position ?? AdPositionEnum.HOME_MATCH,
  );
  const [priority, setPriority] = useState(selectedAd?.priority ?? 1);
  const [url, setUrl] = useState(selectedAd?.url ?? '');
  const [start, setStart] = useState<Date>(
    new Date(selectedAd?.start ?? new Date().getTime()),
  );
  const [stop, setStop] = useState<Date>(
    new Date(selectedAd?.stop ?? new Date().getTime()),
  );
  const [paused, setPaused] = useState<boolean>(selectedAd?.paused ?? false);
  const [fileMobile, setFileMobile] = useState<File | undefined>(
    selectedAd?.fileMobile,
  );
  const [fileDesktop, setFileDesktop] = useState<File | undefined>(
    selectedAd?.fileDesktop,
  );
  const progressTarget = useRef<number>(-1);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState<string>();
  const [useSameFile, setUseSameFile] = useState(false);

  const setPositionCont = useCallback((val: string) => {
    setPosition(val as AdPositionEnum);
  }, []);

  const onSubmitCont = useCallback(() => {
    if (fileMobile && (useSameFile || fileDesktop))
      onSubmit({
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
    color,
    fileDesktop,
    fileMobile,
    l,
    name,
    onSubmit,
    paused,
    position,
    priority,
    start,
    stop,
    url,
    useSameFile,
  ]);
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
        setFileDesktop(undefined);
      }
    },
    [l, name, position],
  );
  return (
    <>
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
      <TextInput value={color} onChange={setColor} name="color" label="color" />
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
      <Button color="primary" onClick={onSubmitCont}>
        {translate('submit', l)}
      </Button>
    </>
  );
};

export default EditCreateAd;
