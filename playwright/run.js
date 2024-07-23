import "dotenv/config";
import os from "os";
import fs from "fs";
import { execSync } from "child_process";
import { upload_directory } from "./S3.js";
const { AWS_BUCKET_NAME } = process.env;

const test_results_dir = `test_reports/results_${Math.ceil(Math.random() * 100)}/`
process.env.TEST_RESULTS_DIR = test_results_dir;

try {
    execSync(`npx playwright test --project=ui:regression`, { stdio: 'inherit' }); // Added stdio option to inherit
  } catch (error) {
    console.error(`Error executing npm test: ${error}`);
    process.exit(1); // Exit if the command fails
  }

// Get the current user's username
const username = os.userInfo().username;

// Get the current Git branch
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

// Read the report_card.json file
const report_card_path = `${test_results_dir}/report_card.json`
const report_card = JSON.parse(fs.readFileSync(report_card_path, 'utf-8'));

// Add the branch name to the reportCard object
report_card["stats"]["git_branch"] = branch;
report_card["stats"]["username"] = username;

// Write the updated reportCard object back to the report_card.json file
fs.writeFileSync(report_card_path, JSON.stringify(report_card, null, 2));

upload_directory(AWS_BUCKET_NAME, `${test_results_dir}`);