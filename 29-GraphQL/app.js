require('./utils/loadEnv');

// Middlewares
const errorLogger = require('./middleware/errorLogger');
const multer = require('./middleware/multer');

// Express config
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// GraphQL
const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolver');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors());
app.use(multer);

// GraphQL
app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver
}));

app.use(errorLogger);

// Boot up
app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));