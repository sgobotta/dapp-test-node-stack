var config = require('config');
var MongoGenericRepository = require('../libs/mongo-generic-repository.js');

var mongoConnection = config.get('COMMON.mongoDbConfig');

var taskRepository = new MongoGenericRepository(mongoConnection, 'tasks');

module.exports =  { taskRepository : taskRepository} ;
