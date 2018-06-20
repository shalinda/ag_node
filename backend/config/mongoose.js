/**
 * @author : Ajantha Bandara
 * @copyright: 2018
 */

'use strict'

const mongoose = require('mongoose');
const config = require("./config").get(process.env.NODE_ENV);

// optiond for mongodb connection
// TODO: Need to put necessory properties here
const mongooseOptions = {
  user: config.mongoose.user,
  pass: config.mongoose.pass,
  poolSize: 10,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  keepAlive: 120
};

// mongodb url
const mongoUrl = `${config.mongoose.host}:${config.mongoose.port}/${config.mongoose.db}`;
// const mongoUrl = `mongodb+srv://admin:admin@cluster0-vxwe3.mongodb.net`;

exports.init = () => {
  // Create the database connection 
  mongoose.connect(mongoUrl, mongooseOptions);

  // listen to db connection event
  mongoose.connection.on("connected", () => {
    console.log("mongoose connection open to: ", mongoUrl);
  });

  // listen to mongoose connection error event
  mongoose.connection.on("error", (err) => {
    console.log("Mongoose connection error: ", err);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
  });


  // If the Node process ends, close the Mongoose connection 
  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
}
