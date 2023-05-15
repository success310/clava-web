# Getting Started with Clava Web

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts
It's highly recommended to use yarn!
In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn fix`

Runs eslint --fix on the whole project 

### `yarn generate-client-{target-endpoint}`

Generates the ts files for the API of the selected endpoint. Clava is running on 4 endpoints: 
- 'prod': Production, please do not change things on the production environment
- 'stag': Mostly the same features/settings like production environment, used to test new features & bugfixes
- 'dev': Used to test new features almost ready for production, sometimes down, sometimes buggy
- 'test': Used to test new features in development, mostly used by the backend developer

It's recommended to use the 'stag' environment for this project since ou are not able to f*** up data in production, but you can expect exactly the same behaviour from the production API.  

## Clava Web

Clava is a Livescore-App. It provides scores for soccer games in the amateur level. Currently, it's deployed in South Tyrol, but will be expanded asap. 
Clava consists of a Fastapi-Backend, a React.js Web-Version(this project) and a React-Native App.

### Backend

Every request should be made via the `src/client/index.ts`. Create or modify functions in this file to create new Requests. the `src/client/api/` folder is auto-generated, it contains every request the API can handle, models and schemas for the types.
The `src/client/Websockets/` folder consists everything regarding real-time data. Currently there is only 1 active Websocket (`events.ts`), when a event (Goal, Change, Card, Chance) get submitted, this socket will trigger some refreshs.

### Theme

In `src/cofig/theme.ts` the Clava theme is defined.
`src/scss/_custom.scss` contains any custom styling.

### FontAwesome

This Project uses FontAwesome 5 Pro, the `.yarnrc.yml` yaml file contains the Package Manager auth token to perform a successful `yarn install`. If this does not work, see [Fontawesome Docs](https://fontawesome.com/docs/web/setup/packages)
