# app/routes/user.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.user import UserResponse, UpdatePersonalInfoSchema, ChangePasswordSchema
from app.dependencies.auth import get_current_user
from app.models.user import User
from passlib.context import CryptContext

router = APIRouter(
    prefix="/api/user",
    tags=["User"]
)

@router.get("/me", response_model=UserResponse)
def get_user_info(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/profile")
def update_personal_info(
    info: UpdatePersonalInfoSchema,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Cập nhật thông tin cá nhân
    user = db.query(User).filter(User.id == current_user.id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.username = info.username
    user.phone = info.phone
    db.commit()
    
    return {"message": "Personal information updated successfully"}

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/change-password")
def change_password(
    passwords: ChangePasswordSchema,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    user = db.query(User).filter(User.id == current_user.id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Kiểm tra mật khẩu hiện tại
    if not pwd_context.verify(passwords.currentPassword, user.password_hash):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    
    # Kiểm tra mật khẩu mới và xác nhận mật khẩu
    if passwords.newPassword != passwords.confirmPassword:
        raise HTTPException(status_code=400, detail="New password and confirm password do not match")
    
    # Cập nhật mật khẩu
    hashed_new_password = pwd_context.hash(passwords.newPassword)
    user.password_hash = hashed_new_password
    db.commit()
    
    return {"message": "Password updated successfully"}
