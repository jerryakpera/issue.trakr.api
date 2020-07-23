const {
  createWord,
  createQuote,
  createGoodThings,
  createBadThings,
  createProgress,
  createRetrospect,
  fetchUserRetrospects,
  fetchHomeBoard,
  fetchUserWords,
  fetchWords,
  addVocabToUser,
  removeVocabFromUser
} = require("./content/content")

const {
  milestones,
  userTasks,
  createMilestone,
  editMilestone,
  createTask,
  editTask,
  deleteMilestone,
  deleteTask
} = require("./milestone/milestone")

const {
  createJournal,
  fetchUserJournals,
  deleteJournal
} = require("./journal/journal")

const {
  fetchUserProfile
} = require("./userprofile/userProfile")

module.exports = {
  createWord,
  createQuote,
  createGoodThings,
  createBadThings,
  createProgress,
  createRetrospect,
  fetchUserRetrospects,
  fetchHomeBoard,
  fetchUserWords,
  fetchWords,
  addVocabToUser,
  removeVocabFromUser,

  userTasks,
  milestones,
  createMilestone,
  editMilestone,
  createTask,
  editTask,
  deleteMilestone,
  deleteTask,

  createJournal,
  fetchUserJournals,
  deleteJournal,

  fetchUserProfile
}