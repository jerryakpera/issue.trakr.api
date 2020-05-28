const {
  createWord,
  createQuote,
  createJournal,
  createGoodThings,
  createBadThings,
  createProgress,
  createRetrospect,
  fetchUserRetrospects
} = require("./content/content")

const {
  milestones,
  createMilestone,
  createTask,
  deleteMilestone
} = require("./milestone/milestone")

module.exports = {
  createWord,
  createQuote,
  createJournal,
  createGoodThings,
  createBadThings,
  createProgress,
  createRetrospect,
  fetchUserRetrospects,

  milestones,
  createMilestone,
  createTask,
  deleteMilestone,
}