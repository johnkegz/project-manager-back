const express = require('express')
const graphqlHTTP = require('express-graphql')
var { buildSchema } = require('graphql');
// const schema = require('./schema')

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const app = express();
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(8081, ()=>{
    console.log("server running on port 8081")
})