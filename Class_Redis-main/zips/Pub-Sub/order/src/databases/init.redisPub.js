const IOREDIS = require("ioredis");

class RedisPublisher {
  constructor() {
    this.redisClient = new IOREDIS({
      host: "redis-17682.c295.ap-southeast-1-1.ec2.cloud.redislabs.com",
      port: "17682",
      user: "default",
      password: "",
    });
  }
}

module.exports = new RedisPublisher();
