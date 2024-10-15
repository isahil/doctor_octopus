from fastapi import APIRouter, Query
from fastapi.responses import HTMLResponse
from src.component.local  import get_all_local_cards, get_a_local_card_html_report
from src.component.remote import get_all_s3_cards, get_a_s3_card_html_report

router = APIRouter()

@router.get("/cards")
async def cards(source: str):
    print(f"source: {source}")
    if source == "remote":
        return get_all_s3_cards()
    else: return get_all_local_cards()

# get the specific html report content when 'View Report' button is clicked
@router.get("/report", response_class=HTMLResponse)
async def get_report(
    source: str = Query(..., title="Source Name", description="Source of the html report file to be retrieved", example="local"),
    html: str = Query(..., title="HTML Report Name", description="Name of the html report file to be retrieved", example="index.html")):
    if source == "remote":
        html_file_content = get_a_s3_card_html_report(html)
        return HTMLResponse(content=html_file_content, status_code=200, media_type="text/html")
    else:
        html_file_content = get_a_local_card_html_report(html)
        return HTMLResponse(content=html_file_content, status_code=200, media_type="text/html")

@router.get("/help")
def get_help():
    print("Sending help commands...")
    return [ "api", "fix", "perf", "ui", "ws"]