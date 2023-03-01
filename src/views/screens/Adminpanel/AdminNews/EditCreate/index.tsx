import React, { useCallback, useContext, useRef, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import {
  Blog,
  BlogCreate,
  File,
  ImageTypeEnum,
} from '../../../../../client/api';
import { translate } from '../../../../../config/translator';
import TextInput from '../../TextInput';
import FileInput, { ClavaFile } from '../../FileInput';
import { generatePW, getBiggest } from '../../../../../config/utils';
import { ClavaContext } from '../../../../../config/contexts';
import client from '../../../../../client';

type EditCreateProps =
  | {
      selectedNews: undefined;
      onSubmit: (badge: BlogCreate) => void;
    }
  | {
      selectedNews: Blog;
      onSubmit: (badge: BlogCreate) => void;
    };

const EditCreateNews: React.FC<EditCreateProps> = ({
  selectedNews,
  onSubmit,
}) => {
  const { l } = useContext(ClavaContext);

  const [titleDE, setTitleDE] = useState(selectedNews?.title.textDE ?? '');
  const [titleIT, setTitleIT] = useState(selectedNews?.title.textIT ?? '');
  const [titleEN, setTitleEN] = useState(selectedNews?.title.textEN ?? '');
  const [summaryDE, setSummaryDE] = useState(
    selectedNews?.summary?.textDE ?? '',
  );
  const [summaryIT, setSummaryIT] = useState(
    selectedNews?.summary?.textIT ?? '',
  );
  const [summaryEN, setSummaryEN] = useState(
    selectedNews?.summary?.textEN ?? '',
  );
  const [bodyDE, setBodyDE] = useState(selectedNews?.body.textDE ?? '');
  const [bodyIT, setBodyIT] = useState(selectedNews?.body.textIT ?? '');
  const [bodyEN, setBodyEN] = useState(selectedNews?.body.textEN ?? '');
  const [link, setLink] = useState(selectedNews?.link ?? '');
  const [uid, setUid] = useState(generatePW(32, false));

  const [image, setImage] = useState<File | undefined>(selectedNews?.picture);

  const progressTarget = useRef<number>(-1);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState<string>();

  const onSubmitCont = useCallback(() => {
    if (image)
      onSubmit({
        title: {
          textEN: titleEN,
          textIT: titleIT,
          textDE: titleDE,
        },
        summary: {
          textEN: summaryEN,
          textIT: summaryIT,
          textDE: summaryDE,
        },
        body: {
          textEN: bodyEN,
          textIT: bodyIT,
          textDE: bodyDE,
        },
        pictureId: image.id,
        link,
        uid,
      });
  }, [
    image,
    onSubmit,
    titleEN,
    titleIT,
    titleDE,
    summaryEN,
    summaryIT,
    summaryDE,
    bodyEN,
    bodyIT,
    bodyDE,
    link,
    uid,
  ]);
  const onSetImage = useCallback(
    (file: ClavaFile | undefined) => {
      if (file) {
        progressTarget.current = 0;
        client()
          .uploadFile(
            file,
            ImageTypeEnum.BLOG_PHOTO,
            `News ${titleDE}`,
            (p) => {
              setFileUploadProgress(Math.round((p.loaded * 100) / p.total));
            },
          )
          .then(
            (data) => {
              if (data) {
                setImage(data);
              } else {
                setFileUploadError(translate('uploadError', l));
              }
            },
            (error) => {
              setFileUploadError(error);
            },
          );
      } else {
        setImage(undefined);
      }
    },
    [l, titleDE],
  );

  return (
    <>
      <TextInput
        value={titleDE}
        onChange={setTitleDE}
        name="titleDE"
        label="titleDE"
      />
      <TextInput
        value={titleIT}
        onChange={setTitleIT}
        name="titleIT"
        label="titleIT"
      />
      <TextInput
        value={titleEN}
        onChange={setTitleEN}
        name="titleEN"
        label="titleEN"
      />
      <TextInput
        value={summaryDE}
        onChange={setSummaryDE}
        name="summaryDE"
        label="summaryDE"
      />
      <TextInput
        value={summaryIT}
        onChange={setSummaryIT}
        name="summaryIT"
        label="summaryIT"
      />
      <TextInput
        value={summaryEN}
        onChange={setSummaryEN}
        name="summaryEN"
        label="summaryEN"
      />
      <TextInput
        value={bodyDE}
        onChange={setBodyDE}
        name="bodyDE"
        label="bodyDE"
      />
      <TextInput
        value={bodyIT}
        onChange={setBodyIT}
        name="bodyIT"
        label="bodyIT"
      />
      <TextInput
        value={bodyEN}
        onChange={setBodyEN}
        name="bodyEN"
        label="bodyEN"
      />
      <Row>
        <Col xs={12} md={6}>
          <TextInput label="link" onChange={setLink} value={link} name="link" />
        </Col>

        <Col xs={12} md={6}>
          <TextInput label="uid" onChange={setUid} value={uid} name="uid" />
        </Col>
      </Row>
      {fileUploadError && (
        <span className="text-danger">{fileUploadError}</span>
      )}
      <FileInput
        name="picture"
        onChange={onSetImage}
        progress={progressTarget.current === 0 ? fileUploadProgress : 0}
        preview={getBiggest(image)}
      />
      <Button color="primary" onClick={onSubmitCont}>
        {translate('submit', l)}
      </Button>
    </>
  );
};

export default EditCreateNews;
