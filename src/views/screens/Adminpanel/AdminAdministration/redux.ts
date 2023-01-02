import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import { createTask } from '../../../../store/actions/adminActions';
import { TASK_TYPES } from '../../../../store/actions/types';
import { performAction } from '../../../../store/actions/all';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  createTask: (key: string, type: TASK_TYPES) => {
    performAction({ f: createTask, p: [dispatch, key, type] });
  },
});

const props = (state: RootState) => ({
  status: state.admin.status,
});

export const connector = connect(props, mapper);
