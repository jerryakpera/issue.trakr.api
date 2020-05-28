const MileStone = require("../../../db/models/Milestone")
const Task = require("../../../db/models/Task")

const milestones = (args) => {
  const query = {user: args.getMilestonesInput.user}
  return MileStone.find(query)
  .populate("tasks")
  .exec()
  .then(results => {
    return results
  })
  .catch(err => {
    throw err
  })
}

const createMilestone = (args) => {
  const milestone = new MileStone({
    name: args.milestoneInput.name,
    group: args.milestoneInput.group,
    user: args.milestoneInput.user
  })

  return milestone.save()
  .then(result => {
    return result
  })
  .catch(err => {
    return err
  })
}

const deleteMilestone = (args) => {
  const query = {_id: args.deleteMilestoneInput.milestoneID}
  return MileStone.deleteOne(query)
  .then(() => {
    return true
  })
  .catch(err => {
    return err
  })
}

const createTask = (args) => {
  const newTask = new Task({
    name: args.taskInput.name,
    user: args.taskInput.user,
    completed: false,
    dueTime: args.taskInput.dueTime,
    dueDate: args.taskInput.dueDate
  })
  
  return newTask.save()
  .then(task => {
    const milestoneQuery = {_id: args.taskInput.milestone}
    MileStone.findById(args.taskInput.milestone)
    .then(milestoneTask => {
      milestoneTask.tasks.push(task._id)
      milestoneTask.save()
      .then(() => {
        return task
      })
      .catch(err => {
        return err
      })
      return
    })
    .catch(err => {
      return err
    })
    return task
  })
  .catch(err => {
    return err
  })
}

// const editMilestone = (args) => {
//   const query = {board: args.editMilestoneInput.board}

//   const milestone = {
//     goal: args.editMilestoneInput.goal
//   }

//   return MileStone.findOneAndUpdate(query, milestone, {
//     new: true,
//     useFindAndModify: false
//   }, (err, docs) => {
//     if (err) {
//       return err
//     }
//     return docs
//   })
// }

module.exports = {
  createMilestone,
  deleteMilestone,
  createTask,
  milestones
}