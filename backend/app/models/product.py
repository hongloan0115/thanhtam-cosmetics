# app/models/product.py

from sqlalchemy import Column, Integer, String, Float
from app.db.database import Base
from sqlalchemy.orm import relationship

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(String(1000))
    price = Column(Float, nullable=False)
    quantity = Column(Integer, default=0)

    order_items = relationship("OrderItem", back_populates="product")