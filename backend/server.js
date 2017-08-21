var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var taskHandler = require('./handlers/task-handler');
var routes = require('./routes');
var cors = require('cors');
var expressValidator = require('express-validator');
var expressWinston = require('express-winston');
var winston = require('winston');
var cfg = require("config");

var port = process.env.PORT || 3008;

// View Engine
app.set('views', path.join(__dirname, 'client'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(expressValidator())

// Set Base Route
app.use('/api', router);

// Middlware for Requests
router.use(function (req, res, next) {

    next(); // make sure we go to the next routes and don't stop here
});

// Base Routing Url
router.get('/', function(req, res, next){
	res.render('index.html');
});

//Define route handlers
var handlers = {
  task: new taskHandler()
  //newHandler: new newHandler()
};

// Server Startup
function start() {

	routes.setup(router, handlers);

  // express-winston errorLogger makes sense AFTER the router.
  app.use(expressWinston.errorLogger({
    transports: [
      new winston.transports.File({
          level: 'error',
          filename: __dirname + '/' + cfg.get("COMMON.log.logsDirectory") + '/' + cfg.get("COMMON.log.fileName"),
          handleExceptions: true,
          json: true,
          maxsize: 5242880, //5MB
          maxFiles: 5,
          colorize: false,
          timestamp:true
      }),
      new winston.transports.Console({
        json: true,
        colorize: true
      })
    ]
}));

	app.listen(port, function() {
		console.log('Server started on port ' + port);
	})
}

exports.start = start;
