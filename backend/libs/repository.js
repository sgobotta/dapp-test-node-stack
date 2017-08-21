var mongoDb = require("mongojs");

var MongoRepository = function(connectionString, objectName){
    var collection = mongoDb(connectionString, [objectName]);

    this.add = function(value, callback) {
        collection[objectName].save(value, callback);
    };

    this.get = function(id, callback){
        collection[objectName]
            .findOne({
                _id : id
            }, function(error, document){
                callback(document);
            });
    };

    this.find = function(query, callback) {
        collection[objectName].find(query, function(error, documents) {
            callback(documents);
        });
    };

    this.update = function(query, value, callback) {
        collection[objectName].findAndModify({query: query, update: {$set: value} }, function(err, res, cols) {
          callback(err, res, cols);
        });
    };

    this.remove = function(query, callback) {
        collection[objectName].remove(query, function(err, res){
          callback(err, res);
        });
    };
};

exports.Repository = MongoRepository;
