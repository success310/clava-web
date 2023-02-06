import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import {
  createBadge,
  getBadges,
  giveBadge,
  patchBadge,
  removeBadge,
  searchAdmin,
} from '../../../../store/actions/adminActions';
import { performAction } from '../../../../store/actions/all';
import {
  BadgeCreate,
  BadgePatch,
  BadgeTypeEnum,
  UserBadgeCreateDelete,
} from '../../../../client/api';
import { SEARCH_USERS } from '../../../../store/actions/types';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getBadges: () => {
    performAction({ f: getBadges, p: [dispatch] });
  },
  patchBadge: (id: BadgeTypeEnum, badge: BadgePatch) => {
    performAction({ f: patchBadge, p: [dispatch, id, badge] });
  },
  createBadge: (badge: BadgeCreate) => {
    performAction({ f: createBadge, p: [dispatch, badge] });
  },
  giveBadge: (badge: UserBadgeCreateDelete) => {
    performAction({ f: giveBadge, p: [dispatch, badge] });
  },
  removeBadge: (badge: UserBadgeCreateDelete) => {
    performAction({ f: removeBadge, p: [dispatch, badge] });
  },
  doSearch: (q: string) => {
    performAction({ f: searchAdmin, p: [dispatch, q, SEARCH_USERS] });
  },
});

const props = (state: RootState) => ({
  badges: state.admin.badges,
  users: state.admin.users,
  searching: state.admin.statusSearch === 'loading',
  status: state.admin.status,
});

export const connector = connect(props, mapper);
