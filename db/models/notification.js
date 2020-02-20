'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.STRING,
    projectId: DataTypes.STRING
  }, {});
  Notification.associate = function(models) {
    // associations can be defined here
  };
  return Notification;
};