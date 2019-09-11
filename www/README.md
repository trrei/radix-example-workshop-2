# WWW

A small web front-end built using ReactJS. It should query the Echo module for a random password and Radix runtime information. Request from the client running in browser will go through the www component, where requests will be forward to Echo api. This is done since the Echo api should not be exposed to internet (and we dont have to setup CORS rules). 

## Mock data

TODO!! MOCK_ECHO_URL and ECHO_API_URL should be environment variables

The variable `mockData` in [App.js](./src/App.js) decide if WWW should mock data itself or pull data from Echo API. If this is set to false, using Echo API, you need to run Echo API on localhost:3001 (default).

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm install`

Installs all dependencies required to run application

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm audit`

Run a vulnerability check on dependencies

### `make build`

Builds a docker image named `www`.

Note: [nginx.conf](./nginx.conf) contains route to reach the echo api. If the application mock data, this route needs to be commented out, as nginx throws an error if not. 

### `make run``

Runs docker image with correct settings

## Note

In this repository we've cheated and created a base.Dockerfile which is pushed to keaaa/www-workshop-base:latest by running `make deploy-base`. We then refer to this base image in www Dockerfile. This is not best practise, but to limit the docker build time, and have a more smooth experience during this workshop. For real scenarios you should include the steps in base.Dockerfile in the Dockerfile, so these steps are done on each build.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
