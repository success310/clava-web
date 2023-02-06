import React, { useCallback, useContext, useRef, useState } from 'react';
import { Button, FormGroup, Label } from 'reactstrap';
import {
  Badge,
  BadgeCreate,
  BadgePatch,
  BadgeTypeEnum,
  File,
  ImageTypeEnum,
} from '../../../../../client/api';
import { translate } from '../../../../../config/translator';
import ClavaPicker from '../../../../components/Form/ClavaPicker';
import TextInput from '../../TextInput';
import FileInput, { ClavaFile } from '../../FileInput';
import { getBiggest } from '../../../../../config/utils';
import { ClavaContext } from '../../../../../config/contexts';
import client from '../../../../../client';

type EditCreateProps =
  | {
      selectedBadge: undefined;
      notAvailableTypes: BadgeTypeEnum[];
      onSubmit: (badge: BadgeCreate) => void;
    }
  | {
      selectedBadge: Badge;
      notAvailableTypes: BadgeTypeEnum[];
      onSubmit: (badge: BadgePatch) => void;
    };

const EditCreateBadge: React.FC<EditCreateProps> = ({
  selectedBadge,
  onSubmit,
  notAvailableTypes,
}) => {
  const { l } = useContext(ClavaContext);

  const [textDE, setTextDE] = useState(selectedBadge?.name.textDE ?? '');
  const [textIT, setTextIT] = useState(selectedBadge?.name.textIT ?? '');
  const [textEN, setTextEN] = useState(selectedBadge?.name.textEN ?? '');
  const [descriptionDE, setDescriptionDE] = useState(
    selectedBadge?.description.textDE ?? '',
  );
  const [descriptionIT, setDescriptionIT] = useState(
    selectedBadge?.description.textIT ?? '',
  );
  const [descriptionEN, setDescriptionEN] = useState(
    selectedBadge?.description.textEN ?? '',
  );

  const [badgeType, setBadgeType] = useState<BadgeTypeEnum>(
    selectedBadge?.badgeType ?? BadgeTypeEnum.ADMIN,
  );
  const [image, setImage] = useState<File | undefined>(selectedBadge?.media);

  const progressTarget = useRef<number>(-1);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState<string>();

  const setTypeCont = useCallback((val: string) => {
    setBadgeType(val as BadgeTypeEnum);
  }, []);

  const onSubmitCont = useCallback(() => {
    if (selectedBadge && image)
      onSubmit({
        name: {
          textEN,
          textIT,
          textDE,
        },
        description: {
          textEN: descriptionEN,
          textIT: descriptionIT,
          textDE: descriptionDE,
        },
        mediaId: image.id,
      });
    else if (
      !selectedBadge &&
      image &&
      notAvailableTypes.indexOf(badgeType) === -1
    )
      onSubmit({
        badgeType,
        mediaId: image.id,
        name: {
          textEN,
          textIT,
          textDE,
        },
        description: {
          textEN: descriptionEN,
          textIT: descriptionIT,
          textDE: descriptionDE,
        },
      });
  }, [
    selectedBadge,
    image,
    onSubmit,
    textEN,
    textIT,
    textDE,
    descriptionEN,
    descriptionIT,
    descriptionDE,
    notAvailableTypes,
    badgeType,
  ]);
  const onSetImage = useCallback(
    (file: ClavaFile | undefined) => {
      if (file) {
        progressTarget.current = 0;
        client()
          .uploadFile(file, ImageTypeEnum.BADGE, badgeType, (p) => {
            setFileUploadProgress(Math.round((p.loaded * 100) / p.total));
          })
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
    [l, badgeType],
  );

  return (
    <>
      <TextInput
        value={textDE}
        onChange={setTextDE}
        name="nameDE"
        label="nameDE"
      />
      <TextInput
        value={textIT}
        onChange={setTextIT}
        name="nameIT"
        label="nameIT"
      />
      <TextInput
        value={textEN}
        onChange={setTextEN}
        name="nameEN"
        label="nameEN"
      />
      <TextInput
        value={descriptionDE}
        onChange={setDescriptionDE}
        name="descriptionDE"
        label="descriptionDE"
      />
      <TextInput
        value={descriptionIT}
        onChange={setDescriptionIT}
        name="descriptionIT"
        label="descriptionIT"
      />
      <TextInput
        value={descriptionEN}
        onChange={setDescriptionEN}
        name="descriptionEN"
        label="descriptionEN"
      />
      <FormGroup>
        <Label>{translate('adPosition', l)}</Label>
        <ClavaPicker
          items={[
            {
              key: BadgeTypeEnum.ADMIN,
              label: 'ADMIN',
              value: BadgeTypeEnum.ADMIN,
            },
            {
              key: BadgeTypeEnum.PLAYER,
              label: 'PLAYER',
              value: BadgeTypeEnum.PLAYER,
            },
            {
              key: BadgeTypeEnum.CONTENT_CREATOR,
              label: 'CONTENT_CREATOR',
              value: BadgeTypeEnum.CONTENT_CREATOR,
            },
            {
              key: BadgeTypeEnum.TOTW,
              label: 'Team of the Week',
              value: BadgeTypeEnum.TOTW,
            },
            {
              key: BadgeTypeEnum.MOST_GOALS,
              label: 'MOST_GOALS',
              value: BadgeTypeEnum.MOST_GOALS,
            },
            {
              key: BadgeTypeEnum.PREMIUM,
              label: 'PREMIUM',
              value: BadgeTypeEnum.PREMIUM,
            },
            {
              key: BadgeTypeEnum.INSIDER_LVL_1,
              label: 'INSIDER Bronze',
              value: BadgeTypeEnum.INSIDER_LVL_1,
            },
            {
              key: BadgeTypeEnum.INSIDER_LVL_2,
              label: 'INSIDER Silver',
              value: BadgeTypeEnum.INSIDER_LVL_2,
            },
            {
              key: BadgeTypeEnum.INSIDER_LVL_3,
              label: 'INSIDER Gold',
              value: BadgeTypeEnum.INSIDER_LVL_3,
            },
            {
              key: BadgeTypeEnum.INSIDER_LVL_4,
              label: 'INSIDER Platin',
              value: BadgeTypeEnum.INSIDER_LVL_4,
            },
            {
              key: BadgeTypeEnum.PLAYER_RETIRED,
              label: 'PLAYER_RETIRED',
              value: BadgeTypeEnum.PLAYER_RETIRED,
            },
          ]}
          value={badgeType}
          onValueChange={setTypeCont}
        />
      </FormGroup>
      {fileUploadError && (
        <span className="text-danger">{fileUploadError}</span>
      )}
      <FileInput
        name="fileMobile"
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

export default EditCreateBadge;
