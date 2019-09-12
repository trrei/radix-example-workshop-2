# WWW

A small web front-end built using ReactJS. It should query the Echo module for a passwords and Radix runtime information. 

Request from the browser client will go through the www web server (nginx), where requests will be forward to Echo api. This is done since the Echo api should not be exposed to internet (and we dont have to setup CORS rules). 

## Mock data

TODO!! USE_MOCK_DATA and ECHO_API_URL should be environment variables

The variable `useMockData` in [App.js](./src/App.js) decide if WWW should mock data itself or pull data from Echo API. If this is set to false, using Echo API, you need to run Echo API on localhost:3001 (default).

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

## Local docker development

The reactjs app will be built by nodejs and served by a nginx web server. 

### Build docker image

To build the image for the WWW app
```
docker build -t www .
```
__Note__: [Nginx config](./nginx.conf) used by www contains a redirect to reach the echo api. This route needs to be commented in/out, based on mockOff/mockOn. This needes to be done at build time. Nginx throws an error if not. (TODO! - control if to mock or not through env variable)

### Run as docker container

To run the WWW app in Docker
```
docker run -it --rm -p 3000:3000 www
```
(replace ```-it``` with ```-d``` to run in detached mode)

## Cheating

In this repository we've cheated and created a [base.Dockerfile](./base.Dockerfile) which is pushed to `keaaa/www-workshop-base:latest`. The actual [Dockerfile](./Dockerfile) refer to this base image.

 This is not best practise, but to limit the docker build time, and have a more smooth experience during this workshop. For real scenarios you should include the steps in base.Dockerfile in the Dockerfile, so these steps are done on each build.

Do not add new or update dependencies for this component, as it will fail during build.

## ReactJS - Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
