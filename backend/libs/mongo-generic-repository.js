var Repository = require('./repository').Repository;


function MongoGenericRepository(connection, entityName) {
    if (connection === undefined || connection === null) {
        throw new Error('Argument Expected `connection`, got nothing');
    }

    this.connection = connection;
    this.entityName = entityName;
    //create an instance
    this.repository = new Repository(this.connection, this.entityName);
    this.api = new MongoGenericApi(this.repository);
}

function MongoGenericApi(repository) {

    this.repository = repository;

    this.save = function(data, callback) {
      this.repository.add(data, callback);
    }

    this.getAll = function(callback) {
      this.repository.find({}, callback);
    };

    this.updateById = function(id, data, callback) {
      this.repository.update({ _id: id }, data, callback);
    };

    this.deleteById = function(id, callback) {
      this.repository.remove({ _id: id}, callback);
    };

    this.getById = function(id) {
      // TO-DO
    };

    this.getByField = function(field , fieldValue, columns) {
      var query = {};
      query[field] = fieldValue;
      // TO-DO
    };

    this.deleteByField = function(field , fieldValue) {
      var query = {};
      query[field] = fieldValue;
      // TO-DO;
    };

    this.updateByField = function(field , fieldValue, data) {
      var query = {};
      query[field] = fieldValue;
      // TO-DO
    };
};

module.exports = MongoGenericRepository;
