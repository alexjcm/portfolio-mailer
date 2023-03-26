import { Sequelize } from 'sequelize';
import * as config from '../config/sequelize';
import projectModel from '../models/project';
import userModel from '../models/user';

const env = process.env.NODE_ENV || 'development';
const sequelizeConfig = config[env];
const sequelize = new Sequelize(sequelizeConfig);
const modelDefiners = [projectModel, userModel];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// Associations
// Object.keys(sequelize.models).forEach((modelName) => {
//   if (sequelize.models[modelName].associate) {
//     sequelize.models[modelName].associate(sequelize.models);
//   }
// });

export default sequelize;
