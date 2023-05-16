# Getting Started with Clava Web

Clava is a Livescore-App. It provides scores for soccer games in the amateur level. Currently, it's deployed in South Tyrol, but will be expanded asap.
Clava consists of a Fastapi-Backend, a React.js Web-Version(this project) and a React-Native App.

### Node & Yarn

Tested & running on Node v18.1.0, yarn v3.5.1
It's highly recommended to use yarn not npm

### Backend

[More Details](/src/client/readme.md)

### FontAwesome

This Project uses FontAwesome 5 Pro, the `.yarnrc.yml` yaml file contains the Package Manager auth token to perform a successful `yarn install`. If this does not work, see [Fontawesome Docs](https://fontawesome.com/docs/web/setup/packages)

### Scopes

In the Clava users system there are 3 different Scopes:
- ANONYMOUS: users with no scope are anonymous users, can do nothing
- REGISTERED: registered user, can post in feed (just App atm.)
- CONTENT_MANAGER: can modify matches, events, news & transfers (just App), can access Adminpanel (just Web)
- ADMIN: can do everything
- CONTENT_CREATOR: can write Blogs for the Newsfeed
- MODERATOR: can moderate the Feed (edit/delete Feed Posts)

For developer within this project an account with the Admin scope is very useful/required. ask @csaq5507


## Available Scripts

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

Generates the ts files for the API of the selected endpoint. 
See [readme](/src/client/readme.md) for the endpoint details.

Additionally, this script injects the logger middleware into the requests file.

### Theme

In `src/cofig/theme.ts` the Clava theme is defined.
`src/scss/_custom.scss` contains any custom styling.

