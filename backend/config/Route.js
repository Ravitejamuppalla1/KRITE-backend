const express = require('express')
const route = express.Router()
const userAuthenticate = require('../App/middlewares/authenticate')
const userCtlr = require('../App/controllers/users_controller')
const taskCtlr = require('../App/controllers/task_controller')


route.post('/api/register',userCtlr.register)
route.post('/api/login',userCtlr.login)

route.get('/api/tasklists',userAuthenticate,taskCtlr.listTasks)
route.post('/api/createtask',userAuthenticate, taskCtlr.createTask);
route.put('/api/Edittask/:taskId',userAuthenticate,taskCtlr.editTask)
route.delete('/api/deletetask/:taskId',userAuthenticate,taskCtlr.deleteTask)



module.exports = route