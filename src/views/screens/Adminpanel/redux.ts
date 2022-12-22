import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../store';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  patchUser: () => {
    // TODO
  },
  patchMatch: () => {
    // TODO
  },
  createMatch: () => {
    // TODO
  },
  createMatchBatch: () => {
    // TODO
  },
  clearCache: () => {
    // TODO
  },
  patchNews: () => {
    // TODO
  },
  patchAd: () => {
    // TODO
  },
  createNews: () => {
    // TODO
  },
  patchVideo: () => {
    // TODO
  },
  createVideo: () => {
    // TODO
  },
  createAd: () => {
    // TODO
  },
});

const props = (state: RootState) => ({
  changeUsernameStatus: state.user.userStatus,
});

export const connector = connect(props, mapper);
