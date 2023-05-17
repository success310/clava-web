# Redux Reducers

Here the reducer for the redux store are defined, most of the time they handle responses of API requests.

`replaceOrAddResponseSingle` and `replaceOrAddResponseMultiple` are helper functions from `src/config/utils.tsx` that
are used a lot in here. They basically check the response(-array) if the fetched data is already present in the store
and then replace or append the data.
