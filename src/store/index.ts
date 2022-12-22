import { configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import logger from './middleware/logger';
import { userReducer } from './reducers/userReducer';
import { aoiReducer } from './reducers/aoiReducer';
import { leagueReducer } from './reducers/leagueReducer';
import { teamReducer } from './reducers/teamReducer';
import { languageReducer } from './reducers/languageReducer';
import { matchReducer } from './reducers/matchReducer';
import { standingReducer } from './reducers/standingReducer';
import { routeReducer } from './reducers/routeReducer';
import { searchReducer } from './reducers/searchReducer';
import { serverReducer } from './reducers/serverReducer';
import { newsReducer } from './reducers/newsReducer';
import { adReducer } from './reducers/adReducer';
import { adminReducer } from './reducers/adminReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    aois: aoiReducer,
    leagues: leagueReducer,
    teams: teamReducer,
    languages: languageReducer,
    match: matchReducer,
    standing: standingReducer,
    route: routeReducer,
    search: searchReducer,
    server: serverReducer,
    news: newsReducer,
    ads: adReducer,
    admin: adminReducer,
  },
  middleware: [logger, thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ActionCreator<
  ThunkAction<void, RootState, null, Action<string>>
>;

export function isLoading(state: RootState): boolean {
  return (
    state.match.statusMatchDays === 'loading' ||
    state.match.status === 'loading' ||
    state.user.status === 'loading' ||
    state.standing.status === 'loading' ||
    state.news.statusNews === 'loading' ||
    state.leagues.status === 'loading' ||
    state.teams.status === 'loading' ||
    state.search.status === 'loading'
  );
}
