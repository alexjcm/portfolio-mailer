const express = require('express');
const router = express.Router();
const db = require("../database")

router.get("/projects", (req, res, next) => {
    const sql = "SELECT * FROM projects"
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

router.get("/projects/", (req, res, next) => {
    console.log('get params', req.query);
    if (req.query && req.query.name) {
        search = '%' + req.query.name + '%';
    } else {
        search = '%';
    }
    db.all("SELECT * FROM projects where name like ?", [search], (err, rows) => {
        if (err) {
            console.log(err.message);
            res.status(400).json({ "error": "sql error" });
            return;
        }
        res.status(200).json(rows);
    });
});

router.post("/projects/", (req, res, next) => {
    const reqBody = req.body;
    console.log(reqBody);
    db.run("INSERT INTO projects (name) VALUES (?)",
        [reqBody.name],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).json({
                "id": this.lastID, "name": reqBody.name
            })
        });
});

module.exports = router;
