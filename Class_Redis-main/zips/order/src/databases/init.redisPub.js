const IOREDIS = require("ioredis");

class RedisPublisher {
  constructor() {
    this.redisClient = new IOREDIS({
      host: "",
      port: "",
      user: "",
      password: "",
    });
  }
}

module.exports = new RedisPublisher();
