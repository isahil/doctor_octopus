from fastapi import APIRouter, Query
from fastapi.responses import HTMLResponse
from src.component.local  import get_all_local_cards, get_a_local_card_html_report
from src.component.remote import get_all_s3_cards, get_a_s3_card_html_report
import subprocess

router = APIRouter()

@router.get("/reports/")
async def get_all_reports(source: str = Query(..., title="Source Name", description="Retrieve all the HTML & JSON reports from the source", example="local/remote")
    ) -> list:
    print(f"Report Source: {source}")
    if source == "remote":
        return get_all_s3_cards()
    else: return get_all_local_cards()

# get the specific html report content when 'View Report' button is clicked
@router.get("/report/", response_class=HTMLResponse)
async def get_a_report(
    source: str = Query(..., title="Source Name", description="Source of the html report file to be retrieved", example="local/remote"),
    html: str = Query(..., title="HTML Report Name", description="Name of the html report file to be retrieved", example="index.html")
    ) -> HTMLResponse:
    if source == "remote":
        html_file_content = get_a_s3_card_html_report(html)
        return HTMLResponse(content=html_file_content, status_code=200, media_type="text/html")
    else:
        html_file_content = get_a_local_card_html_report(html)
        return HTMLResponse(content=html_file_content, status_code=200, media_type="text/html")

@router.get("/run-command/")
def get_help(
    command: str = Query(..., title="Execute Command", description="Command to be executed on the server", example="ls")
    ) -> str:
    # print(f"FASTAPI received command: {command}")
    result = subprocess.run(f"cd ../playwright&& {command}", shell=True, capture_output=True, text=True)
    print(f"Command executed: {result.args} | Return Code: {result.returncode}")
    print(f"STDOUT: {result}")

    return result.stdout