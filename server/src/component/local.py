import time
from dotenv import load_dotenv
load_dotenv('.env')
import json
import os

local_dir = os.environ.get('LOCAL_DIRECTORY', "../../") # path to test results directory can be changed in the .env file
test_reports_dir = os.environ.get("TEST_REPORTS_DIR", "test_reports") # test reports directory can be changed in the .env file

local_test_reports_dir = os.path.join(local_dir, test_reports_dir)

def get_a_local_card_html_report(html):
    ''' get a local html report card based on the path requested'''
    html_file_path = os.path.join(local_test_reports_dir, html)
    with open(html_file_path, "r") as f:
        html_file_content = f.read()
        return html_file_content

def get_all_local_cards():
    ''' get all local report cards in the local test reports directory'''
    test_results = []
    local_reports_dir = os.listdir(local_test_reports_dir)
    print(f"Total local reports found: {len(local_reports_dir)}")

    for folder in local_reports_dir:
        folder_path = os.path.join(local_test_reports_dir, folder)
        report_card = {"json_report": {}, "html_report": ""} # initialize report card with 2 properties needed for the client

        if os.path.isdir(folder_path):
            for file in os.listdir(folder_path):
                file_path = os.path.join(folder_path, file)

                if file.endswith(".json"):
                    with open(file_path, "r") as f:
                        report_card["json_report"] = json.load(f)
                if file.endswith(".html"):       
                    html_file_path = os.path.join(folder, file)
                    report_card["html_report"] = str(html_file_path)

                # time.sleep(0.1) # simulate slow connection
        test_results.append(report_card)

    return test_results