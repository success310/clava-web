import React, { useMemo } from 'react';
import { useParams } from 'react-router';
import LeagueMatches from './LeagueMatches';
import Leagues from '../../components/League';
import News from '../News';

const Home: React.FC = () => {
  const { leagueId } = useParams();
  const realLeagueId = useMemo(() => {
    if (!leagueId) return -1;
    const id = parseInt(leagueId, 10);
    return Number.isNaN(id) ? -1 : id;
  }, [leagueId]);
  return (
    <div className="home">
      <Leagues small leagueId={realLeagueId} />
      <LeagueMatches leagueId={realLeagueId} />
      <News small />
    </div>
  );
};

// reload
export default Home;
