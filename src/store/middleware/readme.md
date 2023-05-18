# Logger middleware

`logger.ts` contains the logger middleware, Logs are colored depending on the `LogType`.

The `addLog()` function saves the last 100 log messages in an array, can be used in the whole project to eventually
display the log somewhere (copied over from mobile APP, not that useful in WEB).