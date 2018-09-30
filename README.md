"# OnlineBindServices" 
split off the node server API helper layer into a different repo from the webpage delivery code. 

## Directory Layout
see [treerOutput](https://github.com/sinnkirou/crud-react-redux/blob/master/treerOutput) for details.

## Quick Start
#### 1. Get the latest version
You can start by cloning the latest version on your local machine by running:

```shell
$ git clone https://github.com/sinnkirou/crud-react-redux.git
$ cd crud-react-redux
```

#### 2. Run `npm install`
This will install both run-time project dependencies and developer tools listed in package.json file.

#### 3. (Optional) Configure the environment port
Find the .env file in the root directory. Add environment-specific variables on new lines in the form of NAME=VALUE. For more details, check [dotenv](https://www.npmjs.com/package/dotenv). For example:
`PORT=3050`

**Note** that do not commit sensitive infomation into this file.

#### 4. Run `npm start`
This command will build the app from the source files (`/src`) into the output `/dist` folder. As soon as the initial build completes, it will start the Node.js server (`node dist/main.js`).

**Note** that the npm start command launches the app in development mode, the compiled output files are not optimized and minimized in this case.


## How to Build, Test, etc

#### 1. If you need just to build the app, simply run:
```shell
$ npm run build
```

After running this command, the /dist folder will contain the compiled version of the app. For example, you can launch Node.js server normally by running `node dist/main.js`.

#### 2. To check the source code for syntax errors and potential issues run:
```shell
$ npm run lint
$ npm run lint:fix      # check the systax errors and fix all auto-fixable issues
```

#### 3. To launch unit tests:
```shell
$ npm test          # Run unit tests with test coverage
$ npm run testwithoutreport    # Run unit tests without without coverage
```

By default, [Mocha](https://mochajs.org/) test runner is looking for test files matching the `test/**/*.spec.js` pattern. Take a look at `test/Actions/index.spec.js` as an example.

#### 4. To create or update Directory Layout by treer:
```shell
$ npm run treer
```
