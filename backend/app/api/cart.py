# app/routes/cart.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.cart_item import CartItem
from app.models.product import Product
from app.schemas.cart import CartAddItem, CartUpdateItem, CartResponseItem
from app.dependencies.auth import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/api/cart",
    tags=["Cart"]
)

@router.post("/add")
def add_to_cart(item: CartAddItem, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    product = db.query(Product).filter(Product.id == item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    cart_item = db.query(CartItem).filter_by(user_id=current_user.id, product_id=item.product_id).first()
    if cart_item:
        cart_item.quantity += item.quantity
    else:
        cart_item = CartItem(user_id=current_user.id, product_id=item.product_id, quantity=item.quantity)
        db.add(cart_item)

    db.commit()
    return {"message": "Item added to cart"}

# ✅ Lấy giỏ hàng
@router.get("/", response_model=list[CartResponseItem])
def get_cart(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    cart_items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
    response = [
        CartResponseItem(
            product_id=item.product.id,
            product_name=item.product.name,
            quantity=item.quantity,
            price=item.product.price
        ) for item in cart_items
    ]
    return response

# ✅ Cập nhật số lượng
@router.put("/update")
def update_cart(item: CartUpdateItem, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    cart_item = db.query(CartItem).filter_by(user_id=current_user.id, product_id=item.product_id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Item not in cart")

    cart_item.quantity = item.quantity
    db.commit()
    return {"message": "Cart updated"}

# ✅ Xóa khỏi giỏ
@router.delete("/remove/{product_id}")
def remove_from_cart(product_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    cart_item = db.query(CartItem).filter_by(user_id=current_user.id, product_id=product_id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Item not in cart")

    db.delete(cart_item)
    db.commit()
    return {"message": "Item removed from cart"}
