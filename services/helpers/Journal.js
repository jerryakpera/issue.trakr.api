const OPENJOURNAL = require("../../db/models/OpenJournal/index")
const REFLECTIONJOURNAL = require("../../db/models/ReflectionJournal/")
const WEEDINGJOURNAL = require("../../db/models/WeedingJournal/")
const USERJOURNALS = require("../../db/models/UserJournals")

class Journal {
  constructor(journal) {
    this.journal = {
      ...journal
    }
  }
}

class OpenJournal extends Journal {
  save() {
    return new Promise((resolve, reject) => {
      const userQuery = { user: this.journal.user }
      const newJournal = new OPENJOURNAL({
        ...this.journal
      })
  
  
      return newJournal.save()
      .then(savedJournal => {
        USERJOURNALS.findOne(userQuery)
        .then(userJournals => {
          if (!userJournals) {
            const newUserJournals = new USERJOURNALS({
              user: this.journal.user,
              openjournals: [savedJournal._id]
            })
  
            newUserJournals.save()
            .then(() => {
              resolve(savedJournal)
            })
            .catch(err => {
              reject(err)
            })
          } else {
            userJournals.openjournals.push(savedJournal._id)
  
            userJournals.save()
            .then(() => {
              resolve(savedJournal)
            })
            .catch(err => {
              reject(err)
            })
            return
          }
        })
      })
    })
  }
}

class ReflectionJournal extends Journal {
  save() {
    return new Promise((resolve, reject) => {
      const userQuery = { user: this.journal.user }
      const newJournal = new REFLECTIONJOURNAL({
        ...this.journal
      })
  
  
      return newJournal.save()
      .then(savedJournal => {
        USERJOURNALS.findOne(userQuery)
        .then(userJournals => {
          if (!userJournals) {
            const newUserJournals = new USERJOURNALS({
              user: this.journal.user,
              reflectionjournals: [savedJournal._id]
            })
  
            newUserJournals.save()
            .then(() => {
              resolve(savedJournal)
            })
            .catch(err => {
              reject(err)
            })
          } else {
            userJournals.reflectionjournals.push(savedJournal._id)
  
            userJournals.save()
            .then(() => {
              resolve(savedJournal)
            })
            .catch(err => {
              reject(err)
            })
            return
          }
        })
      })
    })
  }
}

class WeedingJournal extends Journal {
  save() {
    return new Promise((resolve, reject) => {
      const userQuery = { user: this.journal.user }
      const newJournal = new WEEDINGJOURNAL({
        ...this.journal
      })
  
  
      return newJournal.save()
      .then(savedJournal => {
        USERJOURNALS.findOne(userQuery)
        .then(userJournals => {
          if (!userJournals) {
            const newUserJournals = new USERJOURNALS({
              user: this.journal.user,
              weedingjournals: [savedJournal._id]
            })
  
            newUserJournals.save()
            .then(() => {
              resolve(savedJournal)
            })
            .catch(err => {
              reject(err)
            })
          } else {
            userJournals.weedingjournals.push(savedJournal._id)
  
            userJournals.save()
            .then(() => {
              resolve(savedJournal)
            })
            .catch(err => {
              reject(err)
            })
            return
          }
        })
      })
    })
  }
}

module.exports = {
  OpenJournal,
  ReflectionJournal,
  WeedingJournal,
}