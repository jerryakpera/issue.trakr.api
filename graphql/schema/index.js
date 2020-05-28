const { buildSchema } = require("graphql")

const schema = buildSchema(`
  type Query {
    milestones(getMilestonesInput: GetMilestonesInput): [Milestone]
    fetchUserRetrospects(fetchRetrospectsInput: FetchRetrospectsInput): [Retrospect]
  }

  type Mutation {
    createWord(wordInput: WordInput): Word
    createQuote(quoteInput: QuoteInput): Quote
    createJournal(journalInput: JournalInput): Journal
    createGoodThings(goodThingsInput: GoodThingsInput): GoodThings
    createBadThings(badThingsInput: BadThingsInput): BadThings
    createProgress(progressInput: ProgressInput): Progress
    createRetrospect(retrospectInput: RetrospectInput): Retrospect
    createMilestone(milestoneInput: MilestoneInput): Milestone
    deleteMilestone(deleteMilestoneInput: DeleteMilestoneInput): Boolean
    createTask(taskInput: TaskInput): Task
  }

  input FetchRetrospectsInput {
    user: String!
  }

  input RetrospectInput {
    title: String!
    rating: Int!
    goodthings: String
    badthings: String
    progress: String
    journal: String
    quote: String
    word: String
    user: String!
  }

  type Retrospect {
    _id: ID!
    title: String!
    rating: Int!
    goodthings: GoodThings
    badthings: BadThings
    progress: Progress
    journal: Journal
    quote: Quote
    word: Word
    user: String!
    displayDate: String!
    createdAt: String!
    updatedAt: String!
  }

  input ProgressInput {
    one: String
    two: String
    three: String
    user: String!
  }

  type Progress {
    _id: ID!
    one: String
    two: String
    three: String
    createdAt: String!
    updatedAt: String!
  }

  input BadThingsInput {
    one: String
    two: String
    three: String
    user: String!
  }

  type BadThings {
    _id: ID!
    one: String
    two: String
    three: String
    createdAt: String!
    updatedAt: String!
  }

  input GoodThingsInput {
    one: String
    two: String
    three: String
    user: String!
  }

  type GoodThings {
    _id: ID!
    one: String
    two: String
    three: String
    createdAt: String!
    updatedAt: String!
  }

  input JournalInput {
    journal: String
    user: String!
  }

  type Journal {
    _id: ID!
    journal: String
    createdAt: String!
    updatedAt: String!
  }

  input QuoteInput {
    text: String!
    author: String
    user: String!
  }

  type Quote {
    _id: ID!
    text: String!
    author: String
    createdAt: String!
    updatedAt: String!
  }

  input WordInput {
    word: String!
    definition: String!
    user: String!
  }

  type Word {
    _id: ID!
    word: String!
    definition: String!
    createdAt: String!
    updatedAt: String!
  }

  input GetMilestonesInput {
    user: String!
  }

  input DeleteMilestoneInput {
    milestoneID: String!
  }

  input MilestoneInput {
    name: String!
    group: Int!
    user: String!
  }

  type Milestone {
    _id: ID!
    name: String!
    user: String!
    group: Int!
    tasks: [Task]
    createdAt: String!
    updatedAt: String!
  }

  input TaskInput {
    name: String!
    user: String!
    milestone: String!
    dueTime: String
    dueDate: String
  }

  type Task {
    _id: ID!
    name: String!
    user: String!
    completed: Boolean!
    dueTime: String
    dueDate: String
    createdAt: String!
    updatedAt: String!
  }
`)

module.exports =  schema