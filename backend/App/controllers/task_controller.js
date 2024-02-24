const Task = require('../models/task')

const taskctlr = {}


taskctlr.listTasks = async (req, res) => {
  const {id} = req.params
  try {
      const tasks = await Task.find({userId:req.user.id})
      res.json(tasks)
  }
  catch (e) {
      res.json(e)
  }
}

// CREATE

taskctlr.createTask = async (req, res) => {
  try {
      const { body } = req
      const newtask = await Task.create({ ...body, userId: req.user.id })
      res.json(newtask)
  }
  catch (e) {
      res.json(e)
  }
}

//update
taskctlr.editTask = async (req, res) => {
  try {
      const { taskId } = req.params
      const {body} = req
      const newtask = await Task.findByIdAndUpdate(taskId,body,{new:true,runValidators:true})
      res.json(newtask)
  }
  catch (e) {
      res.json(e)
  }
}

// DELETE

taskctlr.deleteTask = async (req, res) => {
  try {
      const id = req.params.taskId
      const data = await Task.findByIdAndDelete(id)
      if (data) {
          res.json(data)
      } else {
          res.json({})
      }
  } catch (e) {
      res.json(e.message)
  }
}


module.exports = taskctlr