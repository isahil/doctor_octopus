import "dotenv/config";
import { execSync } from "child_process";
import { upload_directory } from "./S3.js";
const { AWS_BUCKET_NAME, REPORTS_DIR } = process.env;

const test_results_dir = `test_reports/results_${Math.ceil(Math.random() * 100)}/`
process.env.TEST_RESULTS_DIR = test_results_dir;

try {
    execSync(`npm test`, { stdio: 'inherit' }); // Added stdio option to inherit
  } catch (error) {
    console.error(`Error executing npm test: ${error}`);
    process.exit(1); // Exit if the command fails
  }

upload_directory(AWS_BUCKET_NAME, `${test_results_dir}`);