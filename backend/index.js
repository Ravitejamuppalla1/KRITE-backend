const express = require('express')
const cors = require('cors')
const AWS = require('aws-sdk')
const configureDB = require('./config/Database')

AWS.config.update({
  "region": 'us-east-2',
  "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
  "accessKeyId": 'AKIA3FLDYDYJLAPDX24S',
  "secretAccessKey": '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'
})

const dynamoDB = new AWS.DynamoDB();
console.log(dynamoDB, 'dbb')
global.dynamoDB = dynamoDB;

const tableSchema = {
  TableName: 'Tasks',
  KeySchema: [
    {
      AttributeName: 'taskId',
      KeyType: 'HASH', 
    },
  ],
  AttributeDefinitions: [
    {
      AttributeName: 'taskId',
      AttributeType: 'S', 
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
};

const checkTableExists = async () => {
  try {
    await dynamoDB.describeTable({ TableName: 'Tasks' }).promise();
    console.log('Table already exists');
  } catch (error) {
    if (error.code === 'ResourceNotFoundException') {
      console.log('Table does not exist, creating table...');
      createTable();
    } else {
      console.error('Error checking table:', error);
    }
  }
};



dynamoDB.createTable(tableSchema, (err, data) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Table created:', data.TableDescription);
  }
});

checkTableExists();


const route = require('./config/Route')
const app = express()
const port = 3020
app.use(cors())
app.use(express.json())

app.listen(port, (req, res) => {
  console.log(`welcome to port ${port}`)
})
configureDB()
app.use(route)