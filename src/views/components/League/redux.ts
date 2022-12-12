import { connect } from 'react-redux';
import { RootState } from '../../../store';
import { IDType } from '../../../config/types';

const props = (
  state: RootState,
  prevProps: { small: boolean; leagueId?: IDType },
) => ({
  leagues: state.leagues.value,
  ...prevProps,
  favorites: state.user.favorites
    .filter((f) => f.type === 'league')
    .map((f) => f.id),
});

export const connector = connect(props);
// rel
