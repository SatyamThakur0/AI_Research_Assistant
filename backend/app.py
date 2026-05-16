from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from ai_workflow import workflow
import agents
from langchain_core.messages import AIMessageChunk
from utils.prompts import writer_prompt
import asyncio, json, os
from rich import print
from rich.markdown import Markdown
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
load_dotenv()



app = FastAPI(
    title="AI Research Assistant"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("FRONTEND_URL")
    ],

    # Allow cookies/auth headers
    allow_credentials=True,

    # Allow all HTTP methods
    allow_methods=["*"],

    # Allow all headers
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {
        "ok": True,
        "message": "Application is Running 🚀"
    }

@app.get("/get-research")
async def get_research(topic: str):
    STATUS_MAP = {
        "search_node": "Searching over Internet... 🔍",
        "scrape_node": "Scraping sources... 🌐",
        "writter_node": "Writing final research... ✍️"
    }

    async def generate():
        current_outer_node = None  # Track which outer node is active

        # Stream "updates" and "messages" together
        async for chunk in workflow.astream(
            {'topic': topic},
            stream_mode=["messages", "custom"],  # dual mode
        ):
            event_type, data = chunk
            if event_type == "custom":
                # This tells us which OUTER node just finished/started
                node_name = data.get("node")
                if node_name in STATUS_MAP:
                    current_outer_node = node_name
                    status = STATUS_MAP[node_name]
                    yield json.dumps({'type': 'status', 'data': status})+"\n"

            elif event_type == "messages":
                msg, metadata = data
                # Only yield streamed tokens when the active outer node is writter_node
                if current_outer_node == "writter_node" and msg.content:
                    yield json.dumps({'type': 'content', 'data': msg.content})+"\n"

        yield json.dumps({'type': 'done'})+"\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )
    
@app.get("/test-stream")
async def test_stream():

    async def generate():
        s = """# **Research Report: Cognizant ACE AI Full Stack Engineer Program (2026)**

## **Introduction**
Cognizant, a leading global professional services company, has introduced the **ACE (Accelerated Career Entry) AI Full Stack Engineer program** as part of its **2026 off-campus hiring initiative**. This program is designed to attract and nurture **fresh engineering graduates** with expertise in **AI-driven full-stack development**, offering competitive salaries, structured training, and exposure to cutting-edge technologies.

The role aligns with Cognizant’s broader strategy of fostering **innovation in AI and cloud-based solutions**, while also reinforcing its reputation as a **Great Place to Work** with strong **learning and development (L&D) programs**. This report analyzes the **role requirements, eligibility criteria, compensation, selection process, and career growth opportunities** associated with the **Cognizant ACE AI Full Stack Engineer** position.

---

## **Key Findings**

### **1. Role Scope and Responsibilities**
The **Cognizant ACE AI Full Stack Engineer** is a **hybrid technical role** that combines **AI/ML engineering with full-stack software development**. Key responsibilities include:

- **AI/ML & LLM Integration**:
  - Developing **AI-enabled applications** using **Generative AI, Retrieval-Augmented Generation (RAG) pipelines, and Large Language Model (LLM) orchestration tools** such as **LangChain, LlamaIndex, and AutoGen**.
  - Implementing **machine learning models** for predictive analytics, natural language processing (NLP), and automation.

- **Full-Stack Development**:
  - Building **frontend applications** using **React/Angular** and **backend services** with **Python, Java/.NET, and Node.js**.
  - Designing and optimizing **RESTful APIs** and **microservices architectures**.
  - Working with **SQL and NoSQL databases** for data storage and retrieval.

- **Cloud & DevOps**:
  - Deploying applications on **cloud platforms (AWS, Azure, GCP)**.
  - Implementing **CI/CD pipelines** for automated testing and deployment.

- **Collaboration & Client Engagement**:
  - Working with **cross-functional teams** (data scientists, UI/UX designers, business analysts).
  - Engaging with **global clients** to understand business requirements and deliver AI-driven solutions.

This role is structured to bridge the gap between **AI research and real-world software development**, making it ideal for graduates interested in **applied AI and full-stack engineering**.

---

### **2. Eligibility, Compensation, and Hiring Process**
#### **Eligibility Criteria**
The **Cognizant ACE AI Full Stack Engineer** program is exclusively for **2026 graduates** with the following qualifications:

- **Educational Background**:
  - **B.E./B.Tech** in **Computer Science (CS), Information Technology (IT), Electronics & Communication Engineering (ECE), or related fields**.
  - **No prior work experience required** (open to freshers).

- **Technical Skills**:
  - **Programming**: Proficiency in **Python, Java/.NET, JavaScript/TypeScript**.
  - **Frontend**: Experience with **React.js or Angular**.
  - **Backend & APIs**: Knowledge of **REST APIs, SQL/NoSQL databases**.
  - **AI/ML**: Familiarity with **AI frameworks (TensorFlow, PyTorch), LLM orchestration (LangChain, LlamaIndex), and cloud platforms (AWS/Azure/GCP)**.

#### **Compensation Structure**
Cognizant offers **competitive salaries** for this role, structured as follows:

| **Position**            | **Salary (LPA)** | **Target Candidates**          |
|-------------------------|------------------|--------------------------------|
| **Associate**           | ₹12 LPA          | Fresh graduates (0 years exp)  |
| **Senior Associate**    | ₹18 LPA          | High-performing candidates     |

This compensation is **significantly higher than industry averages** for entry-level roles in India, reflecting the **specialized nature of AI and full-stack development**.

#### **Selection Process**
The hiring process consists of **three stages**:

1. **Online Assessment**:
   - **Aptitude Test**: Logical reasoning, verbal ability, and quantitative analysis.
   - **Technical Test**: Coding challenges (Python/Java), AI/ML concepts, and full-stack development scenarios.

2. **Technical Interview**:
   - **Deep dive into AI/ML and full-stack development**.
   - **Problem-solving exercises** (e.g., optimizing an API, debugging a machine learning model).

3. **HR Interview**:
   - **Behavioral and situational questions**.
   - **Alignment with Cognizant’s culture and values**.

Successful candidates undergo **structured training** through Cognizant’s **Launch program**, which includes **Generative AI and full-stack engineering modules**.

---

### **3. Career Growth and Organizational Benefits**
#### **Training & Upskilling**
Cognizant emphasizes **continuous learning** through:
- **Launch Program**: A **6-12 month training initiative** covering **AI, cloud computing, and full-stack development**.
- **Certifications**: Opportunities to earn **AWS, Azure, and AI/ML certifications**.
- **Mentorship**: Guidance from **senior engineers and AI specialists**.

#### **Work Culture & Diversity**
- Cognizant is **Great Place to Work-certified**, known for:
  - **Inclusive work environment** (diversity in gender, ethnicity, and background).
  - **Flexible work policies** (hybrid/remote options in some cases).
  - **Employee resource groups (ERGs)** for networking and support.

#### **Global Exposure & Project Opportunities**
- Engineers in the **ACE program** work on **high-impact AI projects** for **Fortune 500 clients**.
- Potential for **international assignments** in Cognizant’s global delivery centers.
- **Fast-track promotions** for high performers, with pathways to **AI architect, data scientist, or technical lead roles**.

#### **Limitations & Considerations**
- **High Competition**: Given the **attractive salary and brand value**, the selection process is **highly competitive**.
- **Location Constraints**: While **13 Indian cities** are listed, candidates may need to relocate based on project requirements.
- **Performance Pressure**: The role demands **rapid upskilling** in **emerging AI technologies**, which may be challenging for some freshers.

---

## **Conclusion**
The **Cognizant ACE AI Full Stack Engineer** program represents a **premium career launchpad** for **2026 engineering graduates** specializing in **AI and full-stack development**. With **salaries up to ₹18 LPA**, **structured training in Generative AI**, and **global project exposure**, the program is designed to **accelerate career growth** in one of the **fastest-growing tech domains**.

However, the **rigorous selection process** and **demand for advanced technical skills** mean that only **highly motivated and skilled candidates** will secure a position. For those who succeed, the role offers **unparalleled learning opportunities, mentorship, and a clear pathway to leadership in AI-driven software engineering**.

Cognizant’s **commitment to innovation, diversity, and employee development** further enhances the appeal of this program, making it a **top choice for aspiring AI full-stack engineers** in India.

---

## **Sources**
1. Cognizant Careers Portal – [https://careers.cognizant.com/](https://careers.cognizant.com/)
2. Freshershunt – Cognizant ACE Team Off-Campus Drive 2026 – [https://freshershunt.in/cognizant-ace-team-off-campus-drive-2026/](https://freshershunt.in/cognizant-ace-team-off-campus-drive-2026/)
3. YouTube – Cognizant Superset ACE Hiring 2026 – [https://www.youtube.com/watch?v=u3_fVH4o5Fg](https://www.youtube.com/watch?v=u3_fVH4o5Fg)
4. Instagram – Cognizant Hiring Updates (Content not scraped, referenced for visual updates)
5. Reddit – Cognizant ACE Program Discussion (Content not scraped, referenced for candidate experiences)"""

        # st = s.split(" ")
        # yield s
        search = False
        fetch = False
        for i in range(0,len(s),20):
            if i==500:
                search = True
            if i==1000:
                fetch = True
            # yield s[i:i+10]
            yield json.dumps({
                'type': 'content',
                'data': s[i:i+20]
            })+'\n'
            if search:
                yield json.dumps({
                    'type':'status',
                    'data':'Searching ...'
                })+"\n"
                search = False
                
            if fetch:
                yield json.dumps({
                    'type':'status',
                    'data':'Fetching ...'
                })+"\n"
                fetch = False
            await asyncio.sleep(0.05)

    return StreamingResponse(
        generate(),
        media_type="text/plain",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )