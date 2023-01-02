import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import {
  createVideo,
  getVideo,
  searchAdmin,
} from '../../../../store/actions/adminActions';
import { SEARCH_USERS } from '../../../../store/actions/types';
import { IDType } from '../../../../config/types';
import { performAction } from '../../../../store/actions/all';
import { ExternalVideoCreateRaw } from '../../../../client/api';
import { fetchAois } from '../../../../store/actions/aoiActions';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getUser: (id: IDType) => {
    performAction({ f: getVideo, p: [dispatch, id] });
  },
  patchUser: (id: IDType) => {
    // TODO
  },
  createUser: (video: ExternalVideoCreateRaw) => {
    performAction({ f: createVideo, p: [dispatch, video] });
  },
  deleteUser: () => {
    // TODO
  },
  searchUser: (q: string) => {
    performAction({ f: searchAdmin, p: [dispatch, q, SEARCH_USERS] });
  },
  getAois: () => {
    performAction({ f: fetchAois, p: [dispatch] });
  },
});

const props = (state: RootState) => ({
  user: state.admin.user,
  users: state.admin.users,
  searching: state.admin.statusSearch === 'loading',
  aois: state.aois.value,
  status: state.admin.status,
});

export const connector = connect(props, mapper);
// reload
