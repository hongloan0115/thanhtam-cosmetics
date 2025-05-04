from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import Base, engine
from app.models import cart_item
from app.api import auth, admin_user, admin_product, product, cart, order, user

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # hoặc "*" nếu đang dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(auth.router, prefix="/api/user", tags=["user"])
app.include_router(admin_user.router)
app.include_router(admin_product.router)
app.include_router(product.router) 
app.include_router(cart.router)
app.include_router(order.router)
app.include_router(user.router)