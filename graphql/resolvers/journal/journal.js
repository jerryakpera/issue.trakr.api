const UserContent = require("../../../db/models/UserContent")
// const OpenJournal = require("../../../db/models/OpenJournal")
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
    console.log("open journal")
    journal = new OpenJournal(newJournal)
  }
  if (newJournal.type === "reflection") {
    console.log("reflection journal")
    journal = new ReflectionJournal(newJournal)
  }
  if (newJournal.type === "weeding") {
    console.log("weeding journal")
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

module.exports = {
  createJournal
}