const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const uri = "mongodb://artsiom:GEjepOddUdvSeMXN@cluster0-shard-00-00-anf5p.azure.mongodb.net:27017,cluster0-shard-00-01-anf5p.azure.mongodb.net:27017,cluster0-shard-00-02-anf5p.azure.mongodb.net:27017/test-db?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
const secretKey = "secretKey";

mongoose.connect(
    uri,
    {useNewUrlParser: true, useUnifiedTopology: true},
    err => {
        if (err) console.error(err);
        else console.log("connected to database");
    });

function verifyToken(req, resp, next) {
    if (!req.headers.authorization) {
        return resp.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return resp.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, secretKey);
    if (!payload) {
        return resp.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
}


router.get('/', function (req, resp) {
    resp.send('From api route')
});

router.post('/register', (req, resp) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((err, registered) => {
        if (err) {
            console.error(err)
        } else {
            let payload = {subject: registered._id};
            let token = jwt.sign(payload, secretKey);
            resp.status(200).send({token});
        }
    })
});

router.post('/login', (req, resp) => {
    let userData = req.body;

    User.findOne({email: userData.email}, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (!user) {
                resp.status(401).send('Invalid email');
            } else if (user.password !== userData.password) {
                resp.status(401).send('Invalid password');
            } else {
                let payload = {subject: user._id};
                let token = jwt.sign(payload, secretKey);
                resp.status(200).send({token});
            }
        }
    });
});

router.get('/events', (req, resp) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ];
    resp.json(events);
});

router.get('/special', verifyToken, (req, resp) => {
    let specialEvents = [
        {
            "_id": "1",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ];
    resp.json(specialEvents);
});

module.exports = router;
