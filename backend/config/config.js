
'use strict'

/**
 * @author : Ajantha Bandara
 * @copyright: 2018
 */

const Joi = require("joi");

const defultConfig = require("./env/default");
const devConfigs = require("./env/dev");
const prodConfig = require("./env/prod");

// define validation for all the env variables
const envVarsSchema = Joi.object({
  env: Joi.string()
    .allow(['development', 'production', 'dev', 'prod'])
    .default('dev'),
  port: Joi.number()
    .default(6000),
  host: Joi.string()
    .default("127.0.0.1"),
  mongoose: {
    debug: Joi.boolean()
      .when('env', {
        is: Joi.string().equal('development') || Joi.string().equal('dev'),
        then: Joi.boolean().default(true),
        otherwise: Joi.boolean().default(false)
      }),
    host: Joi.string().required()
      .description('Mongo DB host url'),
    port: Joi.number()
      .default(27017),
    db: Joi.string().required(),
    user: Joi.string(),
    pass: Joi.string()
  },
  morgan: {
    debug: Joi.boolean()
      .when('env', {
        is: Joi.string().equal('development') || Joi.string().equal('dev'),
        then: Joi.boolean().default(true),
        otherwise: Joi.boolean().default(false)
      }),
    debugLevel: Joi.string()
      .default("dev")
  }
}).unknown()
  .required();

exports.get = function get(env) {
  let config;
  console.log(env);
  switch (env) {
    case "dev":
    case "development":
      config = devConfigs.get();
      break;

    case "prod":
    case "production":
      config = prodConfig.get();
      break;

    default:
      config = defultConfig.get();
      break;
  }

  const { error, value: envVars } = Joi.validate(Object.assign({}, config, { env: env }), envVarsSchema);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  } else {
    return envVars;
  }
}