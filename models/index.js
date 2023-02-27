const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require('../config/sequelize');
const sequelizeConfig = config[env];
const projectModel = require('./project');
const sequelize = new Sequelize(sequelizeConfig);
const db = {};

const modelDefiners = [
    projectModel,
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}
// if (config.use_env_variable) {
//     var sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//     var sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs.readdirSync(__dirname).filter(function (file) {
//     return (file.indexOf(".") !== 0) && (file !== "index.js");
// }).forEach(function (file) {
//     const model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
// });
// // Or
// fs.readdirSync(__dirname).filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   }).forEach(file => {
//     const model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Associations

// Object.keys(db).forEach(function (modelName) {
//     if ("associate" in db[modelName]) {
//         db[modelName].associate(db);
//     }
// });
// // Or
// Object.keys(db).forEach(modelName => {
//     if (db[modelName].associate) {
//         db[modelName].associate(db);
//     }
// });

// Associations
Object.keys(sequelize.models)
    .forEach((modelName) => {
        if (sequelize.models[modelName].associate) {
            sequelize.models[modelName].associate(sequelize.models);
        }
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
//module.exports = sequelize;