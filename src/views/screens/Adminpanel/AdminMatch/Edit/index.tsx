import { Button } from 'reactstrap';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { ConnectedProps } from 'react-redux';
import SearchInput from '../../SearchInput';
import TextInput from '../../TextInput';
import { showTranslated, translate } from '../../../../../config/translator';
import { formatDate, getMatchDate } from '../../../../../config/utils';
import { Location } from '../../../../../client/api';
import { connector } from './redux';
import { ClavaContext } from '../../../../../config/contexts';
import DateInput from '../../DateInput';
import CheckboxInput from '../../CheckboxInput';

const AdminEditMatch: React.FC<ConnectedProps<typeof connector>> = ({
  searching,
  locations,
  patchMatch,
  searchLocation,
  selectedMatch,
}) => {
  const { l } = useContext(ClavaContext);
  const [queryLocation, setQueryLocation] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<
    Location | undefined
  >(selectedMatch.location);
  const [date, setDate] = useState<Date>(getMatchDate(selectedMatch));
  const [cancelled, setCancelled] = useState<boolean>(selectedMatch.cancelled);
  const [matchDay, setMatchDay] = useState<number>(selectedMatch.matchDay);
  const timeout = useRef<number>(-1);

  const onSearchLocation = useCallback(
    (q: string) => {
      if (timeout.current !== -1) {
        window.clearTimeout(timeout.current);
      }
      setQueryLocation(q);
      window.setTimeout(() => {
        searchLocation(q);
      }, 100);
    },
    [searchLocation],
  );
  const onEdit = useCallback(() => {
    if (cancelled) patchMatch(selectedMatch.id, { cancelled });
    else
      patchMatch(selectedMatch.id, {
        cancelled,
        startTime: formatDate(date, l, true),
        locationId: selectedLocation?.id ?? selectedMatch.location?.id,
      });
  }, [
    patchMatch,
    selectedMatch.id,
    selectedMatch.location?.id,
    cancelled,
    date,
    l,
    selectedLocation?.id,
  ]);
  return (
    <>
      <h5 className="text-primary">
        {showTranslated(selectedMatch.team1.name, l)} vs.{' '}
        {showTranslated(selectedMatch.team2.name, l)} -{' '}
        {showTranslated(selectedMatch.league.name, l)}
      </h5>
      <CheckboxInput
        value={cancelled}
        onChange={setCancelled}
        name="cancelled"
        label="cancelMatch"
      />
      <DateInput
        value={date}
        disabled={cancelled}
        onChange={setDate}
        name="match-date"
        label="date"
        type="datetime"
      />
      <SearchInput
        value={queryLocation}
        disabled={cancelled}
        isFocused
        searching={searching}
        onChange={onSearchLocation}
        label="searchLocation"
        name="searchLocation"
        items={locations}
        onSelect={setSelectedLocation}
      />
      <TextInput
        label="matchDay"
        disabled={cancelled}
        onChange={setMatchDay}
        name="matchday"
        value={matchDay}
      />
      <Button color="primary" onClick={onEdit}>
        {translate('submit', l)}
      </Button>
    </>
  );
};

export default connector(AdminEditMatch);
// reload
