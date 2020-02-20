const model = require("../db/models");

async function getUser(data) {
  try {
    const user = await model.User.findOne({
      where: {
        email: data.email
      }
    });
    return user;
  } catch (error) {
    return error;
  }
}

async function createUser(data) {
  try {
    const email = await model.User.findOne({
      where: {
        email: data.email
      }
    });
    if (email) {
      return "user email exists";
    } else {
      const user = await model.User.create(data);
      return user;
    }
  } catch (error) {
    return error;
  }
}

module.exports = {
  createUser,
  getUser
};
