import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../store';
import {
  changeUsername,
  deleteAccount,
  logout,
} from '../../../store/actions/userActions';
import { performAction } from '../../../store/actions/all';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  changeUsername: (username: string) => {
    performAction({ f: changeUsername, p: [dispatch, username] });
  },
  logout: () => {
    logout(dispatch);
  },
  deleteAccount: () => {
    performAction({ f: deleteAccount, p: [dispatch] });
  },
});

const props = (state: RootState) => ({
  changeUsernameStatus: state.user.userStatus,
});

export const connector = connect(props, mapper);
