import React, { useCallback, useContext, useMemo } from 'react';
import { ConnectedProps } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/pro-regular-svg-icons';
import { FavoriteType, IDType } from '../../../../config/types';
import { connector } from './redux';
import { isFavorite } from '../../../../config/utils';
import { ClavaRootContext } from '../../../../config/contexts';
import getTheme from '../../../../config/theme';

type FavoriteIconProps = {
  type: FavoriteType;
  id: IDType;
  team1Id: IDType;
  team2Id: IDType;
  right?: boolean;
  big?: boolean;
} & ConnectedProps<typeof connector>;

const FavoriteIcon: React.FC<FavoriteIconProps> = ({
  type,
  right,
  onPressStar,
  id,
  team1Id,
  team2Id,
  favorites,
  big,
}) => {
  const { theme } = useContext(ClavaRootContext);
  const checked = useMemo(
    () => isFavorite(favorites, id, type, team1Id, team2Id),
    [favorites, id, team1Id, team2Id, type],
  );
  const onFav = useCallback(() => {
    onPressStar(id, checked, type);
  }, [checked, id, onPressStar, type]);

  return (
    <button
      type="button"
      className={`${right ? 'float-right' : ''} favorite-icon`}
      onClick={onFav}>
      <FontAwesomeIcon
        icon={faStar}
        size={big ? '2x' : '1x'}
        color={
          checked
            ? getTheme(theme).COLORS.PRIMARY
            : getTheme(theme).COLORS.WHITE
        }
        fill={checked ? getTheme(theme).COLORS.PRIMARY : 'transparent'}
      />
    </button>
  );
};

FavoriteIcon.defaultProps = {
  big: false,
  right: false,
};

export default connector(FavoriteIcon);
/*
      {type === 'team' ||
          (type === 'match' && checked && (
          <TouchableOpacity
            onPress={() => {
              onPressBell(id, checkedBell, type);
            }}>
            <FA5Icon
              name="bell"
              size={big ? 30 : 20}
              color={checkedBell ? theme.COLORS.PRIMARY : theme.COLORS.WHITE}
              fill={checkedBell}
            />
          </TouchableOpacity>
        ))}
 */
