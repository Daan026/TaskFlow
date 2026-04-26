const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Project = sequelize.define('Project', {
  name:        { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
});

Project.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Project, { foreignKey: 'userId' });

module.exports = Project;
