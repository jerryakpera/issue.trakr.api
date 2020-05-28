const Task = require("../../../db/models/Task")

const TASK = {
  formatTasks: (tasks) => {
    return tasks.map(task => {
      return {
        ...task._doc,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt)
      }
    })
  },
  formatTask: (task) => {
    return {
      ...task._doc,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt)
    }
  }
}

const tasks = () => {
  return Task.find()
  .then(results => TASK.formatTasks(results))
  .catch(err => {
    throw err
  })
}

const milestoneTasks = (args) => {
  const query = {milestone: args.milestoneTaskInput.milestoneID}
  return Task.find(query)
  .then(results => TASK.formatTasks(results))
  .catch(err => {
    throw err
  })
}

const task = (id) => {
  const query = {_id: id.id}
  return Task.findOne(query)
  .then(result => TASK.formatTask(result))
  .catch(err => {
    throw err
  })
}

const createTask = (args) => {
  const task = new Task({
    name: args.taskInput.name,
    flag: 0,
    pomodoro: args.taskInput.pomodoro,
    milestone: args.taskInput.milestone
  })
  
  return task.save()
  .then(result => {
    return result
  })
  .catch(err => {
    throw err
  })
  return task
}

const editTask = (args) => {
  const task = {
    name: args.editTaskInput.name,
    pomodoro: args.editTaskInput.pomodoro,
    flag: args.editTaskInput.flag,
    milestone: args.editTaskInput.milestone
  }

  const query = {_id: args.editTaskInput._id}
  return Task.findOneAndUpdate(query, task, {new: true, useFindAndModify: false}, (err, docs) => {
    if (err) {
      return err
    }
    return docs

  })
}

module.exports = {
  task,
  tasks,
  milestoneTasks,
  createTask,
  editTask
}