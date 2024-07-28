import { createClient } from "redis";

export const redis = createClient({
  url: "redis://localhost:6379", // Update this URL to your Redis server URL if different
});

class RedisClinet {
  constructor() {
    this.connect();
  }

  async connect() {
    await redis.connect();
    redis.on("error", (err) => console.log("Redis Client Error", err));
  }

  // Function to set a key-value pair in Redis
  async setKeyValue(key, value) {
    await redis.set(key, value);
    console.log(`Set ${key} to ${value}`);
  }

  // Function to get a value by key from Redis
  async getValueByKey(key) {
    const value = await redis.get(key);
    console.log(`Value for ${key}: ${value}`);
    return value;
  }

  async disconnect() {
    await redis.quit();
  }
}

export default RedisClinet;
