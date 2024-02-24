const mongoose = require('mongoose')

const { Schema } = mongoose

const taskSchema = new Schema({

    title: {
        type: String,
        required: true

    },
     description :{
       
         type:String,
         required:true
    },

    dueDate:{
      type:Date,
      required :true
    },
    userId:{
      type:Schema.Types.ObjectId,
      ref:'Users',
      required:true
  }})



const Task = mongoose.model('Task', taskSchema)

module.exports = Task