import { Sequelize } from 'sequelize';
import * as config from '../config/sequelize';
import projectModel from '../models/project';
import userModel from '../models/user';
import visitModel from '../models/visit';

const env = process.env.NODE_ENV || 'development';
const sequelizeConfig = config[env];
const sequelize = new Sequelize(sequelizeConfig);
const modelDefiners = [projectModel, userModel, visitModel];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

export default sequelize;
