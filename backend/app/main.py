from fastapi import FastAPI
from app.db.session import engine
from app.models import user  # import models để tạo bảng

from app.db.base import Base

app = FastAPI()

# Tạo bảng nếu chưa có (chỉ nên dùng lúc dev)
Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Hello FastAPI + MySQL"}
