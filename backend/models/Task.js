const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Project = require('./Project');

const Task = sequelize.define('Task', {
  title:       { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: {
    type: DataTypes.ENUM('todo', 'doing', 'done'),
    defaultValue: 'todo',
  },
});

Task.belongsTo(Project, { foreignKey: 'projectId', onDelete: 'CASCADE' });
Project.hasMany(Task, { foreignKey: 'projectId' });

module.exports = Task;
