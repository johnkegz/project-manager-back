const graphql = require('graphql')
const _ = require("lodash")

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList
} =graphql;


const projects = [
    {title: "kick one out", userId: "1", description: "N/A", id:"1"},
    {title: "kick one out2", userId: "1", description: "N/A", id:"4"},
    {title: "Fix a bug", userId: "1", id:"2", description: "N/A", userId: "3"},
    {title: "tell some thing", userId: "1", description: "N/A", id:"3", userId: "3"},
]

const notifications = [
    {description: "joined the part", id:"1", userId: "21", productId:"1"},
    {description: "started project", id: "2", userId: "2", productId:"2"},
    {description: "deleted project", id:"3", userId: "9", productId:"3"},
]

const users = [
    {name: "John Kalyango", id:"1"},
    {name: "Paul Peters", id:"2"},
    {name: "James Rodrigez", id:"3"}
]

const notificationType = new GraphQLObjectType({
    name: "Notifications",
    fields: () =>({
        id: {type: GraphQLID },
        productId: {type: GraphQLString},
        userId: {type: GraphQLString},
        description: {type: GraphQLString}
    })
})

const projectType = new GraphQLObjectType({
    name: "Project",
    fields: () =>({
        id: {type: GraphQLID },
         title: {type: GraphQLString},
         userId: {type: GraphQLString },
         description: {type: GraphQLString},
         user:{
             type: userType,
             resolve(parent, args){
                return _.find(users, {id: parent.userId})
             }
         },
         notification:{
             type: notificationType,
             resolve(parent, args){
                return _.find(notifications, {id: parent.id})
             }
         }
    })
})


const userType = new GraphQLObjectType({
    name: "User",
    fields: () =>({
        id: {type: GraphQLID },
        name: {type: GraphQLString},
        projects: {
            type: new GraphQLList(projectType),
            resolve(parent, args){
                return _.filter(projects, {userId: parent.id})
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RouteQueryType',
    fields: {
        project:{
            type: projectType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(projects, {id: args.id});
            }
        },
        projects: {
            type: new GraphQLList(projectType),
            resolve(parent, args){
                return projects
            }
        },
        notification:{
            type: notificationType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(notifications, {id: args.id});
            }
        },
        notifications: {
            type: new GraphQLList(notificationType),
            resolve(parent, args){
                return notifications
            }
        },
        user:{
            type: userType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(users, {id: args.id});
            }
        },
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProject: {
            type: projectType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)},
                userId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                console.log("args", args)
            }
        },
        deleteProject: {
            type: projectType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                console.log("args", args)
            }
        },
        upDateProject: {
            type: projectType,
            args: {
                id: {type: GraphQLString},
                title: {type: GraphQLString},
                description: {type: GraphQLString},
                userId: {type: GraphQLString}
            },
            resolve(parent, args){
                console.log("args", args)
            }
        },
        addNotification: {
            type: notificationType,
            args: {
                userId: {type: GraphQLString},
                description: {type: GraphQLString},
            },
            resolve(parent, args){
                console.log("args", args)
            }
        },
        addUser: {
            type: userType,
            args: {
                name: {type: GraphQLString},
            },
            resolve(parent, args){
                console.log("args", args)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})