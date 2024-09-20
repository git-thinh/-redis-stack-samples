const IOREDIS = require("ioredis");

class RedisSub {
  constructor() {
    this.redisClient = new IOREDIS({
      host: "redis-17682.c295.ap-southeast-1-1.ec2.cloud.redislabs.com",
      port: 17682,
      user: "default",
      password: "",
    });

    this.channelHandlers = new Map();
  }

  async initializeSubscriptions(channels) {
    //* Check connect sub is that Ok ?
    this.redisClient.on("ready", async () => {
      try {
        console.log(channels);
        channels.forEach((channel) => {
          this.redisClient.psubscribe(channel);
        });
        console.info(`Redis subscribed to channels: ${channels.join(", ")}`);
      } catch (error) {
        console.error("Failed to subscribe to Redis channels:", error);
      }
    });

    this.redisClient.on("pmessage", async (pattern, channel, message) => {
      console.log(pattern, channel);
      const handler = this.channelHandlers.get(pattern);
      handler(message);
    });
  }

  registerHandler(channel, handler) {
    this.channelHandlers.set(channel, handler);
  }
}

module.exports = new RedisSub();
