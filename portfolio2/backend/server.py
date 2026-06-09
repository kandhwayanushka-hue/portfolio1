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


# ---------- Static projects ----------
PROJECTS: List[Project] = [
    Project(
        id="p1",
        slug="portfolio",
        title="Portfolio",
        tagline="My personal site — built from scratch.",
        role="Designer & Developer",
        year="2026",
        cover_image="https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=85",
        accent_color="#FF66B2",
        tags=["React", "Tailwind", "JavaScript"],
        overview="A handcrafted developer portfolio that turns my learning journey into a living document — clean typography, deliberate motion, and a brutalist edge.",
        challenge="Most student portfolios feel like resumes. I wanted something that felt like me — playful, current, and confident about being a work in progress.",
        solution="Custom-built in React + Tailwind, with marquee tickers, a cursor-aware hero, and project cards that link straight to my source on GitHub.",
        gallery=[
            "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=85",
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=85",
        ],
        external_url="https://github.com/kandhwayanushka-hue/portfolio",
    ),
    Project(
        id="p2",
        slug="60-days-to-ai",
        title="60 Days to AI",
        tagline="A learn-in-public AI journey.",
        role="Solo Learner & Builder",
        year="2025",
        cover_image="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=85",
        accent_color="#FFCC00",
        tags=["HTML", "Python", "Data Science"],
        overview="A 60-day public log of building toward AI fluency — daily notes, mini-projects, and shipped experiments documented in the open.",
        challenge="AI tutorials are everywhere, but consistency is rare. I needed a structure that would force me to ship something every single day.",
        solution="A repo + microsite that pairs daily notes with runnable examples, from Python fundamentals to small data-science experiments.",
        gallery=[
            "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=85",
            "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85",
        ],
        external_url="https://github.com/kandhwayanushka-hue/60-DAYS-TO-AI",
    ),
    Project(
        id="p3",
        slug="projects-personal",
        title="Projects Personal",
        tagline="Web dev, every day.",
        role="Full-Stack Tinkerer",
        year="2025",
        cover_image="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=85",
        accent_color="#007AFF",
        tags=["JavaScript", "React", "Node.js"],
        overview="A living collection of small full-stack experiments — landing pages, mini tools, and component studies that keep me sharp between courses.",
        challenge="Big projects can stall for weeks. I wanted a low-friction home for the small ones — the ones I finish in an afternoon and learn the most from.",
        solution="A single repo where each folder is a self-contained experiment. New things get tried fast; the best ones graduate into bigger projects.",
        gallery=[
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=85",
            "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=85",
        ],
        external_url="https://github.com/kandhwayanushka-hue/ProjectsPersonal",
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
