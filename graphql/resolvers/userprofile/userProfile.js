const User = require("../../../db/models/User/")
const Task = require("../../../db/models/Task/")
const UserJournal = require("../../../db/models/UserJournals/")

const _ = require("../../../modules/utils")

const fetchUserProfile = args => {
  const userID = args.userInput.user
  const userQuery = {_id: userID}
  const userProfile = {
    userID,
    tasks: {},
    journals: {}
  }
  return User.findOne(userQuery)
  .then(user => {
    userProfile.email = user.email
    userProfile.username = user.username
    userProfile.flag = user.flag
    userProfile.createdDate = new Date(user.createdAt).toDateString()

    return Task.find({user: userID})
    .then(tasks => {
      userProfile.tasks.all = tasks.length
      userProfile.tasks.complete = tasks.filter(task => task.completed).length
      userProfile.tasks.incomplete = tasks.filter(task => !task.completed).length

      return UserJournal.findOne({user: userID})
      .then(userJournals => {
        userProfile.journals.all = userJournals.openjournals.length + userJournals.weedingjournals.length + userJournals.reflectionjournals.length
        userProfile.journals.open = userJournals.openjournals.length
        userProfile.journals.weeding = userJournals.weedingjournals.length
        userProfile.journals.reflection = userJournals.reflectionjournals.length

        return userProfile
      })
    })
  })

  return true
}

module.exports = {
  fetchUserProfile
}