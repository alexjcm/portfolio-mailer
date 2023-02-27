const sqlite3 = require('sqlite3');
const models = require('./models');
//const DBSOURCE = "/data/projects.db";
const DBSOURCE = '';

// const db = new sqlite3.Database(DBSOURCE, (err) => {
//     if (err) {
//         console.error("Error opening database " + err.message);
//         // throw err
//     } else {
//         db.run('CREATE TABLE projects(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name NVARCHAR(64) NOT NULL, description NVARCHAR(255) NOT NULL, link NVARCHAR(255))', (err) => {
//             if (err) {
//                 console.log("Table already exists.");
//                 return;
//             }
//             let insert = 'INSERT INTO projects (name, description) VALUES (?,?)';
//             db.run(insert, ['Markdown Editor', 'A lightweight markup language editor known as markdow that includes features such as code support, image support, mathematical symbols and formulas, and emoji chat.']);
//             db.run(insert, ['Covid-19 Global Cases Tracker', 'This web application includes features such as an interactive map, cases by country, cacunas deployed by country and new cases in the world.']);
//        });
//     }
// });

// //Sync Database
// models.sequelize.sync().then(function () {
//     console.log('connected to database')
// }).catch(function (err) {
//     console.log('error: ', err)
// });

//module.exports = db;