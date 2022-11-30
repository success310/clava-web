import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import {
  addFavorites,
  alterFavorite,
  removeFavorite,
} from '../../../../store/actions/userActions';
import { FavoriteType, IDType } from '../../../../config/types';
import { RootState } from '../../../../store';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  onPressStar: (id: IDType, checked: boolean, type: FavoriteType) => {
    if (checked) removeFavorite(dispatch, id);
    else addFavorites(dispatch, [{ id, type, belled: type === 'match' }]);
  },
  onPressBell: (id: IDType, checked: boolean, type: FavoriteType) => {
    if (checked) alterFavorite(dispatch, { id, type, belled: false });
    else alterFavorite(dispatch, { id, type, belled: true });
  },
});

const props = (state: RootState) => ({
  favorites: state.user.favorites,
});

export const connector = connect(props, mapper);
