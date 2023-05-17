# Redux Store

This folder contains everything regarding the Redux Store.

- [Actions](actions/readme.md)
- [Constants](constants/readme.md)
- [Middleware](middleware/readme.md) Contains a logger, if redux store is used properly it'll log everything
- [Reducers](reducers/readme.md)

If you create a new Reducer, make sure to include it into the [store `index.ts`](./index.ts).

Call `defaultGet()` located in [`actions/all.ts`](actions/all.ts) for every API request you perform, it'll apply the
logger middleware and should be typed in a way to prevent errors. 
Example: 
```
  defaultGet(
    dispatch, 
    LeagueActionTypes.FETCH_SUCCESS_SINGLE, // Action on success
    LeagueActionTypes.FETCH_ERROR, // Action on Fail
    LeagueActionTypes.FETCH_LEAGUES, // Start Action
    client().getLeague, // a function in src/client/index.ts that performs the server request
    true, // should wrap response into an Array
    false, // should wrap response into a ValueStore<T> object, see constants/index.ts or details
    id, // Parameters of client() function
  );
```

## ValueStore

The `ValueStore` type is a commonly used wrapper object for data fetched from the API.
It's the last parameter (before function parameters) for the `defaultGet` function. It's used to assign responses
accordingly.


# Example
For example lets take a look at the `MatchState` redux store:

```
export interface MatchState {
  ...
  readonly leagueMatchDays: ValueStore<Date[]>[];
  ...
}
```

`leagueMatchDays` is an array, eventually holding the matchdays (`Date[]`) of various leagues, looking like this:

```
ValueStore<Date[]> = {
  id: IDType; // ID of the league to which the matchdays beongs to
  date?: number; // undefined in this case 
  response: Date[]; // the loaded matchdays for this league
  fetchDate: Date; // when the data got fetched (for cache, ported from mobile app, cache removed on webversion)
};
```

Means to get the matchdays of the league with ID 1 we use the `getMatchDaysToday()` function:

```
const date = new Date();

defaultGet(
    dispatch,
    MatchActionTypes.FETCH_SUCCESS_MATCH_DAYS_LEAGUE,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.FETCH_MATCH_DAYS,
    client().getMatchDays,
    false,
    {id: 1},
    date,
    { type: 'today', league: 1 },
  );
```

This will call the `/match_day/today/{amount_days}?league_id=1` API endpoint, wrap the response in the ValueStore
object, with `id = 1` and call the FETCH_SUCCESS_MATCH_DAYS_LEAGUE reducer with the wrapped response as payload.

In the reducer we can now check if the matchdays for league 1 are already present in the `leagueMatchDays` array, if so
we overwrite/append the new fetched matchdays, otherwise we append them to the array.