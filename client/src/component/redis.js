import { createClient } from "redis";

const client = createClient({
  url: "redis://localhost:6379", // Update this URL to your Redis server URL if different
});

class RedisClinet {
  constructor() {
    this.connect();
  }

  async connect() {
    await client.connect();
    client.on("error", (err) => console.log("Redis Client Error", err));
  }

  // Function to set a key-value pair in Redis
  async setKeyValue(key, value) {
    await client.set(key, value);
    console.log(`Set ${key} to ${value}`);
  }

  // Function to get a value by key from Redis
  async getValueByKey(key) {
    const value = await client.get(key);
    console.log(`Value for ${key}: ${value}`);
    return value;
  }

  async disconnect() {
    await client.quit();
  }
}

export default RedisClinet;

// await RedisClinet().setKeyValue("testKey", "testValue");
// await RedisClinet().getValueByKey("testKey");
