const UserContent = require("../../../db/models/UserContent")

const Word = require("../../../db/models/Word")
const Quote = require("../../../db/models/Quote")
const Journal = require("../../../db/models/Journals")
const GoodThings = require("../../../db/models/GoodThings")
const BadThings = require("../../../db/models/BadThings")
const Progress = require("../../../db/models/Progress")
const Retrospect = require("../../../db/models/Retrospect")

const _ = require("../../../modules/utils")

const createWord = (args) => {
  const newWord = new Word({
    word: args.wordInput.word,
    definition: args.wordInput.definition,
  })
  
  return newWord.save()
  .then(word => {
    const userQuery = {user: args.wordInput.user}
    UserContent.findOne(userQuery)
    .then(userContent => {
      if (!userContent) {
        const newUserContent = new UserContent({
          user: args.wordInput.user,
          words: [word._id]
        })

        newUserContent.save()
        .then(() => {
          return word
        })
        .catch(err => {
          return err
        })
        return
      } else {
        userContent.words.push(word._id)
        userContent.save()
        .then(() => {
          return word
        })
        .catch(err => {
          return err
        })
        return
      }
    })
    .catch(err => {
      return err
    })
    return word
  })
  .catch(err => {
    return err
  })
}

const createQuote = (args) => {
  const newQuote = new Quote({
    text: args.quoteInput.text,
    author: args.quoteInput.author,
  })
  
  return newQuote.save()
  .then(quote => {
    const userQuery = {user: args.quoteInput.user}
    UserContent.findOne(userQuery)
    .then(userQuote => {
      if (!userQuote) {
        const newUserContent = new UserContent({
          user: args.quoteInput.user,
          quotes: [quote._id]
        })

        newUserContent.save()
        .then(() => {
          return quote
        })
        .catch(err => {
          return err
        })
        return
      } else {
        userQuote.quotes.push(quote._id)
        userQuote.save()
        .then(() => {
          return quote
        })
        .catch(err => {
          return err
        })
        return
      }
    })
    .catch(err => {
      return err
    })
    return quote
  })
  .catch(err => {
    return err
  })
}

const createJournal = (args) => {
  const newJournal = new Journal({
    journal: args.journalInput.journal,
  })
  
  return newJournal.save()
  .then(journal => {
    const userQuery = {user: args.journalInput.user}
    UserContent.findOne(userQuery)
    .then(userJournal => {
      if (!userJournal) {
        const newUserContent = new UserContent({
          user: args.journalInput.user,
          journals: [journal._id]
        })

        newUserContent.save()
        .then(() => {
          return journal
        })
        .catch(err => {
          return err
        })
        return
      } else {
        userJournal.journals.push(journal._id)
        userJournal.save()
        .then(() => {
          return journal
        })
        .catch(err => {
          return err
        })
        return
      }
    })
    .catch(err => {
      return err
    })
    return journal
  })
  .catch(err => {
    return err
  })
}

const createGoodThings = (args) => {
  const newGoodThing = new GoodThings({
    one: args.goodThingsInput.one,
    two: args.goodThingsInput.two,
    three: args.goodThingsInput.three,
  })
  
  return newGoodThing.save()
  .then(goodThings => {
    const userQuery = {user: args.goodThingsInput.user}
    UserContent.findOne(userQuery)
    .then(userGoodThings => {
      if (!userGoodThings) {
        const newUserContent = new UserContent({
          user: args.goodThingsInput.user,
          goodthings: [goodThings._id]
        })

        newUserContent.save()
        .then(() => {
          return goodThings
        })
        .catch(err => {
          return err
        })
        return
      } else {
        userGoodThings.goodthings.push(goodThings._id)
        userGoodThings.save()
        .then(() => {
          return goodThings
        })
        .catch(err => {
          return err
        })
        return
      }
    })
    .catch(err => {
      return err
    })
    return goodThings
  })
  .catch(err => {
    return err
  })
}

const createBadThings = (args) => {
  const newBadThing = new BadThings({
    one: args.badThingsInput.one,
    two: args.badThingsInput.two,
    three: args.badThingsInput.three,
  })
  
  return newBadThing.save()
  .then(badThings => {
    const userQuery = {user: args.badThingsInput.user}
    UserContent.findOne(userQuery)
    .then(userBadThings => {
      if (!userBadThings) {
        const newUserContent = new UserContent({
          user: args.badThingsInput.user,
          badthings: [badThings._id]
        })

        newUserContent.save()
        .then(() => {
          return badThings
        })
        .catch(err => {
          return err
        })
        return
      } else {
        userBadThings.badthings.push(badThings._id)
        userBadThings.save()
        .then(() => {
          return badThings
        })
        .catch(err => {
          return err
        })
        return
      }
    })
    .catch(err => {
      return err
    })
    return badThings
  })
  .catch(err => {
    return err
  })
}

const createProgress = (args) => {
  const newBadThing = new Progress({
    one: args.progressInput.one,
    two: args.progressInput.two,
    three: args.progressInput.three,
  })
  
  return newBadThing.save()
  .then(progress => {
    const userQuery = {user: args.progressInput.user}
    UserContent.findOne(userQuery)
    .then(userProgress => {
      if (!userProgress) {
        const newUserContent = new UserContent({
          user: args.progressInput.user,
          progress: [progress._id]
        })

        newUserContent.save()
        .then(() => {
          return progress
        })
        .catch(err => {
          return err
        })
        return
      } else {
        userProgress.progress.push(progress._id)
        userProgress.save()
        .then(() => {
          return progress
        })
        .catch(err => {
          return err
        })
        return
      }
    })
    .catch(err => {
      return err
    })
    return progress
  })
  .catch(err => {
    return err
  })
}

const createRetrospect = (args) => {
  const newRetrospect = new Retrospect({
    title: args.retrospectInput.title,
    rating: args.retrospectInput.rating,
    goodthings: args.retrospectInput.goodthings,
    badthings: args.retrospectInput.badthings,
    progress: args.retrospectInput.progress,
    journal: args.retrospectInput.journal,
    quote: args.retrospectInput.quote,
    word: args.retrospectInput.quote,
    user: args.retrospectInput.user,
  })

  return newRetrospect.save()
  .then(retrospect => {
    return retrospect
  })
  .catch(err => {
    return err
  })
}

const fetchUserRetrospects = (args) => {
  const query = {user: args.fetchRetrospectsInput.user}
  return Retrospect.find(query)
  .populate("goodthings")
  .populate("badthings")
  .populate("journal")
  .populate("progresses")
  .populate("quote")
  .populate("word")
  .exec()
  .then(retrospects => {
    return retrospects.map(retrospect => {
      retrospect.displayDate = new Date(retrospect.createdAt).toDateString()
      return retrospect
    })
  })
  .catch(err => {
    return err
  })
}

module.exports = {
  createWord,
  createQuote,
  createJournal,
  createGoodThings,
  createBadThings,
  createProgress,
  createRetrospect,
  fetchUserRetrospects,
}