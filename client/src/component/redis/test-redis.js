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
  // const names = ["name1", "name2", "name3"];
  // const result = await redis.client.lPush("test_list", ["item1", "item2", `item${Math.ceil(Math.random() * 100)}`]);
  const result = await redis.hlPush("new_test_list_1", "name", `name${Math.ceil(Math.random() * 100)}`);
  
  console.log(`test result: ${result}`);
  await redis.disconnect();
};

test();