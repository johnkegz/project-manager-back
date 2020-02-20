const model = require("../db/models");
async function addNotification(data) {
    try {
          const notificationCreated = await model.Notification.create(data);
          return notificationCreated;
    } catch (error) {
      return error;
    }
  }

async function getNotifications() {
    try {
          const notifications = await model.Notification.findAll();
          return notifications;
    } catch (error) {
      return error;
    }
  }

  module.exports = {
    addNotification,
    getNotifications
  }