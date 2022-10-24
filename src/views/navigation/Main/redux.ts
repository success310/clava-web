import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { performAction } from '../../../store/actions/all';
import { login } from '../../../store/actions/userActions';
import { RootState } from '../../../store';
import { IDType } from '../../../config/types';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  login: (email: string, password: string) => {
    performAction({ f: login, p: [dispatch, email, password] });
  },
});

const props = (
  state: RootState,
  prevProps: { setAoi: (aoi: IDType) => void },
) => ({
  user: state.user.value,
  ...prevProps,
});

export const connector = connect(props, mapper);
