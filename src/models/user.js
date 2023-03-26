import { DataTypes, Model } from 'sequelize';
import { hash } from 'bcrypt';

export default function (sequelize) {
  class User extends Model {}

  User.init(
    {
      email: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'user',
      timestamps: true,
      deletedAt: false,
    }
  );

  User.addHook('beforeSave', async (instance) => {
    if (instance.changed('password')) {
      const saltRounds = 10;
      instance.password = await hash(instance.password, saltRounds);
    }
  });

  return User;
}
