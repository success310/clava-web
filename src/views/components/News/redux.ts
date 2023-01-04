import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../store';
import { IDType } from '../../../config/types';
import { performAction } from '../../../store/actions/all';
import {
  fetchBulletins,
  fetchMixed,
  fetchNews,
  fetchTransfers,
  fetchVideos,
} from '../../../store/actions/newsActions';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getNews: (
    aoiId: IDType,
    type: 'news' | 'transfers' | 'videos' | 'bulletins' | 'mixed',
    offset = 0,
    limit = 20,
  ) => {
    switch (type) {
      case 'bulletins':
        performAction({
          f: fetchBulletins,
          p: [dispatch, aoiId, offset, limit],
        });
        break;
      case 'news':
        performAction({ f: fetchNews, p: [dispatch, aoiId, offset, limit] });
        break;
      case 'transfers':
        performAction({
          f: fetchTransfers,
          p: [dispatch, aoiId, offset, limit],
        });
        break;
      case 'videos':
        performAction({ f: fetchVideos, p: [dispatch, aoiId, offset, limit] });
        break;
      case 'mixed':
      default:
        performAction({ f: fetchMixed, p: [dispatch, aoiId] });
        break;
    }
  },
});

const props = (state: RootState, prevProps: { small: boolean }) => ({
  news: state.news.news,
  transfers: state.news.transfers,
  videos: state.news.videos,
  bulletins: state.news.bulletins,
  ...prevProps,
  loading:
    state.news.statusNews === 'loading' ||
    state.news.statusVideos === 'loading' ||
    state.news.statusBulletins === 'loading' ||
    state.news.statusTransfers === 'loading',
});

export const connector = connect(props, mapper);
// re load
