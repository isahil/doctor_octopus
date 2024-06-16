const { execSync } = require('child_process');
const fs = require('fs');

// Get the current Git branch
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

// Read the report_card.json file
const reportCard = JSON.parse(fs.readFileSync('report_card.json', 'utf-8'));

// Add the branch name to the reportCard object
reportCard['gitBranch'] = branch;

// Write the updated reportCard object back to the report_card.json file
fs.writeFileSync('report_card.json', JSON.stringify(reportCard, null, 2));