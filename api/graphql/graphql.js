const graphqlHttp = require("express-graphql")

const express = require("express")
const router = express.Router()

const TOKEN = require("../../modules/token/token")

const schema = require("../../graphql/schema/index")
const root = require("../../graphql/resolvers/")

// Create graphql endpoint 
router.use("/", graphqlHttp({
  // Schema points to schemas
  schema,
  // rootValue Points to resolvers
  rootValue: root,
  graphiql: true
}))

module.exports = router