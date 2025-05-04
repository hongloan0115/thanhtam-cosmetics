from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.schemas.user import UserCreate, UserLogin, UserOut, UserResponse
from app.services.auth import create_user, authenticate_user, create_access_token, get_password_hash, verify_password
from app.core.config import settings
from app.db.database import get_db
from app.dependencies.auth import require_role
from app.models.user import User
import uuid

router = APIRouter()

@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(user: UserCreate, db: Session = Depends(get_db)):
    
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=409, detail="Email already exists")
    
    random_username = f"user_{uuid.uuid4().hex[:8]}"
    hashed_password = get_password_hash(user.password)
    
    db_user = User(
        username=random_username,
        email=user.email,
        password_hash=hashed_password,
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user 

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(
        (User.email == user.username_or_email) | 
        (User.username == user.username_or_email)
    ).first()

    if not db_user or not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    access_token = create_access_token(db_user)
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/admin-only")
def admin_data(current_user=Depends(require_role(["admin"]))):
    return {"message": f"Hello Admin {current_user['email']}"}

@router.get("/employee-or-admin")
def staff_data(current_user=Depends(require_role(["admin", "employee"]))):
    return {"message": f"Hello {current_user['role']} {current_user['email']}"}