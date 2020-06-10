const _ = require("../../../modules/utils")

const MileStone = require("../../../db/models/Milestone")
const Task = require("../../../db/models/Task")

const milestones = (args) => {
  const query = {user: args.getMilestonesInput.user}
  return MileStone.find(query)
  .populate("tasks")
  .exec()
  .then(results => {
    const milestones = results.map(result => {
      result.tasks = result.tasks.map(task => {
        if(task.dueDate && !task.completed) {
          task.remainingDays = _.getDifferenceInTime(task.dueDate)
        }

        return task
      })

      return result
    })

    return milestones
  })
  .catch(err => {
    throw err
  })
}

const userTasks = (args) => {
  const query = {user: args.getTasksInput.user}
  return Task.find(query)
  .then(results => {
    console.log(results)
    return results.map(task => {
      if(task.dueDate && !task.completed) {
        task.remainingDays = _.getDifferenceInTime(task.dueDate)
      }

      if (task.remainingDays <= 3) return task
    }).filter(task => task)
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

const editMilestone = (args) => {
  const query = { _id: args.editMilestoneInput.milestoneID }
  
  return MileStone.findOne(query)
  .then(milestone => {
    for (let [key, value] of Object.entries(args.editMilestoneInput)) {
      milestone[key] = value
    }

    return milestone.save()
    .then(savedMilestone => {
      return savedMilestone
    })
  })
}

const deleteMilestone = (args) => {
  const query = {_id: args.deleteMilestoneInput.milestoneID}
  return MileStone.findOne(query)
  .then(milestone => {
    milestone.tasks.forEach(task => {
      const taskQuery = {_id: task}
      Task.deleteOne(taskQuery)
      .then(() => {
      })
      .catch(err => {
        return err
      })
    })
    return MileStone.deleteOne(query)
    .then(() => {
      return true
    })
    .catch(err => {
      return err
    })
  })

}

const deleteTask = (args) => {
  const query = {_id: args.deleteTaskInput.taskID}
  const milestoneQuery = {_id: args.deleteTaskInput.milestoneID}
  return MileStone.findOne(milestoneQuery)
  .then(milestone => {
    const index = milestone.tasks.findIndex(task => {
      return args.deleteTaskInput.taskID == task
    })
    milestone.tasks.splice(index, 1)
     return milestone.save()
    .then(() => {
      return Task.deleteOne(query)
      .then(() => {
        return true
      })
      .catch(err => {
        return err
      })
    })
    .catch(err => {
      return err
    })
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

const editTask = (args) => {
  const query = {_id: args.editTaskInput._id}

  const editedTask = {
    ...args.editTaskInput
  }

  return Task.findOne(query)
  .then(task => {
    task.name = editedTask.name
    task.completed = editedTask.completed
    task.dueTime = editedTask.dueTime
    task.dueDate = editedTask.dueDate

    return task.save()
    .then(savedTask => {
      return savedTask
    })
    .catch(err => {
      return err
    })
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
  editMilestone,
  deleteMilestone,
  deleteTask,
  createTask,
  editTask,
  milestones,
  userTasks,
}