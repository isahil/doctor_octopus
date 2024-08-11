import { report_repo } from "./redis-repo.js";
import { EntityId } from "redis-om";
import Redis from "./redis-client.js";

const redis = new Redis();

const report_data = {
  name: `Test Report #${Math.ceil(Math.random() * 100)}`,
  status: "Passed1",
  duration: 1000,
  errors: ["error1", "error2"],
  wsevents: ["event1", "event2"],
};

async function saveReport(data) {
  const report = await report_repo(redis.client).save(data);
  console.log(report);
  const id = report[EntityId];
  console.log(`Report saved with ID: ${id}`);
  return id;
}

async function fetchReport(id) {
  const report = await report_repo(redis.client).fetch(id);
  console.log(`Fetched report: ${JSON.stringify(report)}`);
  return report;
}

// const id = await saveReport(report_data);
// await fetchReport(id);

const test = async () => {
  const key = "new_test_list_3";
  const data = { 
    name: `name${Math.ceil(Math.random() * 100)}`, 
    age: Math.ceil(Math.random() * 100), 
    hobbies: ["hobby1", "hobby2", "hobby3", "hobby4", "hobby5"] 
  };

  // redis.client.HDEL(key, "name");

  // const hset_result = await redis.client.hSet(key, "hobbies", JSON.stringify(["hobby1", "hobby2", "hobby3", "hobby4", "hobby5"]));
  // console.log(`test result hset: ${JSON.stringify(hset_result)}`);

  const hget_result = await redis.client.hGet(key, "hobbies");
  console.log(`test result hget: ${JSON.parse(hget_result)}`);
  
  
  // const push_result = await redis.hlPush(key, "hobbies", `hobby${Math.ceil(Math.random() * 100)}`);
  // console.log(`test result push: ${push_result}`);

  // const pop_result = await redis.hlPop(key, "name");
  // console.log(`test result pop: ${pop_result}`);

  // const shift_result = await redis.hlShift(key, "name"); 
  // console.log(`test result shift: ${shift_result}`);

  // const unshift_result = await redis.hlUnshift(key, "name", `name${Math.ceil(Math.random() * 100)}`);
  // console.log(`test result unshift: ${unshift_result}`);
  await redis.disconnect();
};

test();