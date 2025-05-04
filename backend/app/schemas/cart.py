# app/schemas/cart.py

from pydantic import BaseModel

class CartAddItem(BaseModel):
    product_id: int
    quantity: int

class CartUpdateItem(BaseModel):
    product_id: int
    quantity: int

class CartResponseItem(BaseModel):
    product_id: int
    product_name: str
    quantity: int
    price: float

    class Config:
        orm_mode = True
