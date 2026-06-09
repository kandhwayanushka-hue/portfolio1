import pytest
from httpx import AsyncClient, ASGITransport
from server import app


@pytest.fixture
def client():
    transport = ASGITransport(app=app)
    return AsyncClient(transport=transport, base_url="http://test")


@pytest.mark.asyncio
async def test_root(client):
    r = await client.get("/api/")
    assert r.status_code == 200
    assert r.json()["message"] == "Portfolio API up"


@pytest.mark.asyncio
async def test_list_projects(client):
    r = await client.get("/api/projects")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) == 3


@pytest.mark.asyncio
async def test_get_project_by_slug(client):
    r = await client.get("/api/projects/portfolio")
    assert r.status_code == 200
    data = r.json()
    assert data["slug"] == "portfolio"
    assert data["title"] == "Portfolio"


@pytest.mark.asyncio
async def test_get_project_404(client):
    r = await client.get("/api/projects/nonexistent")
    assert r.status_code == 404
    assert r.json()["detail"] == "Project not found"


@pytest.mark.asyncio
async def test_contact_post_valid(client):
    payload = {
        "name": "Test User",
        "email": "test@example.com",
        "company": "TestCo",
        "budget": "$5k – $15k",
        "project_type": "Web Design",
        "message": "Hello, we'd like to work together.",
    }
    r = await client.post("/api/contact", json=payload)
    assert r.status_code == 200
    data = r.json()
    assert data["name"] == "Test User"
    assert data["email"] == "test@example.com"
    assert "id" in data
    assert "timestamp" in data


@pytest.mark.asyncio
async def test_contact_post_invalid_email(client):
    payload = {
        "name": "Bad Email",
        "email": "not-an-email",
        "message": "This should fail.",
    }
    r = await client.post("/api/contact", json=payload)
    assert r.status_code == 422


@pytest.mark.asyncio
async def test_contact_post_missing_required(client):
    payload = {"name": "", "email": "", "message": ""}
    r = await client.post("/api/contact", json=payload)
    assert r.status_code == 422


@pytest.mark.asyncio
async def test_list_contacts(client):
    r = await client.get("/api/contact")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    if data:
        assert "email" in data[0]


@pytest.mark.asyncio
async def test_list_contacts_newest_first(client):
    r = await client.get("/api/contact")
    assert r.status_code == 200
    data = r.json()
    timestamps = [d["timestamp"] for d in data if "timestamp" in d]
    if len(timestamps) > 1:
        assert timestamps == sorted(timestamps, reverse=True)
