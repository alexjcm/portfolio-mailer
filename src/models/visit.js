import { Sequelize, DataTypes } from 'sequelize';

export default function (sequelize) {
  class Visit extends Sequelize.Model {}

  Visit.init(
    {
      counter: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'visit',
    }
  );

  return Visit;
}
