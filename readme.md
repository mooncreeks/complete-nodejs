## About This Project
NodeJS - Express, Mongo, Sequelize, Sequelize-CLI, Mongoose, GraphQL, Websockets, Socket.io, REST APIs, ReactJS Social Network, Winston, Morgan, Helmet, Compression, Validators, SSL/TLS, Micro Services Architecture & lot more.
My personal notes and apps.

## Author
Aditya Hajare ([Linkedin](https://in.linkedin.com/in/aditya-hajare)).

## Current Status
WIP (Work In Progress)!

## Deployed On Heroku
- Weather App: [https://aditya-hajare-weather-app.herokuapp.com](https://aditya-hajare-weather-app.herokuapp.com/)
- Tasks Manager App: [https://aditya-hajare-nodejs-task-app.herokuapp.com](https://aditya-hajare-nodejs-task-app.herokuapp.com/)
- Socket.io Chat App: [https://aditya-hajare-socket-chat-app.herokuapp.com](https://aditya-hajare-socket-chat-app.herokuapp.com/)

## License
Open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).

-----------------------

## Important Notes
- [Options Request](#options-request)
- [Debugging Using Node Debugger](#debugging-using-node-debugger)
- [Call Stack](#call-stack)
- [Event Loop](#event-loop)
- [Deploying Weather App On Heroku](#deploying-weather-app-on-heroku)
- [JEST - Things To Know](#jest---things-to-know)
- [WebSockets Protocol](#websockets-protocol)
- [Mongoose - Things To Know](#mongoose---things-to-know)
- [Cookies](#cookies)
- [Sessions](#sessions)
- [Storing Sessions In MongoDB](#storing-sessions-in-mongodb)
- [Allow CORS For REST APIs](#allow-cors-for-rest-apis)
- [GraphQL](#graphql)
- [GraphQL Query Variables](#graphql-query-variables)

### Options Request
- Browser sends a `OPTIONS` request before it sends `POST, PATCH, PUT, DELETE` etc.. requests.
- You may typically get `405 (Method Not Allowed)` error.
- `Express GraphQL` automatically declines anything which is not a `POST` or `GET` request. So the `OPTIONS` request is denied.
- To fix this, install `cors` by `npm i cors --save` and use it as below:
    ```
        const cors = require('cors');

        const app = express();

        app.options('*', cors());
        app.use(cors());
    ```

### Debugging Using Node Debugger
- Add `debugger` keyword wherever you want to stop your program execution and begin debugging. For e.g.:
    ```
        //app.js

        console.log('Hello World');
        debugger; // This is where program execution will stop and you can start debugging.
        console.log('Hello World 1');
    ```
- Run `app.js` above with `inspect` command as below:
    ```
        // In terminal

        node inspect app.js
    ```
- Open `Google Chrome Browser` and enter following URL:
    ```
        chrome://inspect/#devices
    ```
- You should see your current Node app under `Remote Target`. Click on `inspect` link.
- On left hand side, click on `Add folder to workspace`.

### Call Stack
- `Call Stack` is a simple data structure provided by the `V8 JavaScript Engine`.
- It's job is to track the execution of our program and it does that by keeping track of all of the functions that are currently running.
- The `Call Stack` data structure uses `FILO (First In Last Out)` to track the execution of our program.

### Event Loop
- `Event Loop` looks at 2 things:
    * It looks at the `Call Stack`.
    * And it looks at the `Callback Queue`.
- If the `Call Stack` is empty, it's going the run the items from `Callback Queue`.
- The `Event Loop` actually have to wait until `Call Stack` is empty before it could run items from `Callback Queue`.
- None of our `Asynchronous Functions` are going to run unless `main() Function` is done executing.
- Node uses other threads (`C++`) behind the scene for `Node APIs`.

### Deploying Weather App On Heroku
- Go to local Git repository root directory or project root directory.
- Execute following command:
    ```
        heroku create [SUB_DOMAIN]

        // For e.g.
        heroku create aditya-hajare-weather-app
    ```
- **NOTE:** `aditya-hajare-weather-app` is the sub-domain and it must be unique across `Heroku`.
- From your project root, execute following command:
    ```
        heroku git:remote -a [APP_NAME]

        // For e.g.
        heroku git:remote -a aditya-hajare-weather-app
    ```
- Execute `git remote` to list remote branches. You should see something like below:
    ```
        heroku
        origin
    ```
- **NOTE:** `heroku` is listed under `remotes`.
- To Deploy:
    * To deploy master branch to Heroku:
        ```
            git push heroku master
        ```
    * To deploy contents of specific directory to Heroku root:
        ```
            git subtree push --prefix [DIRECTORY_NAME] heroku master

            // For e.g.
            git subtree push --prefix 10-Weather-App-Express heroku master
        ```
- After deployment, you can visit your app in browser. For e.g.
    ```
        // Weather App on Heroku:
        https://aditya-hajare-weather-app.herokuapp.com/
    ```
- **Heroku Environment Variables:**
    * To set environment variable in Heroku environment:
        ```
            heroku config:set KEY=VALUE
        ```
    * To unset/remove environment variable in Heroku environment:
        ```
            heroku config:unset KEY
        ```

### JEST - Things To Know
- `.toBe()` uses `===` operator to compare values. i.e.
    * `1 === 1`: True
    * `{} === {}`: False. That is because when 2 objects are compared with `===` they are not equal as they are stored in different memory locations.
- To compare objects in JEST, use `.toEqual()`.

### WebSockets Protocol
- `WebSocket` is a separate protocol from `HTTP`.
- `WebSockets` allow for `Full Duplex Communication`.
- `Full Duplex Communication` is just a fancy term for `Bi-Directional Communication`.
- With `WebSockets` we have a `Persistent Connection` between client and server.
- `Socket.io` needs to be called with a raw `HTTP Server`.
- Event emitters:
    * `socket.emit('EVENT_NAME', { dataObject })`: Only to self/specific client.
    * `socket.broadcast.emit('EVENT_NAME', { dataObject })`: All other clients except self.
    * `io.emit('EVENT_NAME', { dataObject })`: All clients including self.
- Event emitters in `Rooms`:
    * `io.to(room).emit('EVENT_NAME', { dataObject })`: Emits an events to everybody in a specific room.
    * `socket.broadcast.to(room).emit('EVENT_NAME', { dataObject })`: Emits an events to everybody in a specific room except self/specific client.

### Mongoose - Things To Know
- While defining methods on `Schema`, avoid `Arrow Functions`. Instead opt out for `function()`.
    * **Reason:** `this` is not available in `Arrow Functions`.
    * Refer to following examples:
        ```
            17-Shop-App-Mongoose/models/user.js
            11-Tasks-Manager-App/src/models/user.js
            11-Tasks-Manager-App/src/models/task.js
        ```
    * For e.g.
        ```
            const mongoose = require('mongoose');

            const userSchema = mongoose.Schema({
                name: {
                    type: String,
                    required: true
                },
                email: {
                    type: String,
                    required: true
                }
            });

            userSchema.methods.helloWorld = function() { // Not using arrow function here!
                // Code
            };

            module.exports = mongoose.model('User', userSchema);
        ```

### Cookies
- Cookies which are not having `expiry` and `max-age` set, will get destroyed when browser is closed.
- To set a cookie:
    ```
        exports.postLogin = async (req, res, next) => {
            res.setHeader('Set-Cookie', 'isAuthenticated=true; HttpOnly');
            res.send(req.body);
        }
    ```
- To fetch value of `isAuthenticated` cookie:
    ```
        const value = req.get('Cookie')
            .split(';')[1]
            .trim()
            .split('=')[1];
    ```

### Sessions
- To use sessions in `Express`, install following plugin:
    ```
        npm i express-session --save
    ```
- Steps to initialize and use session:
    * Initilize session in middleware in `app.js`:
        ```
            const session = require('session');

            const app = express();

            app.use(session({
                secret: 'some secret string',
                resave: false,
                saveUninitialized: false
            }));
        ```
    * Session will be available on `req.session`.
    * To set a value in session:
        ```
            req.session.isLoggedIn = true;
        ```
    * To fetch a value from session:
        ```
            const loggedIn = req.session.isLoggedIn;
        ```

### Storing Sessions In MongoDB
- Install following package:
    ```
        npm i connect-mongodb-session --save
    ```
- Setup `MongoDB Store`:
    ```
        const session = require('session');
        const connectMongoDBSession = require('connect-mongodb-session');

        const MongoDBStore = connectMongoDBSession(session);
        const store = new MongoDBStore();

        app.use(session({
            secret: 'some secret string',
            resave: false,
            saveUninitialized: false,
            store
        }));
    ```

### Allow CORS For REST APIs
- Method #1:
    * Using express `cors` middleware package:
        - Install `cors` npm package:
            ```
                npm i cors --save
            ```
        - Use it in `app.js`:
            ```
                const express = require('express');
                const cors = require('cors'); // CORS
                const bodyParser = require('body-parser');

                const app = express();

                app.use(bodyParser.json());
                app.use(cors()); // CORS

                app.listen(8080);
            ```
- Method #2:
    * Manually setting headers (**NOTE:** May not work in most cases):
        ```
            const express = require('express');
            const bodyParser = require('body-parser');

            const app = express();

            app.use(bodyParser.json());
            app.use((req, res, next) => {
                // CORS Middleware
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                next();
            })

            app.listen(8080);
        ```

### GraphQL
- Uses `Typed Query Language`.
- Single `POST` request endpoint. For e.g.
    ```
    POST    /graphql
    ```
- `POST Request Body` contains `Query Expression (to define the Data that should be returned)`.
- **Operation Types:**
    * `Query`: To retrieve data.
    * `Mutation`: To manipulate data.
    * `Subscription`: To set up realtime connection via `Websockets`.

### GraphQL Query Variables
- **Example #1**
    * Query without using variables (**Non-Recommended Way**):
        ```
            const graphqlQuery = {
                query: `
                    {
                        posts(page: ${page}) {
                            posts {
                                id
                                title
                                content
                                imageUrl
                                creator {
                                    name
                                    email
                                }
                                createdAt
                                updatedAt
                            }
                            totalPosts
                        }
                    }
                `
            }
        ```
    * Query using explicit variables (**Recommended Way**):
        ```
            const graphqlQuery = {
                query: `
                    query FetchPosts($page: Int) {
                        posts(page: $page) {
                            posts {
                                id
                                title
                                content
                                imageUrl
                                creator {
                                    name
                                    email
                                }
                                createdAt
                                updatedAt
                            }
                            totalPosts
                        }
                    }
                `,
                variables: {
                    page
                }
            };
        ```
- **Example #2**
    * Query without using variables (**Non-Recommended Way**):
        ```
            const graphqlQuery = {
                query: `
                    mutation {
                        updateStatus(status: "${this.state.status}") {
                            status
                        }
                    }
                `
            };
        ```
    * Query using explicit variables (**Recommended Way**):
        ```
            const graphqlQuery = {
                query: `
                    mutation UpdateUserStatus ($userStatus: String) {
                        updateStatus(status: $userStatus) {
                            status
                        }
                    }
                `,
                variables: {
                    userStatus: this.state.status
                }
            };
        ```