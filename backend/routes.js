function setup(router, handlers) {

    // ROUTES FOR API
    // =============================================================================
    router.post('/task', handlers.task.createTask);
    router.get('/tasks', handlers.task.getTasks);
    router.get('/task/:id', handlers.task.getTask);
    router.get('/task/isDone/:doneBool', handlers.task.getTasksByDone);
    router.put('/task/:id', handlers.task.updateTask);
    router.delete('/task/:id', handlers.task.deleteTask);
}

exports.setup = setup;
