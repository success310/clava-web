import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../store';
import { IDType } from '../../../config/types';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getNewInsiders: (userId: IDType) => {
    // nothing
  },
});

const props = (state: RootState) => ({
  user: state.user.value,
  newInsiders: state.user.values,
});

export const connector = connect(props, mapper);
