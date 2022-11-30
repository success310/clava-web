import React from 'react';
import LeagueMatches from './LeagueMatches';
import Leagues from '../../components/League';
import News from '../News';

const Home: React.FC = () => (
  <div className="home">
    <Leagues small />
    <LeagueMatches />
    <News small />
  </div>
);

// reload
export default Home;
