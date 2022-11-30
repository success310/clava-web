import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../store';
import { IDType } from '../../../config/types';
import { performAction } from '../../../store/actions/all';
import { fetchMixed, fetchNews } from '../../../store/actions/newsActions';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getNews: (aoiId: IDType, small: boolean, offset = 0, limit = 20) => {
    if (small) {
      performAction({ f: fetchMixed, p: [dispatch, aoiId] });
    } else {
      performAction({ f: fetchNews, p: [dispatch, aoiId, offset, limit] });
    }
  },
});

const props = (state: RootState, prevProps: { small: boolean }) => ({
  news: state.news.news,
  transfers: state.news.transfers,
  videos: state.news.videos,
  ...prevProps,
  loading: state.news.statusNews === 'loading',
});

export const connector = connect(props, mapper);
// reload
