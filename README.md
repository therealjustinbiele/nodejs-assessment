# Dyno Nodejs Assessment

The intent of this repository is to evaluate a candidate's coding skills, ability 
to capture codebase bad practices and refactoring technique knowledge. 

The codebase, despite being small and straightforward, has errors on it and lacks good typing
since it's using pure Javascript.

The candidate goal is to refactor this application into Typescript code, identify and fix coding
bad practices and code smells. 

# How to Proceed

To be evaluated, the candidate must fork this repo, commit and push your changes, and once finished please upload to the Greenhouse link provided in your email.

# Up and Running

**Install dependencies**
To install node dependencies for the project, run 
`npm install`

**Boot Server**
To initialize the express server, run either of the following:
`npm start` or `npm run start`

# Tests
To run the test suite for this project, run
`npm test` or `npm run test`

The tests are not using mock data and perform CRUD operations on the `./src/users/users.json` blob. Be sure to remove changes to the blob upon completion of each test run.

# Build
To generate a Javascript distributable, run `tsc` in the directory root, or `npm build`
