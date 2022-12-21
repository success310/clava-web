import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { UserActionTypes } from '../../../../store/actions/types';
import { RootState } from '../../../../store';
import { login, pwForgot } from '../../../../store/actions/userActions';
import { performAction } from '../../../../store/actions/all';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  login: (email: string, password: string) => {
    login(dispatch, email, password);
  },
  pwForgot: (email: string) => {
    performAction({ f: pwForgot, p: [dispatch, email] });
  },
  reset: () => {
    dispatch({ type: UserActionTypes.RESET_FORM });
  },
});

const props = (state: RootState) => ({
  user: state.user.value,
  loginStatus:
    state.user.error === 'credentials_wrong'
      ? 'pwWrong'
      : state.user.loginStatus,
});

export const connector = connect(props, mapper);
