import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import {
  createVideo,
  getVideo,
  searchAdmin,
} from '../../../../store/actions/adminActions';
import { SEARCH_VIDEOS } from '../../../../store/actions/types';
import { IDType } from '../../../../config/types';
import { performAction } from '../../../../store/actions/all';
import { ExternalVideoCreateRaw } from '../../../../client/api';
import { fetchAois } from '../../../../store/actions/aoiActions';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getVideo: (id: IDType) => {
    performAction({ f: getVideo, p: [dispatch, id] });
  },
  patchVideo: (id: IDType) => {
    // TODO
  },
  createVideo: (video: ExternalVideoCreateRaw) => {
    performAction({ f: createVideo, p: [dispatch, video] });
  },
  deleteVideo: () => {
    // TODO
  },
  searchVideo: (q: string) => {
    performAction({ f: searchAdmin, p: [dispatch, q, SEARCH_VIDEOS] });
  },
  getAois: () => {
    performAction({ f: fetchAois, p: [dispatch] });
  },
});

const props = (state: RootState) => ({
  video: state.admin.video,
  videos: state.admin.videos,
  searching: state.admin.statusSearch === 'loading',
  aois: state.aois.value,
  status: state.admin.status,
});

export const connector = connect(props, mapper);
