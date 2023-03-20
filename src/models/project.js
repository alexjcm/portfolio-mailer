import { DataTypes, Model } from 'sequelize';

export default function (sequelize) {
  class Project extends Model {}

  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      projectLink: {
        type: DataTypes.STRING(255),
      },
      imageProjectLink: {
        type: DataTypes.STRING(255),
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize, // We need to pass the connection instance
      modelName: 'project', // We need to choose the model name
      timestamps: true,
      deletedAt: false,
    }
  );

  return Project;
}
