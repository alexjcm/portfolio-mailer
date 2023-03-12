const { Sequelize } = require("sequelize");
const config = require('../config/sequelize');
const projectModel = require('./project');

const env = process.env.NODE_ENV || "development";
const sequelizeConfig = config[env];
const sequelize = new Sequelize(sequelizeConfig);

console.log('env:', env)

const modelDefiners = [
    projectModel,
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// Associations
Object.keys(sequelize.models)
    .forEach((modelName) => {
        if (sequelize.models[modelName].associate) {
            sequelize.models[modelName].associate(sequelize.models);
        }
    });

module.exports = sequelize;