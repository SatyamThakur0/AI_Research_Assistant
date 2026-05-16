from typing import TypedDict, Any
from langgraph.graph import StateGraph, START, END
import agents
from rich import print
from utils.prompts import writer_prompt
from langgraph.config import get_stream_writer

class AgentState(TypedDict):
    topic: str
    search_results: str
    scrape_results: str
    final_research: str
    

# NODES
async def search_node(state: AgentState) -> dict[str, Any]:
    writer = get_stream_writer()
    writer({"node": "search_node"}) 
    print("\n\nAgent is Searching over Internet...")
    topic = state['topic']
    prompt = f"Retrieve latest and reliable search results on topic: {topic}"
    search_agent = agents.search_agent()
    response = await search_agent.ainvoke({'messages':prompt})
    return {'search_results': response['messages'][-1].content}

async def scrape_node(state: AgentState) -> dict[str, Any]:
    writer = get_stream_writer()
    writer({"node": "scrape_node"}) 
    print("Agent is Scraping Content from Sources...")
    search_results = state['search_results']
    prompt = f"""Scrape the content from the given urls\n\nURLS in : {search_results}\nIt will be used to write research"""
    scrape_agent = agents.scrape_agent()
    response = await scrape_agent.ainvoke({'messages':prompt})
    return {'scrape_results': response['messages'][-1].content}

async def writter_node(state: AgentState) -> dict[str, Any]:
    writer = get_stream_writer()
    writer({"node": "writter_node"})
    print("Agent is writing Final Research...")
    scrape_results = state['scrape_results']
    topic = state['topic']
    prompt = writer_prompt(topic, scrape_results)
    final_text = ""
    writter_agent = agents.writter_agent()
    async for chunk, metadata in  writter_agent.astream(
        {'messages': prompt},
        stream_mode="messages"
    ):
        if hasattr(chunk, "content") and chunk.content:
            final_text += chunk.content
    print("Agent is finished writting Final Research...")
    return {
        "final_research": final_text
    }


workflow = (
    StateGraph(AgentState)
    .add_node('search_node', search_node)
    .add_node('scrape_node', scrape_node)
    .add_node('writter_node', writter_node)
    .add_edge(START, 'search_node')
    # .add_edge('search_node', END)
    .add_edge('search_node', 'scrape_node')
    .add_edge('scrape_node', 'writter_node')
    .add_edge('writter_node', END)
    .compile()
)

# fs = workflow.invoke({"topic":"west bengal election 2026"})
# print(fs['final_research'])