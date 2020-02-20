const model = require("../db/models");


async function getProject(id) {
  try {
    const project = await model.Project.findOne({
      where: {
        id: id
      }
    });
    return project;
  } catch (error) {
    return error;
  }
}

async function getProjects() {
  try {
    const projects = await model.Project.findAll();
    return projects;
  } catch (error) {
    return error;
  }
}
async function createProject(data) {
  try {
    const project = await model.Project.findOne({
      where: {
        title: data.title
      }
    });
    if (project) {
      return "project already exists";
    } else {
      const project = await model.Project.create(data);
      return project;
    }
  } catch (error) {
    return error;
  }
}

async function deleteProject(data) {
  try {
    const projectDeleted = await model.Project.destroy({
      where: {
        id: data.id
      }
    });
    return projectDeleted;
  } catch (error) {
    return error;
  }
}

async function upDateProject(data) {
  try {
    const projectUpdated = await model.Project.update(
      {
        title: data.title,
        description: data.description,
        userId: data.userId
      },
      {
        where: {
          id: data.id
        }
      }
    );
    return projectUpdated;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getProject,
  getProjects,
  createProject,
  deleteProject,
  upDateProject
};
