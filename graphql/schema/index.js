const { buildSchema } = require("graphql")

const schema = buildSchema(`
  type Query {
    userTasks(getTasksInput: GetTasksInput): [Task]
    milestones(getMilestonesInput: GetMilestonesInput): [Milestone]
    fetchUserRetrospects(fetchRetrospectsInput: FetchRetrospectsInput): [Retrospect]
    fetchHomeBoard(fetchHomeBoardInput: FetchHomeBoardInput): HomeBoard
    fetchUserWords(fetchUserWordsInput: FetchUserWordsInput): [Word]
    fetchWords: [Word]
  }

  type Mutation {
    removeVocabFromUser(userVocabInput: UserVocabInput): Word
    addVocabToUser(userVocabInput: UserVocabInput): Word
    createWord(wordInput: WordInput): Word
    createQuote(quoteInput: QuoteInput): Quote
    createGoodThings(goodThingsInput: GoodThingsInput): GoodThings
    createBadThings(badThingsInput: BadThingsInput): BadThings
    createProgress(progressInput: ProgressInput): Progress
    createRetrospect(retrospectInput: RetrospectInput): Retrospect
    createMilestone(milestoneInput: MilestoneInput): Milestone
    createJournal(newJournal: NewJournal): Journal
    editMilestone(editMilestoneInput: EditMilestoneInput): Milestone
    deleteMilestone(deleteMilestoneInput: DeleteMilestoneInput): Boolean
    deleteTask(deleteTaskInput: DeleteTaskInput): Boolean
    editTask(editTaskInput: EditTaskInput): Task
    createTask(taskInput: TaskInput): Task
  }

  input FetchRetrospectsInput {
    user: String!
  }

  input FetchUserWordsInput {
    user: String!
  }

  input UserVocabInput {
    user: String!
    vocab: String!
  }

  input RetrospectInput {
    title: String!
    rating: Int!
    goodthings: String
    badthings: String
    progress: String
    journal: String
    quote: String
    user: String!
  }

  type Retrospect {
    _id: ID!
    title: String!
    rating: Int!
    goodthings: GoodThings
    badthings: BadThings
    progress: Progress
    quote: Quote
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

  input NewJournal {
    type: String!
    title: String!
    rating: Int
    goodthings: String
    badthings: String
    objective: String
    subjective: String
    entry: String!
    user: String!
  }

  type Journal {
    _id: ID!
    type: String!
    title: String!
    entry: String!
    rating: Int
    goodthings: String
    badthings: String
    objective: String
    subjective: String
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

  input GetTasksInput {
    user: String!
  }

  input DeleteTaskInput {
    milestoneID: String!
    taskID: String!
  }

  input DeleteMilestoneInput {
    milestoneID: String!
  }

  input EditMilestoneInput {
    milestoneID: String!
    name: String!
    group: Int!
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

  input EditTaskInput {
    _id: String!
    name: String!
    completed: Boolean!
    dueTime: String
    dueDate: String
    user: String!
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
    remainingDays: Int
    createdAt: String!
    updatedAt: String!
  }

  input FetchHomeBoardInput {
    user: String!
  }

  type HomeBoard {
    _id: ID!
    title: String
    journal: String
    progress: Progress
    goodthings: GoodThings
    displayDate: String!
    rating: Int
  }
`)

module.exports =  schema