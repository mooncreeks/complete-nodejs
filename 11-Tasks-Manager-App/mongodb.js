const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager-app';

MongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        console.log('Unable to connect to database!', error);
    }

    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     name: 'Aditya Hajare',
    //     age: 32
    // }, (error, res) => {
    //     if (error) {
    //         return console.log('Unable to insert user');
    //     }

    //     console.log(res);
    // });

    db.collection('tasks').insertMany([{
        description: 'Sample Task 1',
        completed: false
    }, {
        description: 'Sample Task 2',
        completed: true
    }, {
        description: 'Sample Task 3',
        completed: false
    }], (error, res) => {
        if (error) {
            return console.log('Failed to insert docs', error);
        }

        console.log(res.ops);
    });
});
