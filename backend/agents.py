from langchain_mistralai import ChatMistralAI
from tools import search_tool, scrape_tool
from langchain.agents import create_agent
from utils.prompts import WRITTER_AGENT_SYSTEM_PROMPT
# from langchain_nvidia_ai_endpoints import ChatNVIDIA
import os


# llm = ChatNVIDIA(
#   model="mistralai/mistral-large-3-675b-instruct-2512",
#   api_key=os.getenv("NVIDIA_API_KEY"), 
#   temperature=0,
#   top_p=0.7,
#   max_tokens=4096,
# )

llm = ChatMistralAI(model="mistral-medium-latest", streaming=True)

def search_agent():
    return create_agent(
        model=llm,
        tools=[search_tool]
    )

def scrape_agent():
    return create_agent(
        model=llm,
        tools=[scrape_tool]
    )
    
def writter_agent():
    return create_agent(
        model=llm,
        system_prompt=WRITTER_AGENT_SYSTEM_PROMPT
    )