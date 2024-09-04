import "dotenv/config";
import os from "os";
import fs from "fs";
import { execSync } from "child_process";
import { upload_directory } from "./S3.js";

const { AWS_BUCKET_NAME } = process.env;
const test_results_dir = `test_reports/results_${Math.ceil(Math.random() * 100)}/`
process.env.TEST_RESULTS_DIR = test_results_dir;
const os_username = os.userInfo().username;
const git_branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const report_card_path = `${test_results_dir}/report_card.json` // Read the report_card.json file to upload

try {
    execSync(`npx playwright test --project=ui:regression`, { stdio: 'inherit' }); // Added stdio option to inherit
} catch (error) {
  console.error(`Error executing npm test: ${error}`);
  process.exit(1); // Exit if the command fails
}

const report_card = JSON.parse(fs.readFileSync(report_card_path, 'utf-8'));
// Add the git-branch & username to the reportCard object
report_card["stats"]["git_branch"] = git_branch;
report_card["stats"]["username"] = os_username;

// Write the updated reportCard object back to the report_card.json file
fs.writeFileSync(report_card_path, JSON.stringify(report_card, null, 2));
upload_directory(AWS_BUCKET_NAME, `${test_results_dir}`);