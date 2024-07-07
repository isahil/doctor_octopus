from dotenv import load_dotenv
load_dotenv('.env')
import json
import os

local_dir = os.environ.get('LOCAL_DIRECTORY') # Path to test results directory
local_test_reports_dir = os.path.join(local_dir, 'test_reports')

def get_a_local_html_report(html):
    html_file_path = os.path.join(local_test_reports_dir, html)
    with open(html_file_path, "r") as f:
        html_file_content = f.read()
        return html_file_content

def get_all_local_cards():
    test_results = []

    for folder in os.listdir(local_test_reports_dir):
        folder_path = os.path.join(local_test_reports_dir, folder)
        print(f"folder path: {folder_path}")
        report_card = {"json_report": {}, "html_report": ""}

        if os.path.isdir(folder_path):
            for file in os.listdir(folder_path):
                file_path = os.path.join(folder_path, file)

                if file.endswith(".json"):
                    with open(file_path, "r") as f:
                        # test_results.append(json.load(f))
                        report_card["json_report"] = json.load(f)
                if file.endswith(".html"):       
                    html_file_path = os.path.join(folder, file)             
                    print(f"html file path: {html_file_path}")
                    report_card["html_report"] = str(html_file_path)
        test_results.append(report_card)

    return test_results