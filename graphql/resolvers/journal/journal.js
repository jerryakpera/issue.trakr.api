const UserJournals = require("../../../db/models/UserJournals")
const _ = require("../../../modules/utils")

const OpenJournal = require("../../../services/helpers/Journal").OpenJournal
const ReflectionJournal = require("../../../services/helpers/Journal").ReflectionJournal
const WeedingJournal = require("../../../services/helpers/Journal").WeedingJournal

const createJournal = (args) => {
  const newJournal = {
    type: args.newJournal.type,
    title: args.newJournal.title,
    rating: args.newJournal.rating,
    goodthings: args.newJournal.goodthings,
    badthings: args.newJournal.badthings,
    objective: args.newJournal.objective,
    subjective: args.newJournal.subjective,
    entry: args.newJournal.entry,
    user: args.newJournal.user
  }
  
  var journal
  
  if (newJournal.type === "open") {
    journal = new OpenJournal(newJournal)
  }
  if (newJournal.type === "reflection") {
    journal = new ReflectionJournal(newJournal)
  }
  if (newJournal.type === "weeding") {
    journal = new WeedingJournal(newJournal)
  }
  
  return journal.save()
  .then(res => {
    return res
  })
  .catch(err => {
    return err
  })
}

const fetchUserJournals = (args) => {
  const userQuery = {user: args.userInput.user}

  return UserJournals.findOne(userQuery)
  .populate("openjournals")
  .populate("reflectionjournals")
  .populate("weedingjournals")
  .exec()
  .then(userJournals => {
    const userJournal = userJournals._doc
    const journals = []
    for (let [key, arr] of Object.entries(userJournal)) {
      if (Array.isArray(arr)) {
        journals.push( ...arr )
      }
    }

    return journals 
  })
}

const deleteJournal = (args) => {
  const journalToDelete = {
    type: args.deleteJournalInput.type,
    id: args.deleteJournalInput.id
  }
  
  var journal
  
  if (journalToDelete.type === "open") {
    journal = new OpenJournal(journalToDelete)
  }
  if (journalToDelete.type === "reflection") {
    journal = new ReflectionJournal(journalToDelete)
  }
  if (journalToDelete.type === "weeding") {
    journal = new WeedingJournal(journalToDelete)
  }
  
  return journal.delete()
  .then(() => {
    return true
  })
  .catch(err => {
    return err
  })
}

module.exports = {
  createJournal,
  fetchUserJournals,
  deleteJournal
}