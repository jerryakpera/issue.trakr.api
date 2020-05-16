const RoadMap = require("../../../db/models/RoadMap")

const roadmap = (args) => {
  const query = {board: args.getRoadmapInput.board}
  return RoadMap.findOne(query)
  .then(result => {
    return result
  })
  .catch(err => {
    throw err
  })
}

const editRoadmap = (args) => {
  const query = {board: args.editRoadmapInput.board}

  const roadmap = {
    goal: args.editRoadmapInput.goal
  }

  return RoadMap.findOneAndUpdate(query, roadmap, {
    new: true,
    useFindAndModify: false
  }, (err, docs) => {
    if (err) {
      return err
    }
    return docs
  })
}

module.exports = {
  roadmap,
  editRoadmap
}