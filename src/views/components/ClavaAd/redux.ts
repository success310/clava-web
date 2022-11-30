import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { performAction } from '../../../store/actions/all';
import { AdPositionEnum } from '../../../client/api';
import { numberedHash } from '../../../config/utils';
import { RootState } from '../../../store';
import { fetchByPos } from '../../../store/actions/adActions';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getAds: (pos: AdPositionEnum) => {
    performAction({ f: fetchByPos, p: [dispatch, pos] });
  },
});

const props = (
  state: RootState,
  prevProps: {
    type: AdPositionEnum;
    priority?: boolean;
  },
) => ({
  ads:
    state.ads.value.find((a) => a.id === numberedHash(prevProps.type))
      ?.response ?? [],
  ...prevProps,
});

export const connector = connect(props, mapper);
