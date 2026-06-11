from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB — optional; falls back to in-memory storage if unavailable
mongo_url = os.environ.get('MONGO_URL', '')
USE_MONGO = bool(mongo_url)
if USE_MONGO:
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ.get('DB_NAME', 'portfolio')]
    contact_collection = db.contact_submissions
else:
    client = None
    db = None
    contact_collection = None

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    budget: Optional[str] = None
    project_type: Optional[str] = None
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    company: Optional[str] = Field(default=None, max_length=120)
    budget: Optional[str] = Field(default=None, max_length=60)
    project_type: Optional[str] = Field(default=None, max_length=80)
    message: str = Field(..., min_length=1, max_length=4000)


class Project(BaseModel):
    id: str
    slug: str
    title: str
    tagline: str
    role: str
    year: str
    cover_image: str
    accent_color: str
    tags: List[str]
    overview: str
    challenge: str
    solution: str
    gallery: List[str]
    external_url: Optional[str] = None
    featured: bool = False


# ---------- Static projects ----------
PROJECTS: List[Project] = [
    Project(
        id="p1",
        slug="tourist-junction",
        title="TOURISTjunction",
        tagline="Genuine reviews for every destination.",
        role="Solo Developer",
        year="2026",
        cover_image="https://i.pinimg.com/736x/9e/f3/ff/9ef3ff34e4c3c1f5b2e446d8d826e935.jpg",
        accent_color="#FF3B30",
        tags=["HTML", "CSS"],
        overview="An online platform that helps tourists get the right feedback for any place, thing, or activity they want to explore — with reviews pulled from multiple trusted sources.",
        challenge="Travel review sites are fragmented and often untrustworthy. Tourists struggle to find authentic, consolidated feedback about places and activities.",
        solution="A single hub that aggregates reviews from multiple sources, with an intuitive interface for browsing destinations, activities, and verified feedback.",
        gallery=[
            "https://i.pinimg.com/736x/9e/f3/ff/9ef3ff34e4c3c1f5b2e446d8d826e935.jpg",
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=85",
        ],
        external_url="https://github.com/kandhwayanushka-hue/TOURISTjunction",
        featured=True,
    ),
    Project(
        id="p2",
        slug="inventomanego",
        title="InventoManego",
        tagline="Real-time inventory management system.",
        role="Solo Developer",
        year="2026",
        cover_image="https://i.pinimg.com/1200x/f6/a9/1c/f6a91c3729a11909ffc917d80e1a966b.jpg",
        accent_color="#007AFF",
        tags=["JavaScript", "CSS", "HTML"],
        overview="A web-based inventory management system that helps businesses track, manage, and optimize stock in real time with barcode/QR code automation and order management.",
        challenge="Tracking inventory manually leads to stockouts, waste, and slow decisions for multi-outlet businesses. There was no centralized visibility into stock levels.",
        solution="A full-featured inventory system with real-time stock tracking, barcode/QR code automation, order management (purchase & sales), and an analytics dashboard for reporting.",
        gallery=[
            "https://i.pinimg.com/1200x/f6/a9/1c/f6a91c3729a11909ffc917d80e1a966b.jpg",
            "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&q=85",
        ],
        external_url="https://github.com/kandhwayanushka-hue/ProjectSem02",
    ),
    Project(
        id="p3",
        slug="60-days-to-ai",
        title="60 Days to AI",
        tagline="Personal portfolio built in the open.",
        role="Solo Learner & Builder",
        year="2026",
        cover_image="https://i.pinimg.com/736x/43/1c/ce/431ccea7e310a913d35234d481fa6153.jpg",
        accent_color="#FFCC00",
        tags=["HTML", "CSS", "JavaScript"],
        overview="Personal portfolio website built with HTML, CSS & JavaScript — featuring a purple-themed dark design, custom cursor, GitHub API integration, and a contact form.",
        challenge="I needed a place to showcase my work, share my journey, and let people reach out — all while keeping the code simple and deployable anywhere.",
        solution="A vanilla HTML/CSS/JS portfolio with live GitHub integration, contribution chart, contact form, and a polished dark theme — no framework overhead.",
        gallery=[
            "https://i.pinimg.com/736x/43/1c/ce/431ccea7e310a913d35234d481fa6153.jpg",
            "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85",
        ],
        external_url="https://github.com/kandhwayanushka-hue/60-DAYS-TO-AI",
    ),
    Project(
        id="p4",
        slug="60-days-of-fsd",
        title="60 Days of FSD",
        tagline="Daily web dev sprints & experiments.",
        role="Solo Builder",
        year="2026",
        cover_image="https://i.pinimg.com/736x/cf/2e/0f/cf2e0fc2e9143d68398d591eee9674c4.jpg",
        accent_color="#A5B4FC",
        tags=["JavaScript", "HTML", "CSS"],
        overview="A daily web-dev repo documenting small projects, components, and experiments — built to stay consistent and ship every day.",
        challenge="Consistency is the hardest part of learning. Without a structure, days turn into weeks without shipping anything.",
        solution="A repo with daily mini-projects — from UI components to small utilities — each one shipped and documented in the open.",
        gallery=[
            "https://i.pinimg.com/736x/cf/2e/0f/cf2e0fc2e9143d68398d591eee9674c4.jpg",
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=85",
        ],
        external_url="https://github.com/kandhwayanushka-hue/ProjectsPersonal",
    ),
    Project(
        id="p5",
        slug="cse-sem-02",
        title="CSE Sem 02",
        tagline="Daily coding journal & lab experiments.",
        role="Student Developer",
        year="2026",
        cover_image="https://i.pinimg.com/736x/81/83/6b/81836be591039469727d09efc4dcb376.jpg",
        accent_color="#A5B4FC",
        tags=["JavaScript", "HTML", "CSS", "Java"],
        overview="A semester-long coding journal documenting daily web dev practice, lab experiments, and classwork — from JavaScript fundamentals to Java OOP.",
        challenge="Staying consistent across multiple subjects (web dev, Java, data structures) without a unified structure.",
        solution="A structured repo with daily folders (Day_01–Day_08) and lab experiments (experiment01–10), covering JavaScript, HTML, CSS, and Java in one place.",
        gallery=[
            "https://i.pinimg.com/736x/81/83/6b/81836be591039469727d09efc4dcb376.jpg",
            "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&q=85",
        ],
        external_url="https://github.com/kandhwayanushka-hue/CSE-DS1-SEM2-",
    ),
]
PROJECTS_BY_SLUG = {p.slug: p for p in PROJECTS}


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Portfolio API up"}

@api_router.get("/projects", response_model=List[Project])
async def list_projects():
    return PROJECTS

@api_router.get("/projects/{slug}", response_model=Project)
async def get_project(slug: str):
    project = PROJECTS_BY_SLUG.get(slug)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

# In-memory fallback when MongoDB is not configured
_in_memory_contacts: list[dict] = []

@api_router.post("/contact", response_model=ContactSubmission)
async def create_contact(payload: ContactSubmissionCreate):
    submission = ContactSubmission(**payload.model_dump())
    doc = submission.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    if USE_MONGO and contact_collection is not None:
        await contact_collection.insert_one(doc)
    else:
        _in_memory_contacts.append(doc)
    return submission

@api_router.get("/contact", response_model=List[ContactSubmission])
async def list_contacts():
    if USE_MONGO and contact_collection is not None:
        docs = await contact_collection.find({}, {"_id": 0}).sort("timestamp", -1).to_list(500)
        for d in docs:
            if isinstance(d.get("timestamp"), str):
                d["timestamp"] = datetime.fromisoformat(d["timestamp"])
        return docs
    # In-memory fallback
    return sorted(_in_memory_contacts, key=lambda x: x.get("timestamp", ""), reverse=True)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    if client:
        client.close()
