import { Button, Col, Row } from 'reactstrap';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { ConnectedProps } from 'react-redux';
import SearchInput from '../../SearchInput';
import TextInput from '../../TextInput';
import { showTranslated, translate } from '../../../../../config/translator';
import {
  formatDate,
  getGoalEvents,
  getMatchDate,
  matchStatus,
} from '../../../../../config/utils';
import { Location } from '../../../../../client/api';
import { connector } from './redux';
import { ClavaContext } from '../../../../../config/contexts';
import DateInput from '../../DateInput';
import CheckboxInput from '../../CheckboxInput';

const AdminEditMatch: React.FC<ConnectedProps<typeof connector>> = ({
  searching,
  locations,
  patchMatch,
  addGoal,
  deleteGoal,
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
  const [goal1, setGoal1] = useState<number>(selectedMatch.goal1);
  const [goal2, setGoal2] = useState<number>(selectedMatch.goal2);
  const timeout = useRef<number>(-1);

  const onSearchLocation = useCallback(
    (q: string) => {
      if (timeout.current !== -1) {
        window.clearTimeout(timeout.current);
      }
      setQueryLocation(q);
      timeout.current = window.setTimeout(() => {
        searchLocation(q);
      }, 100);
    },
    [searchLocation],
  );
  const onEdit = useCallback(() => {
    if (cancelled) patchMatch(selectedMatch.id, { cancelled });
    else {
      if (
        date.getTime() !== getMatchDate(selectedMatch).getTime() ||
        cancelled !== selectedMatch.cancelled ||
        matchDay !== selectedMatch.matchDay ||
        selectedLocation?.id !== selectedMatch.location?.id
      ) {
        patchMatch(selectedMatch.id, {
          cancelled,
          startTime: formatDate(date, l, true),
          locationId: selectedLocation?.id ?? selectedMatch.location?.id,
          matchDay,
        });
      }
      if (goal1 !== selectedMatch.goal1) {
        if (goal1 > selectedMatch.goal1) {
          for (let i = selectedMatch.goal1; i < goal1; i++) {
            addGoal(
              selectedMatch.id,
              selectedMatch.team1.id,
              i + 1,
              selectedMatch.goal2,
            );
          }
        } else {
          const goalEvents = getGoalEvents(
            selectedMatch.events,
            selectedMatch.team1.id,
          );
          for (let i = 1; i <= selectedMatch.goal1 - goal1; i++) {
            deleteGoal(goalEvents[goalEvents.length - i].id, selectedMatch.id);
          }
        }
      }
      if (goal2 !== selectedMatch.goal2) {
        if (goal2 > selectedMatch.goal2) {
          for (let i = selectedMatch.goal2; i < goal2; i++) {
            addGoal(
              selectedMatch.id,
              selectedMatch.team2.id,
              selectedMatch.goal1,
              i + 1,
            );
          }
        } else {
          const goalEvents = getGoalEvents(
            selectedMatch.events,
            selectedMatch.team2.id,
          );
          for (let i = 1; i <= selectedMatch.goal2 - goal2; i++) {
            deleteGoal(goalEvents[goalEvents.length - i].id, selectedMatch.id);
          }
        }
      }
    }
  }, [
    cancelled,
    patchMatch,
    selectedMatch,
    date,
    matchDay,
    selectedLocation?.id,
    goal1,
    goal2,
    l,
    addGoal,
    deleteGoal,
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
        changed={matchDay !== selectedMatch.matchDay}
        onChange={setMatchDay}
        name="matchday"
        value={matchDay}
      />
      {matchStatus(selectedMatch) && (
        <>
          <h6>{translate('changeOutcome', l)}</h6>
          <p>{translate('changeOutcomeCont', l)}</p>
          <Row>
            <Col xs={5}>
              <TextInput
                label="goal1"
                onChange={setGoal1}
                name="goal1"
                changed={goal1 !== selectedMatch.goal1}
                value={goal1}
              />
            </Col>
            <Col xs={2}>
              <span> - </span>
            </Col>
            <Col xs={5}>
              <TextInput
                label="goal2"
                onChange={setGoal2}
                name="goal2"
                changed={goal2 !== selectedMatch.goal2}
                value={goal2}
              />
            </Col>
          </Row>
        </>
      )}
      <Button color="primary" onClick={onEdit}>
        {translate('submit', l)}
      </Button>
    </>
  );
};

export default connector(AdminEditMatch);
// reload
