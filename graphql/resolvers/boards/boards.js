const Board = require("../../../db/models/Board")
const UserBoard = require("../../../db/models/UserBoards")

const BOARD = {
  formatBoards: (boards) => {
    return boards.map(board => {
      return {
        ...board._doc,
        createdAt: new Date(board.createdAt),
        updatedAt: new Date(board.updatedAt)
      }
    })
  },
  formatBoard: (board) => {
    return {
      ...board._doc,
      createdAt: new Date(board.createdAt),
      updatedAt: new Date(board.updatedAt)
    }
  }
}

const USERBOARD = {
  formatUserBoard: (userBoard) => {
    return {
      ...userBoard._doc,
      createdAt: new Date(userBoard.createdAt),
      updatedAt: new Date(userBoard.updatedAt)
    }
  }
}

const boards = () => {
  return Board.find()
  .then(results => BOARD.formatBoards(results))
  .catch(err => {
    throw err
  })
}

const userboards = (args) => {
  return UserBoard.findOne({user: args.userBoardInput.userID})
  .populate('boards')
  .exec()
  .then(userboard => {
    const userBoard = {
      _id: userboard._id,
      user: userboard.user,
      boards: [ 
        ...userboard.boards.map(board => BOARD.formatBoard(board))
       ],
      createdAt: userboard.createdAt,
      updatedAt: userboard.updatedAt
    }
    return userBoard
  })
  .catch(err => {
    return err
  })
}

const board = (args) => {
  const query = {_id: args.getBoardInput._id}
  return Board.findOne(query)
  .then(result => {
    console.log(result)
    return BOARD.formatBoard(result)
  })
  .catch(err => {
    throw err
  })
}

const createBoard = (args) => {
  const userID = args.boardInput.userID
  const board = new Board({
    name: args.boardInput.name,
    about: args.boardInput.about,
    visibility: args.boardInput.visibility ? args.boardInput.visibility : "private",
    color: args.boardInput.color ? args.boardInput.color : "blue",
    due: args.boardInput.due,
    flag: args.boardInput.flag
  })

  return board.save()
  .then(result => {
    UserBoard.findOne({user: userID})
    .then(userBoard => {
      if (!userBoard) {
        const newUserBoard = new UserBoard({
          user: userID,
          boards: [result._id]
        })
        
        newUserBoard.save()
        .then(() => {
          
        })
      } else {
        UserBoard.updateOne(
          { user: userID },
          { $push: { boards: [result._id] } },
          function(err, result) {
            if (err) {
              return err
            }
          }
        );
      }
    })
    .catch(err => {
      throw err
    })
    return result
  })
  .catch(err => {
    throw err
  })
  return board
}

const editBoard = (args) => {
  const board = {
    name: args.editBoardInput.name,
    visibility: args.editBoardInput.visibility,
    color: args.editBoardInput.color,
    about: args.editBoardInput.about,
    flag: args.editBoardInput.flag
  }

  const query = {_id: args.editBoardInput._id}
  return Board.findOneAndUpdate(query, board, {new: true, useFindAndModify: false}, (err, docs) => {
    if (err) {
      return err
    }
    return docs

  })
}

const removeBoard = (args) => {
  const board = {
    flag: 2
  }

  const query = {_id: args.removeBoardInput._id}
  return Board.findOneAndUpdate(query, board, {new: true, useFindAndModify: false})
  .then(res => {
    return {
      message: "Board removed!"
    }
  })
  .catch(err => {
    console.log(1, err)
  })
}

module.exports = {
  board,
  boards,
  userboards,
  createBoard,
  editBoard,
  removeBoard
}