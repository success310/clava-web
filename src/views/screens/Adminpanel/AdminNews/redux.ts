import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import {
  createNews,
  searchAdmin,
} from '../../../../store/actions/adminActions';
import { SEARCH_NEWS } from '../../../../store/actions/types';
import { IDType } from '../../../../config/types';
import { performAction } from '../../../../store/actions/all';
import { BlogCreate } from '../../../../client/api';
import { fetchAois } from '../../../../store/actions/aoiActions';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getNews: (id: IDType) => {
    // TODO
  },
  patchNews: (id: IDType) => {
    // TODO
  },
  createNews: (news: BlogCreate) => {
    performAction({ f: createNews, p: [dispatch, news] });
  },
  deleteNews: () => {
    // TODO
  },
  searchNews: (q: string) => {
    performAction({ f: searchAdmin, p: [dispatch, q, SEARCH_NEWS] });
  },
  getAois: () => {
    performAction({ f: fetchAois, p: [dispatch] });
  },
});

const props = (state: RootState) => ({
  news: state.admin.news,
  newses: state.admin.newses,
  searching: state.admin.statusSearch === 'loading',
  aois: state.aois.value,
  status: state.admin.status,
});

export const connector = connect(props, mapper);
// reload
