from fastapi.testclient import TestClient
from app.main import app
from app.services.auth import register_user, login_user
from app.models.user import User
from app.schemas.user import UserCreate

client = TestClient(app)

def test_register_user():
    user_data = {"email": "testuser", "password": "testpassword"}
    response = client.post("/api/auth/register", json=user_data)
    assert response.status_code == 201
    assert response.json()["email"] == user_data["email"]

def test_login_user():
    user_data = {"email": "testuser", "password": "testpassword"}
    # First, register the user
    client.post("/api/auth/register", json=user_data)
    
    # Now, attempt to log in
    response = client.post("/api/auth/login", json=user_data)
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login_user_invalid_credentials():
    user_data = {"email": "invaliduser", "password": "wrongpassword"}
    response = client.post("/api/auth/login", json=user_data)
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid credentials"