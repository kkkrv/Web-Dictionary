const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

let databaseConnection = "Waiting for Database response...";
console.log(databaseConnection);
let retryTime = 2000;

router.get('/', function(req, res, next) {
    let term = req.body.term;
    const con = connectWithRetry();
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    res.send("API is working properly");
});

const connectWithRetry = () => {
    return mongoose.connect(
        process.env.MONGO_URL,
        { useNewUrlParser: true },
        err => {
            if (err) {
                retryTime *= retryTime;
                console.error(
                    'Failed to connect to mongo on startup - retrying in 5 sec',
                    err
                );
                setTimeout(connectWithRetry, 5000);
            }
        }
    )
}

// If connected to MongoDB send a success message
mongoose.connection.once("open", () => {
    console.log("Connected to Database!");
    databaseConnection = "Connected to Database";
});

module.exports = router;