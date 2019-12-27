const mongoose = require('mongoose');
const validator = require('validator');

const mongoDB = 'mongodb://127.0.0.1:27017/task-manager-app';

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const task = new Task({
    description: 'Sample Task 7'
});

task.save().then(res => console.log(res)).catch(err => console.log(err));

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate (value) {
//             if (value < 0) {
//                 throw new Error('Age must be positive number');
//             }
//         }
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate (value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Invalid email address');
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7,
//         validate (value) {
//             if (value.toLowerCase().includes('password')) {
//                 throw new Error(`Password cannot contain the word 'password'`);
//             }
//         }
//     }
// });

// const jane = new User({
//     name: 'Jane Doe',
//     age: 35
// });

// jane.save().then(res => console.log(res)).catch(err => console.log(err));
