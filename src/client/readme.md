# Backend

## Types

Clava is running on 4 endpoints:
- Production 'prod', please do not change things on the production environment [api.clava-sports.com](https://api.clava-sports.com/docs)
- Staging 'stag': Staging, mostly the same features/settings like production environment, used to test new features & bugfixes [api.stag.clava-sports.com](https://api.stag.clava-sports.com/docs)
- Development 'dev': Development, used to test new features almost ready for production, sometimes down, sometimes buggy [api.dev.clava-sports.com](https://api.dev.clava-sports.com/docs)
- Testing 'test': Testing, used to test new features in development, mostly used by the backend developer [api.beta.clava-sports.com](https://api.beta.clava-sports.com/docs)

It's recommended to use the Staging environment for this project since ou are not able to f*** up data in production, but you can expect exactly the same behaviour from the production API.  

## Using the backend:

Every request should be made via the `src/client/index.ts`. Create or modify functions in this file to create new Requests. 

Most requests the API offers are already available in this file.

Anywhere in the code you can call functions of this file:

Example:
```
    const user = await client().fetchUser(id);
```

## `src/client/api/`

The `src/client/api/` folder is auto-generated, it contains every request the API can handle, models and schemas for the types.

#### DO NOT TOUCH ANYTHING INSIDE `src/client/api/`

call `yarn generate-client-prod` to regenerate those files. More infos [here](/readme.md)

The `src/client/Websockets/` folder consists everything regarding real-time data. 

Currently, there is only 1 active Websocket (`events.ts`), when a event (Goal, Change, Card, Chance) get submitted, this socket will trigger some refreshs.

## Switch Backend:

Open clava-sports.com/switchBacken/{endpoint} to switch endpoint as anonymous user.
With admin access there is an easier way in the Sidebar.

The currently active endpoint is visible as Logo Background:

- prod: black transparent
- stag: green #198754
- dev: red #DC3545
- test: blue #0D6EFD

