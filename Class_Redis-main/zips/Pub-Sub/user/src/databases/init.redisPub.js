const IOREDIS = require("ioredis");

class RedisPublisher {
    constructor() {
        this.redisClient = new IOREDIS({
            host:'redis-17682.c295.ap-southeast-1-1.ec2.cloud.redislabs.com',
            port: 17682,
            user:'default',
            password:'',
        })
    }

  publish(channel, message) {
    this.redisClient.publish(channel, JSON.stringify(message));
  }

}

module.exports = new RedisPublisher();

