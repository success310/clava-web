import { connect } from 'react-redux';
import { RootState } from '../../../store';

const props = (state: RootState, prevProps: { small: boolean }) => ({
  leagues: state.leagues.value,
  ...prevProps,
  favorites: state.user.favorites
    .filter((f) => f.type === 'league')
    .map((f) => f.id),
});

export const connector = connect(props);
// rel
