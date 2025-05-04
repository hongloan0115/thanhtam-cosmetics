# app/routes/order.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.order import Order, OrderItem
from app.models.cart_item import CartItem
from app.models.product import Product
from app.schemas.order import OrderResponseSchema
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.order import OrderResponseSchema, OrderItemSchema
from sqlalchemy.orm import joinedload

router = APIRouter(
    prefix="/api/order",
    tags=["Order"]
)

# ✅ Tạo đơn hàng từ giỏ hàng
@router.post("/checkout", response_model=OrderResponseSchema)
def checkout(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    cart_items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()

    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    total_price = sum(item.quantity * item.product.price for item in cart_items)

    order = Order(user_id=current_user.id, total_price=total_price)
    db.add(order)
    db.flush()  # Lấy order.id sau khi insert

    for item in cart_items:
        order_item = OrderItem(
            order_id=order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price=item.product.price
        )
        db.add(order_item)
        db.delete(item)  # Xóa khỏi giỏ

    db.commit()
    db.refresh(order)

    # Trả về đơn hàng với product_name
    order_response = OrderResponseSchema(
        id=order.id,
        total_price=order.total_price,
        status=order.status,
        created_at=order.created_at,
        items=[
            OrderItemSchema(
                product_id=item.product_id,
                product_name=item.product.name,  # Thêm product_name từ bảng Product
                quantity=item.quantity,
                price=item.price
            )
            for item in order.items
        ]
    )

    return order_response

# ✅ Lấy danh sách đơn hàng của user
@router.get("/", response_model=list[OrderResponseSchema])
def get_user_orders(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    orders = db.query(Order)\
        .options(joinedload(Order.items).joinedload(OrderItem.product))\
        .filter(Order.user_id == current_user.id)\
        .all()
    return orders

# ✅ Lấy chi tiết một đơn hàng cụ thể
@router.get("/{order_id}", response_model=OrderResponseSchema)
def get_order(order_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    order = db.query(Order).filter(Order.id == order_id, Order.user_id == current_user.id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
