const graphql = require("graphql");
const _ = require("lodash");
const {
  getProject,
  getProjects,
  createProject,
  deleteProject,
  upDateProject
} = require("../controllers/projectController");
const { createUser, getUser } = require("../controllers/userController");
const {
  addNotification,
  getNotifications
} = require("../controllers/notificationController");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} = graphql;

const projects = [
  { title: "kick one out", userId: "1", description: "N/A", id: "1" },
  { title: "kick one out2", userId: "1", description: "N/A", id: "4" },
  { title: "Fix a bug", userId: "1", id: "2", description: "N/A", userId: "3" },
  {
    title: "tell some thing",
    userId: "1",
    description: "N/A",
    id: "3",
    userId: "3"
  }
];

const users = [
  { name: "John Kalyango", id: "1" },
  { name: "Paul Peters", id: "2" },
  { name: "James Rodrigez", id: "3" }
];

const notificationType = new GraphQLObjectType({
  name: "Notifications",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    productId: { type: GraphQLString },
    userId: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});

const projectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: { type: GraphQLString },
    userId: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: userType,
      resolve(parent, args) {
        return _.find(users, { id: parent.userId });
      }
    },
    notifications: {
      type: notificationType,
      resolve(parent, args) {
        return _.find(notifications, { id: parent.id });
      }
    }
  })
});

const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    projects: {
      type: new GraphQLList(projectType),
      resolve(parent, args) {
        return _.filter(projects, { userId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RouteQueryType",
  fields: {
    project: {
      type: projectType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const project = await getProject(args.id);
        return project;
      }
    },
    projects: {
      type: new GraphQLList(projectType),
      async resolve(parent, args) {
        const projects = await getProjects();
        return projects;
      }
    },
    notification: {
      type: notificationType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const notification = await getNotification();
        return notification;
      }
    },
    notifications: {
      type: new GraphQLList(notificationType),
      async resolve(parent, args) {
        const notifications = await getNotifications();
        return notifications;
      }
    },
    user: {
      type: userType,
      args: { email: { type: GraphQLID } },
      resolve(parent, args) {
        const user = getUser(args);
        return user;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addProject: {
      type: projectType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parent, args) {
        const data = await createProject(args);
      }
    },
    deleteProject: {
      type: projectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        const data = await deleteProject(args);
      }
    },
    upDateProject: {
      type: projectType,
      args: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLString }
      },
      async resolve(parent, args) {
        const data = await upDateProject(args);
      }
    },
    addNotification: {
      type: notificationType,
      args: {
        userId: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        projectId: { type: GraphQLString }
      },
      async resolve(parent, args) {
        const data = await addNotification(args);
      }
    },
    addUser: {
      type: userType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(parent, args) {
        const data = await createUser(args);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
