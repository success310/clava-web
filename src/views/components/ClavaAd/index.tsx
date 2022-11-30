import { ConnectedProps } from 'react-redux';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { Ad } from '../../../client/api';
import { ClavaContext } from '../../../config/contexts';
import { fb } from '../../../config/firebase';
import ClavaImage from '../ClavaImage';
import { connector } from './redux';
import { isPremium } from '../../../config/utils';

const MIN_PRIO = 11;
function getAdByPrio(ads: Ad[], onlyPrio1 = false): Ad {
  if (onlyPrio1) {
    const filtered = ads.filter((a) => a.priority === 1);
    if (filtered.length)
      return filtered[Math.floor(Math.random() * filtered.length)];
  }
  const selector = ads.reduce<number[]>(
    (prev, current, index) =>
      prev.concat(Array(MIN_PRIO - current.priority).fill(index)),
    [],
  );
  return ads[selector[Math.floor(Math.random() * selector.length)]];
}

const ClavaAd: React.FC<ConnectedProps<typeof connector>> = ({
  priority,
  getAds,
  type,
  ads,
}) => {
  const { user } = useContext(ClavaContext);
  const premium = useMemo(() => isPremium(user), [user]);
  const arePresent = useMemo(() => ads.length !== 0, [ads]);
  useEffect(() => {
    if (!arePresent) getAds(type);
  }, [arePresent, type, premium]);
  const adsChanged = useMemo(
    () => ads.reduce((prev, cur) => prev + cur.id, 0),
    [ads],
  );
  const selected = useMemo(() => {
    if (ads.length === 0) return undefined;
    return getAdByPrio(ads, !!priority);
  }, [adsChanged]);
  const onPress = useCallback(() => {
    if (selected) {
      fb().logEvent('ad_clicked_web', { name: selected.name });
      window.open(selected.url, '_blank');
    } else window.open('mailto://ad@clava-sports.com');
  }, [selected]);

  if (isPremium(user)) return null;

  if (selected) {
    fb().logEvent('ad_view_web', { name: selected.name });
    return (
      <button type="button" className="clava-ad" onClick={onPress}>
        <ClavaImage image={selected.fileMobile} width={1080} />
      </button>
    );
  }
  return null;
};

export default connector(ClavaAd);
