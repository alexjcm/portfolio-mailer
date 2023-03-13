const express = require('express');
const sqlite3 = require('sqlite3');
const myModels = require('../models');

const router = express.Router();

//Sync Database
myModels.sync().then(function () {
    console.log('Connected to database')
}).catch(function (err) {
    console.log('Error connecting to database: ', err)
});

/**
 * Get all active projects
 */
router.get('/projects', function (req, res, next) {
    try {
        myModels.models.project.findAll({ where: { status: true }}).then(projt => {
            res.status(200).json(projt);
        }).catch(function (err) {
            console.error('error:', err)
        });
    } catch (error) {
        return next(error);
    }
});

router.post('/projects', function (req, res, next) {
    try {
        myModels.models.project.create({
            name: req.body.name,
            description: req.body.description,
            link: req.body.link,
            status: req.body.status
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

/**
 * GET /projectById/:id
 */
router.get('/projectById/:id', function (req, res, next) {
    try {
        const { id: projectId } = req.params;

        myModels.models.project.findOne({
            where: { id: projectId },
        }).then(projt => {
            res.status(200).json(projt);
        }).catch(err => {
            console.error('err:', err)
            res.status(405).json('Error has occured');
        });
    } catch (error) {
        console.log('errorD:', error)
        return next(error);
    }
});

module.exports = router;
