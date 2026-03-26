import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";
import "./Cart.css";

const Cart = () => {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
    totalPrice,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Add some products to get started.</p>
        <Link to="/" className="cart-empty__link">
          Continue Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2 className="cart-title">Your Cart</h2>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="cart-item"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="cart-item__image"
            />

            {/* Info */}
            <div className="cart-item__info">
              <p className="cart-item__name">{item.name}</p>
              <p className="cart-item__size">
                Size: {item.size}
              </p>
            </div>

            {/* Quantity */}
            <div className="cart-item__quantity">
              <button onClick={() => decreaseQty(item.id)}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQty(item.id)}>+</button>
            </div>

            {/* Subtotal */}
            <div className="cart-item__subtotal">
              {formatPrice(item.price * item.quantity)}
            </div>

            {/* Remove */}
            <button
              className="cart-item__remove"
              onClick={() => removeFromCart(item.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="cart-summary">
        <div className="cart-summary__left">
          <h3>Total</h3>
          <p>{formatPrice(totalPrice)}</p>
        </div>

        <div className="cart-summary__actions">
          <button
            className="cart-clear-btn"
            onClick={clearCart}
          >
            Clear Cart
          </button>

          <Link
            to="/checkout"
            className="cart-checkout-btn"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;