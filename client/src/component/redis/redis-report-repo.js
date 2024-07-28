import { redis } from "./redis-client.js";
import { Schema, Repository } from "redis-om";

await redis.connect();
// const ping = await redis.ping()
// console.log(ping)

const reportSchema = new Schema(
  "report",
  {
    name: { type: "string" },
    status: { type: "string" },
    duration: { type: "number" },
    errors: { type: "string[]" },
    wsevents: { type: "string[]" },
  },
  {
    dataStructure: "JSON",
  }
);

export const report_repo = new Repository(reportSchema, redis);
