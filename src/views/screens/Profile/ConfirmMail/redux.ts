import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { confirmMail, pwReset } from '../../../../store/actions/userActions';
import { performAction } from '../../../../store/actions/all';
import { RootState } from '../../../../store';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  confirmMail: (code: string) => {
    performAction({ f: confirmMail, p: [dispatch, code] });
  },
  pwReset: (password: string, passwordRepeat: string, hash: string) => {
    performAction({
      f: pwReset,
      p: [dispatch, password, passwordRepeat, hash],
    });
  },
});

const props = (state: RootState) => ({
  registerStatus: state.user.registerStatus,
  user: state.user.value,
});

export const connector = connect(props, mapper);
