const { DataTypes, Model } = require('sequelize');

module.exports = function (sequelize) {
    class Project extends Model { }

    Project.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING(255),
            allowNull: true,
        }
    }, {
        sequelize, // We need to pass the connection instance
        modelName: 'project', // We need to choose the model name
    });

    return Project;
}