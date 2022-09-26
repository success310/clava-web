import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { performAction } from '../../../store/actions/all';
import { login } from '../../../store/actions/userActions';
import { RootState } from '../../../store';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  login: (email: string, password: string) => {
    performAction({ f: login, p: [dispatch, email, password] });
  },
});

const props = (state: RootState) => ({
  user: state.user.value,
});

export const connector = connect(props, mapper);
