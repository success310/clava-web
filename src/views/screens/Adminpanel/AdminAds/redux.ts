import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import {
  createAd,
  getAd,
  patchAd,
  searchAdmin,
} from '../../../../store/actions/adminActions';
import { SEARCH_ADS } from '../../../../store/actions/types';
import { IDType } from '../../../../config/types';
import { performAction } from '../../../../store/actions/all';
import { AdCreate, AdPatch } from '../../../../client/api';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getAd: (id: IDType) => {
    performAction({ f: getAd, p: [dispatch, id] });
  },
  patchAd: (id: IDType, ad: AdPatch) => {
    performAction({ f: patchAd, p: [dispatch, id, ad] });
  },
  createAd: (ad: AdCreate) => {
    performAction({ f: createAd, p: [dispatch, ad] });
  },
  deleteAd: () => {
    // TODO
  },
  searchAd: (q: string) => {
    performAction({ f: searchAdmin, p: [dispatch, q, SEARCH_ADS] });
  },
});

const props = (state: RootState) => ({
  ad: state.admin.ad,
  ads: state.admin.ads,
  searching: state.admin.statusSearch === 'loading',
  status: state.admin.status,
});

export const connector = connect(props, mapper);
