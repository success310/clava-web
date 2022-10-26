import React, { useContext, useEffect } from 'react';
import { ConnectedProps } from 'react-redux';
import { ClavaContext } from '../../../config/contexts';
import { translate } from '../../../config/translator';
import { connector } from './redux';

const Home: React.FC<ConnectedProps<typeof connector>> = ({
  leagueMatches,
  fetchLeagueMatchesOfDay,
}) => {
  const { l, aoi } = useContext(ClavaContext);

  useEffect(() => {
    console.log(`something changed: ${aoi}`);
    fetchLeagueMatchesOfDay(aoi, new Date());
  }, [aoi, fetchLeagueMatchesOfDay]);
  return <span>{translate('welcome', l)}</span>;
};

// reload
export default connector(Home);
