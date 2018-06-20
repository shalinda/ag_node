/**
 * @author : Ajantha Bandara
 * @copyright: 2018
 */

const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser");

const config = require("./config").get(process.env.NODE_ENV),
  db = require("./mongoose");


/**
* @desc - initialize other application configurations
*/
module.exports.initializeAppConfigs = (app) => {
  app.use(morgan("dev")); // in express we can register middlewares using app.use() function.

  // setup the body-parser
  app.use(bodyParser.json({ limit: '5mb' }))
  app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

  // setup static resources
  // app.use(express.static(path.join(appRoot.path, 'dist')));
  app.use('/static', express.static('public'))

  // error handler, send stacktrace only during development
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.log(err);

    const status = err.status ? err.status : 400;
    return res.status(status)
      .json({
        message: err.message,
        stack: config.env === 'development' || config.env.env === "dev" ? err.stack : {}
      });
  });
}

/**
 * @desc - setup db connection and models
 */
module.exports.initDbConfigs = () => {
  // initialize the database
  db.init();

  // need to require all mongoose models here
  require("../models/user");
  require("../models/employee");
  require("../models/empType");
  require("../models/comment");
  
}

/**
* @desc - initialize the all sever routes (REST end points);
*/
module.exports.initializeServerRoutes = (app) => {
  require("../routes/user.routes")(app);
}

/**
* @desc - initialize the application
*/
module.exports.init = () => {
  const app = express();

  this.initDbConfigs();
  this.initializeAppConfigs(app);
  this.initializeServerRoutes(app);

  return app;
}