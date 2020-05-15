const { buildSchema } = require("graphql")

const schema = buildSchema(`
  type Query {
    task(id: String!): Task
    tasks: [Task]
    boards: [Board] 
    userboards(userBoardInput: UserBoardInput): UserBoard
    board(getBoardInput: GetBoardInput): Board
  }

  type Mutation {
    createTask(taskInput: TaskInput): Task
    createBoard(boardInput: BoardInput): Board
    removeBoard(removeBoardInput: RemoveBoard): BoardRemoved
    editBoard(editBoardInput: EditBoard): Board
    editTask(editTaskInput: EditTask): Task
  }

  input UserBoardInput {
    userID: String!
  }

  input TaskInput {
    name: String!
    pomodoro: Boolean!
  }

  input EditTask {
    _id: String!
    name: String!
    pomodoro: Boolean!
    flag: Int!
  }
  
  input EditBoard {
    _id: String!
    name: String
    about: String
    color: String
    visibility: String
    flag: Int
  }
  
  input RemoveBoard {
    _id: String!
    user: String!
  }

  type Task {
    _id: ID!
    name: String!
    flag: Int!
    pomodoro: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type BoardRemoved {
    message: String!
  }

  input BoardInput {
    userID: String!
    name: String!
    about: String
    visibility: String
    color: String
    due: String
    flag: Int!
  }

  input GetBoardInput {
    _id: ID!
  }

  type Board {
    _id: ID!
    name: String!
    about: String
    color: String
    due: String
    visibility: String
    flag: Int!
    createdAt: String!
    updatedAt: String!
  }

  type UserBoard {
    _id: ID!
    user: ID!
    boards: [Board!]
    createdAt: String!
    updatedAt: String!
  }
`)

module.exports =  schema