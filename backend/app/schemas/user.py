from pydantic import BaseModel, EmailStr, validator
from typing import Optional
from datetime import datetime
import re

class UserBase(BaseModel):
    email: str

class User(UserBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: str = "customer"

    @validator("password")
    def validate_password_strength(cls, v):
        if len(v) < 8:
            raise ValueError("Mật khẩu phải có ít nhất 8 ký tự.")
        if not re.search(r"[A-Z]", v):
            raise ValueError("Mật khẩu phải chứa ít nhất một chữ cái viết hoa.")
        if not re.search(r"[a-z]", v):
            raise ValueError("Mật khẩu phải chứa ít nhất một chữ cái thường.")
        if not re.search(r"[0-9]", v):
            raise ValueError("Mật khẩu phải chứa ít nhất một số.")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", v):
            raise ValueError("Mật khẩu phải chứa ít nhất một ký tự đặc biệt.")
        return v

class UserUpdate(BaseModel):
    email: str | None = None
    is_admin: bool | None = None

class UserOut(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        orm_mode = True  # Bắt buộc để hỗ trợ đọc từ SQLAlchemy model
    
class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: str
    phone: Optional[str]
    avatar_url: Optional[str]
    is_active: bool
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    username_or_email: str
    password: str

class UpdatePersonalInfoSchema(BaseModel):
    username: str
    phone: str

class ChangePasswordSchema(BaseModel):
    currentPassword: str
    newPassword: str
    confirmPassword: str
