const express = require('express');
const sqlite3 = require('sqlite3');
const router = express.Router();
//const db = require("../database")
//const project = require('../models/project');
const models = require('../models');

//Sync Database
models.sequelize.sync().then(function () {
    console.log('Connected to database')
}).catch(function (err) {
    console.log('error: ', err)
});

//console.log('models.sequelize: ', models.sequelize)
//console.log('models.sequelize.models: ', models.sequelize.models)
router.get('/projects', function (req, res, next) {
    try {
        models.sequelize.models.project.findAll().then(projt => {
            res.status(200).json(projt);
        }).catch(function (err) {
            console.log('errorX:', err)
        });
    } catch (error) {
        return next(error);
    }
});

router.post('/projects', function (req, res, next) {
    try {
        models.sequelize.models.project.create({
            name: req.body.name,
            description: req.body.description,
            link: req.body.link
        }).then(projt => {
            res.status(200).json(projt);
        }).catch(err => {
            res.status(405).json('Error has occured');
        });
    } catch (error) {
        console.log('errorD:', error)
        return next(error);
    }
});

module.exports = router;
