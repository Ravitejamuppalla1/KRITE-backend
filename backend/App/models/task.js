
class TaskModel {
    constructor(taskId, title, description, dueDate,createdby) {
      this.taskId = taskId;
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.createdby =createdby;

    }
  }
  
  module.exports = TaskModel;
  