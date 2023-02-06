import React, { useCallback, useContext } from 'react';
import { Badge } from '../../../../../client/api';
import { ClavaContext } from '../../../../../config/contexts';
import ClavaImage from '../../../../components/ClavaImage';
import { showTranslated } from '../../../../../config/translator';

const BadgeSmall: React.FC<{
  badge: Badge;
  selected: boolean;
  onPress: (b: Badge) => void;
}> = ({ badge, selected, onPress }) => {
  const { l } = useContext(ClavaContext);
  const onPressCont = useCallback(() => {
    onPress(badge);
  }, [badge, onPress]);
  return (
    <button
      type="button"
      className={`badge-small${selected ? ' selected' : ''}`}
      onClick={onPressCont}>
      <ClavaImage image={badge.media} width={100} />
      <h6>{showTranslated(badge.name, l)}</h6>
    </button>
  );
};

BadgeSmall.displayName = 'BadgeSmall';
export default BadgeSmall;
