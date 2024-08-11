import { createClient } from "redis";

const client = createClient({
  url: "redis://localhost:6379", // Update this URL to your Redis server URL if different
});

class Redis {
  constructor() {
    this.connect();
    this.client = client;
  }

  async connect() {
    await client.connect();
    client.on("connect", () => console.log("Redis Client Connected"));
    client.on("error", (err) => console.log("Redis Client Error", err));
  }

  async disconnect() {
    await client.quit();
  }

  async hlPush(key, field, data) {
    const res = await client.hGet(key, field);
    let new_list;
    if (res) {
      console.log(`Field ${field} already exists in key ${key}`);
      const list = JSON.parse(res);
      list.push(data);
      new_list = await client.hSet(key, field, JSON.stringify(list));
    } else {
      console.log(`Field ${field} does not exist in key ${key}`);
      const list = [data]
      new_list = await client.hSet(key, field, JSON.stringify(list));
    }
    console.log(`Field ${field} added to key ${key} --- ${new_list}`);
    return new_list;
  }

  async hlPop(key, field) {}
}

export default Redis;
