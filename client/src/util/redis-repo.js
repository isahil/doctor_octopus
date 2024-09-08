import { Schema, Repository } from "redis-om";

// JSON schema for the redis-stack-server
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

export const report_repo = (redis_client) => {
  return new Repository(reportSchema, redis_client);
}
