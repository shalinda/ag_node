/**
 * @author : Ajantha Bandara
 * @copyright: 2018
 */

const express = require("./express"),
  config = require("./config").get(process.env.NODE_ENV);

/**
 * @desc - create an instance of exress and invoke the callback
 */
module.exports.init = (callback) => {
  const app = express.init();
  if (callback) callback(app);
}

/**
 * @desc - start the express application and listen on http://localhost:5000
 */
module.exports.start = () => {
  const _this = this;
  _this.init((app) => {
    app.listen(config.port, (err) => {
      if (err) console.log(err);
      console.log("Application is running on localhost port:5000");
    })
  })
}