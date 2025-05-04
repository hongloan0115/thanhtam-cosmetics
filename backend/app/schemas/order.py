# app/schemas/order.py

from pydantic import BaseModel
from datetime import datetime

from app.schemas.product import ProductInOrderSchema

class OrderItemSchema(BaseModel):
    product: ProductInOrderSchema  # lấy thông tin product
    quantity: int
    price: float

    class Config:
        orm_mode = True


class OrderResponseSchema(BaseModel):
    id: int
    total_price: float
    status: str
    created_at: datetime
    items: list[OrderItemSchema]

    class Config:
        orm_mode = True