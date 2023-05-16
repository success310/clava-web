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