# Redux Actions

Here all actions of our redux store are defined (`types.ts`) and each store has its file containing functions for the
actions.

`all.ts` contains useful functions to perform actions like the `defaultGet()` described in `src/store/readme.md`.

Action functions that perform API calls should be called via the `performAction()` function, this function puts the
action into a queue.
The queue's purpose to redo API requests if the server responses with 401. They'll be executed again after 2 seconds.  