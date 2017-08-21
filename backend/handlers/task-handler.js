var unitOfWork = require('../libs/unit-of-work.js');
var mongojs = require("mongojs");

var taskHandler = function() {
    this.createTask     = handleCreateTaskRequest;
    this.getTask        = handleGetTaskRequest;
    this.getTasks       = handleGetTasksRequest;
    this.updateTask     = handleUpdateTaskRequest;
    this.deleteTask     = handleDeleteTaskRequest;
    this.getTasksByDone = handleGetTasksByDoneRequest;
};

function handleCreateTaskRequest(req, res, next) {

  var task = req.body;
  if(!task.title || !(task.isDone + '')){
    req.status(400);
    res.json({
      "error": "Bad Data"
    });
  } else {

    unitOfWork.taskRepository.api.save(task, function(err, task){
      if(err){
        res.send(err);
        return next(new Error(err));
      } else {
        res.send(task)
      }
    })
  }
}

function handleGetTasksRequest(req, res, next) {

  unitOfWork.taskRepository.api.getAll(function(tasks) {
    if(tasks) {
      res.json(tasks);
    } else {
      res.status(500);
      res.send(err);
      return next(new Error(err));
    }
  });
}

function handleGetTaskRequest(req, res, next) {
  // TO-DO
}

function handleGetTasksByDoneRequest(req, res, next) {
    // TO-DO
}


function handleDeleteTaskRequest(req, res, next) {

  unitOfWork.taskRepository.api.deleteById(mongojs.ObjectId(req.params.id), function(err, deleted){
    if(err){
      res.send(err);
      return next(new Error(err));
    } else {
      res.json(deleted);
    }
  });
}

function handleUpdateTaskRequest(req, res, next) {

  var task = req.body;
	var updatedTask = {};
	updatedTask.isDone = task.isDone;
  updatedTask.title = task.title;

  unitOfWork.taskRepository.api.updateById(mongojs.ObjectId(req.params.id), updatedTask, function(err, task) {
    if(err) {
      res.send(err);
      return next(new Error(err));
    } else {
      res.send(task)
    }

  });
}

module.exports = taskHandler;
