'use strct'

/**
 * @author : Ajantha Bandara
 * @copyright: 2018, IronNode Labs 
 */

// prod environment settings
exports.get = () => {
  return {
    host: process.env.HOST || "127.0.0.1",
    port: process.env.SERVER_PORT || 5000,
    mongoose: {
      debug: true,
      host: process.env.MONGO_HOST || "mongodb://mongo2",
      port: process.env.MONGO_PORT || 27017,
      db: "test"
    },
    morgan: {
      debug: true,
      debugLevel: "dev"
    }
  }
}