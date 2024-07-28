import { report_repo } from "./redis-report-repo.js";
import { EntityId } from "redis-om";

const report_data = {
  name: "Test Report 3",
  status: "Passed1",
  duration: 1000,
  errors: ["error1", "error2"],
  wsevents: ["event1", "event2"],
};

async function saveReport(data) {
  const report = await report_repo.save(data);
  console.log(report);
  const id = report[EntityId];
  console.log(`Report saved with ID: ${id}`);
  return id;
}

async function getReport(id) {
  const report = await report_repo.fetch(id);
  console.log(`got report: ${JSON.stringify(report)}`);
  return report;
}

const id = await saveReport(report_data);
await getReport(id);
