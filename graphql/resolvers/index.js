const {
  task,
  tasks,
  createTask,
  editTask
} = require("./tasks/tasks")

const {
  board,
  boards,
  userboards,
  editBoard,
  removeBoard,
  createBoard
} = require("./boards/boards")

const {
  roadmap,
  editRoadmap
} = require("./roadmap/roadmap")

module.exports = {
  task,
  tasks,
  createTask,
  editTask,
  board,
  boards,
  userboards,
  editBoard,
  removeBoard,
  createBoard,
  roadmap,
  editRoadmap
}