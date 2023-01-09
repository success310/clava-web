import React, { useCallback, useContext, useState } from 'react';
import { Button, FormGroup, Label } from 'reactstrap';
import {
  AreaOfInterest,
  League,
  LeagueCategoryEnum,
  LeagueCreate,
  LeaguePatch,
  LeagueRatingEnum,
} from '../../../../../client/api';
import { translate } from '../../../../../config/translator';
import ClavaPicker from '../../../../components/Form/ClavaPicker';
import CheckboxInput from '../../CheckboxInput';
import TextInput from '../../TextInput';
import { ClavaContext } from '../../../../../config/contexts';
import { IDType } from '../../../../../config/types';

type EditCreateLeagueProps =
  | {
      aois: AreaOfInterest[];
      selectedLeague: undefined;
      onSubmit: (league: LeagueCreate) => void;
    }
  | {
      aois: AreaOfInterest[];
      selectedLeague: League;
      onSubmit: (league: LeaguePatch) => void;
    };

const EditCreateLeague: React.FC<EditCreateLeagueProps> = ({
  selectedLeague,
  onSubmit,
  aois,
}) => {
  const { l } = useContext(ClavaContext);
  const [textDE, setTextDE] = useState(selectedLeague?.name.textDE ?? '');
  const [textIT, setTextIT] = useState(selectedLeague?.name.textIT ?? '');
  const [textEN, setTextEN] = useState(selectedLeague?.name.textEN ?? '');
  const [category, setCategory] = useState<LeagueCategoryEnum>(
    selectedLeague?.category ?? LeagueCategoryEnum.LEAGUE,
  );
  const [tableRating, setTableRating] = useState<LeagueRatingEnum>(
    selectedLeague?.tableRating ?? LeagueRatingEnum.SOUTHTYROL,
  );
  const [matchDays, setMatchDays] = useState(selectedLeague?.matchDays ?? 1);
  const [main, setMain] = useState<boolean>(selectedLeague?.main ?? true);
  const [areaOfInterestIds, setAreaOfInterestIds] = useState<IDType[]>(
    selectedLeague?.areasOfInterest?.map((a) => a.id) ?? [],
  );
  const [year, setYear] = useState(selectedLeague?.year ?? 2023);

  const onSubmitCont = useCallback(() => {
    if (areaOfInterestIds.length !== 0)
      onSubmit({
        name: {
          textEN,
          textIT,
          textDE,
        },
        year,
        category,
        main,
        tableRating,
        areaOfInterestIds,
        matchDays,
      });
  }, [
    areaOfInterestIds,
    category,
    main,
    matchDays,
    onSubmit,
    tableRating,
    textDE,
    textEN,
    textIT,
    year,
  ]);
  const setTableRatingCont = useCallback((val: string) => {
    setTableRating(val as LeagueRatingEnum);
  }, []);
  const setLeagueCategoryCont = useCallback((val: string) => {
    setCategory(val as LeagueCategoryEnum);
  }, []);
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
      <FormGroup>
        <Label>{translate('leagueCategory', l)}</Label>
        <ClavaPicker
          items={[
            {
              key: LeagueCategoryEnum.LEAGUE,
              label: translate(LeagueCategoryEnum.LEAGUE, l),
              value: LeagueCategoryEnum.LEAGUE,
            },
            {
              key: LeagueCategoryEnum.CUP,
              label: translate(LeagueCategoryEnum.CUP, l),
              value: LeagueCategoryEnum.CUP,
            },
            {
              key: LeagueCategoryEnum.YOUTH,
              label: translate(LeagueCategoryEnum.YOUTH, l),
              value: LeagueCategoryEnum.YOUTH,
            },
            {
              key: LeagueCategoryEnum.WOMEN,
              label: translate(LeagueCategoryEnum.WOMEN, l),
              value: LeagueCategoryEnum.WOMEN,
            },
          ]}
          value={category}
          onValueChange={setLeagueCategoryCont}
        />
      </FormGroup>
      <FormGroup>
        <Label>{translate('leagueRating', l)}</Label>
        <ClavaPicker
          items={[
            {
              key: LeagueRatingEnum.SOUTHTYROL,
              label: translate('southtyrol', l),
              value: LeagueRatingEnum.SOUTHTYROL,
            },
            {
              key: LeagueRatingEnum.TRENTINO,
              label: translate('trentino', l),
              value: LeagueRatingEnum.TRENTINO,
            },
          ]}
          value={tableRating}
          onValueChange={setTableRatingCont}
        />
      </FormGroup>
      <TextInput
        label="matchDay"
        onChange={setMatchDays}
        value={matchDays}
        name="matchDays"
      />
      <TextInput label="year" onChange={setYear} value={year} name="year" />
      <CheckboxInput
        label="mainLeague"
        onChange={setMain}
        value={main}
        name="mainLeague"
      />
      {aois.map((aoi) => (
        <CheckboxInput
          key={`aoi-checkbox-${aoi.id}`}
          label={aoi}
          onChange={(checked) => {
            setAreaOfInterestIds((aoiIds) =>
              aoiIds
                .filter((aoiID) => aoiID !== aoi.id)
                .concat(checked ? [aoi.id] : []),
            );
          }}
          name={`aoi${aoi.id}`}
          value={areaOfInterestIds.indexOf(aoi.id) !== -1}
        />
      ))}

      <Button color="primary" onClick={onSubmitCont}>
        {translate('submit', l)}
      </Button>
    </>
  );
};

export default EditCreateLeague;
// reload
