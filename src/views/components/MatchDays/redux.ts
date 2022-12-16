import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import { RootState } from '../../../store';
import { IDType } from '../../../config/types';
import { performAction } from '../../../store/actions/all';
import {
  fetchMatchDays,
  fetchMatchDaysOfLeague,
} from '../../../store/actions/matchActions';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getToday: (id: IDType, type: 'aoi' | 'league', date?: Date) => {
    if (type === 'aoi')
      performAction({
        f: fetchMatchDays,
        p: [dispatch, id, date || new Date(), 'today'],
      });
    else
      performAction({
        f: fetchMatchDaysOfLeague,
        p: [dispatch, id, date || new Date(), 'today'],
      });
  },
  getBigger: (id: IDType, date: Date, type: 'aoi' | 'league') => {
    if (type === 'aoi')
      performAction({ f: fetchMatchDays, p: [dispatch, id, date, 'bigger'] });
    else
      performAction({
        f: fetchMatchDaysOfLeague,
        p: [dispatch, id, date, 'bigger'],
      });
  },
  getSmaller: (id: IDType, date: Date, type: 'aoi' | 'league') => {
    if (type === 'aoi')
      performAction({ f: fetchMatchDays, p: [dispatch, id, date, 'smaller'] });
    else
      performAction({
        f: fetchMatchDaysOfLeague,
        p: [dispatch, id, date, 'smaller'],
      });
  },
  getMonth: (id: IDType, date: Date, type: 'aoi' | 'league') => {
    if (type === 'aoi')
      performAction({ f: fetchMatchDays, p: [dispatch, id, date, 'month'] });
    else
      performAction({
        f: fetchMatchDaysOfLeague,
        p: [dispatch, id, date, 'month'],
      });
  },
});

const props = (
  state: RootState,
  prevProps: {
    selectedDate: Date | undefined;
    setSelectedDate: (date: Date | undefined) => void;
    type: 'aoi' | 'league';
    id: IDType;
    shouldScroll: React.MutableRefObject<boolean>;
    disabled: boolean;
  },
) => {
  let matchDays: Date[] = [];
  if (prevProps.type === 'aoi') {
    return { matchDays: state.match.matchDays, ...prevProps };
  }
  const filtered = state.match.leagueMatchDays.filter(
    (m) => m.id === prevProps.id,
  );
  if (filtered.length) matchDays = filtered[0].response;

  return {
    matchDays: [...matchDays].sort((a, b) => a.getTime() - b.getTime()),
    ...prevProps,
  };
};

export const connector = connect(props, mapper);
// reload
