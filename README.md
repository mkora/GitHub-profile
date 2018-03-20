# GitHub User Profile Statistics

Node.js, Express, React, Material-UI, Mocha

## Overview

A tool for visualization of GitHub user profile statistics

## Notes

- Backend uses [@octokit/rest](https://github.com/octokit/rest.js) library

- TTL for node-cache is set to 24 hours to keep user's profile

- Frontend uses [React components](https://material-ui-next.com) that implement [Google's Material Design](https://material.io) (Note: Icons is [here]([https://material.io/icons/]))

- Used concurrently to start both servers (express and create-react-app) by running npm start (Note: proxy is set in here `src/react/package.json`; Express default value is `http://localhost:3030`)

- Added Mocha and Chai for backend tests

- For test coverage used Istanbul (Note: **nyc** is its command line interface)

## See Me

[pic is here]

## Quick Start

1. Install dependencies:

  ```
  $ npm i && cd src/react && npm i
  ```

2. Obtain a GitHub Access Token:

  - [Create an OAuth Apps](https://github.com/settings/developers)

  - [Obtain an Access Token](https://github.com/settings/tokens)

4. Run the local application:

  - Add the GitHub Access Token to the `src/config/development.json`

  - Boot from the top-level directory (the server and the client)

    ```
    $ npm start
    ```

  - Visit http://localhost:3000

5. Run the debug server (uses nodemon):
  
  ```
  $ npm run debug-server
  ```
 
6. Also run:

  ```
  $ npm test
  $ npm server
  $ npm client
  ```

7. Run the production application:

  - Obtain a GitHub Access Token and add it to `src/config/production.json`

  - Update proxy in `src/react/package.json` if needed

  - Run the app

    ```
    $ export NODE_ENV=production
    $ cd src/react/ && npm build && cd ../..
    $ NODE_ENV=production npm start
    ```

## API Endpoints

  Note: Use GET method to retrieve data

  Note: For a local copy call http://localhost:3030/api/
  
  - Call **user/:username** to GitHub user profile info
  
    For example, `/api/user/mkora`

  - Call **clear/:username** to clear user profile info from the cache

    For example, `/api/clear/mkora`

  - Call **/api/limit** to get rate limit for the obtained API key

    For example, `/api/limit`
    