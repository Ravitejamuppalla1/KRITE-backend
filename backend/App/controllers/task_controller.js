const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const TaskModel = require('../models/task');

const dynamoDB = new AWS.DynamoDB();
const taskCtlr = {}

taskCtlr.createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const taskId = uuidv4();
  const userId = req.user.id;


  const task = new TaskModel(taskId, title, description, dueDate, userId);
  const dynamoParams = {
    TableName: 'Tasks',
    Item: {
      taskId: { S: task.taskId },
      title: { S: task.title },
      description: { S: task.description },
      dueDate: { S: task.dueDate },
      createdby: { S: task.createdby }
    },
  };
  try {
    await dynamoDB.putItem(dynamoParams).promise();
    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



//Edit Task


taskCtlr.editTask = async (req, res) => {
  const {title, description, dueDate } = req.body;
  const { taskId } = req.params;

  const dynamoParams = {
    TableName: 'Tasks',
    Key: {
      taskId: { S: taskId },
    },
    UpdateExpression: 'SET title = :title, description = :description, dueDate = :dueDate',
    ExpressionAttributeValues: {
      ':title': { S: title },
      ':description': { S: description },
      ':dueDate': { S: dueDate },
    },
    ReturnValues: 'ALL_NEW', 
  };

  try {
    const result = await dynamoDB.updateItem(dynamoParams).promise();

    const updatedTask = {
      taskId: result.Attributes.taskId.S,
      title: result.Attributes.title.S,
      description: result.Attributes.description.S,
      dueDate: result.Attributes.dueDate.S,
    };
    res.status(200).json({ message: 'Task updated successfully', updatedTask });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Delete Task
taskCtlr.deleteTask = async (req, res) => {
  const { taskId } = req.params; 

  const dynamoParams = {
    TableName: 'Tasks',
    Key: {
      taskId: { S: taskId },
    },
  };

  try {
    await dynamoDB.deleteItem(dynamoParams).promise();

    res.status(200).json({ message: 'Task deleted successfully', taskId });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Lists

taskCtlr.listTasks = async (req, res) => {
  const userId = req.user.id; 

  const dynamoParams = {
    TableName: 'Tasks',
    FilterExpression: 'createdby = :userId',
    ExpressionAttributeValues: {
      ':userId': { S: userId },
    },
  };

  try {
    const result = await dynamoDB.scan(dynamoParams).promise();

    const tasks = result.Items.map(item => ({
      taskId: item.taskId.S,
      title: item.title.S,
      description: item.description.S,
      dueDate: item.dueDate.S,
    }));

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





module.exports = taskCtlr