from langchain.tools import tool
from tavily import TavilyClient
from dotenv import load_dotenv
from rich import print
from bs4 import BeautifulSoup
import os, requests
from typing import List
load_dotenv()

@tool
def search_tool(query: str) -> str:
    """Internet search tool"""
    client = TavilyClient(os.getenv("TAVILY_API_KEY"))
    response = client.search(
        query=query,
        search_depth="basic",
        max_results=5
    )
    out = []
    for r in response['results']:
        out.append(
            f"Title: {r['title']}\nContent: {r['content']}\nURL: {r['url']}"
        )
    
    return f"\n\n{"=="*50}\n\n".join(out)


# @tool
# def scrape_tool(url: str) -> str:
#     """Scrape a URL and return the page title and visible text."""
#     try:
#         resp = requests.get(url, timeout=10, headers={"User-Agent": "Mozilla/5.0"})
#         resp.raise_for_status()
#     except Exception as e:
#         return f"Error fetching URL: {e}"

#     soup = BeautifulSoup(resp.content, "html.parser")
#     title = soup.title.string.strip() if soup.title and soup.title.string else ""

#     # Extract visible text
#     for script in soup(["script", "style", "noscript"]):
#         script.decompose()
#     texts = soup.get_text(separator=" \n ")
#     # Collapse whitespace and limit length
#     cleaned = " ".join(texts.split())
#     if len(cleaned) > 20000:
#         cleaned = cleaned[:20000] + "..."

#     return f"Title: {title}\n\n{cleaned}"


from langchain.tools import tool
from bs4 import BeautifulSoup
import requests


@tool
def scrape_tool(url: str) -> str:
    """
    Scrape a URL and return the page title and visible text.
    """

    headers = {
        "User-Agent": (
            "Mozilla/5.0 "
            "(Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 "
            "(KHTML, like Gecko) "
            "Chrome/124.0 Safari/537.36"
        )
    }

    try:
        resp = requests.get(
            url,
            timeout=10,
            headers=headers,
            allow_redirects=True
        )

        resp.raise_for_status()

    except requests.exceptions.RequestException as e:
        return f"Error fetching URL: {str(e)}"

    # Check content type BEFORE parsing
    content_type = resp.headers.get("Content-Type", "").lower()

    if "text/html" not in content_type:
        return (
            f"Skipped non-HTML content.\n"
            f"URL: {url}\n"
            f"Content-Type: {content_type}"
        )

    try:
        # Use decoded text instead of raw bytes
        soup = BeautifulSoup(resp.text, "html.parser")

    except Exception as e:
        return f"Error parsing HTML from {url}: {str(e)}"

    # Remove unwanted tags
    for tag in soup([
        "script",
        "noscript",
        "svg",
        "img",
        "footer",
        "header",
        "nav",
        "aside"
    ]):
        tag.decompose()

    # Extract title safely
    title = ""

    if soup.title and soup.title.string:
        title = soup.title.string.strip()

    # Extract visible text
    text = soup.get_text(separator=" ", strip=True)

    # Clean whitespace
    cleaned = " ".join(text.split())

    # Limit size
    MAX_CHARS = 20000

    if len(cleaned) > MAX_CHARS:
        cleaned = cleaned[:MAX_CHARS] + "..."

    return f"\nURL: {url}\n\nTitle: {title}\n\nContent:\n{cleaned}"