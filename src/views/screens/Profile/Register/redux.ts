import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { registerPatch } from '../../../../store/actions/userActions';
import { UserActionTypes } from '../../../../store/actions/types';
import { RootState } from '../../../../store';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  submit: (
    givenName: string,
    familyName: string,
    email: string,
    password: string,
    passwordRepeat: string,
    tel: string,
    newsletter: boolean,
  ) => {
    registerPatch(
      dispatch,
      givenName,
      familyName,
      email,
      password,
      passwordRepeat,
      tel,
      newsletter,
    );
  },
  reset: () => {
    dispatch({ type: UserActionTypes.RESET_FORM });
  },
});

const props = (state: RootState) => ({
  user: state.user.value,
  registerStatus: state.user.registerStatus,
});

export const connector = connect(props, mapper);
