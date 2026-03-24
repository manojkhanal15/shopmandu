import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import "./Checkout.css";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });

  const [error, setError] = useState("");

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 💳 Card formatting
  const handleCardChange = (e) => {
    let { name, value } = e.target;

    if (name === "number") {
      value = value.replace(/\D/g, "");
      value = value.substring(0, 16);
      value = value.replace(/(.{4})/g, "$1 ").trim();
    }

    if (name === "expiry") {
      value = value.replace(/\D/g, "");
      value = value.substring(0, 4);

      if (value.length >= 3) {
        value = value.slice(0, 2) + "/" + value.slice(2);
      }
    }

    if (name === "cvv") {
      value = value.replace(/\D/g, "");
      value = value.substring(0, 3);
    }

    setCard({ ...card, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    // Validation
    if (!form.name || !form.email || !form.address) {
      setError("Please fill all required fields");
      return;
    }

    if (paymentMethod === "card") {
      if (!card.number || !card.expiry || !card.cvv) {
        setError("Please fill card details");
        return;
      }
    }

    clearCart();
    navigate("/success");
  };

  if (cartItems.length === 0) {
    return <h2 style={{ padding: "40px" }}>Your cart is empty</h2>;
  }

  return (
    <div className="checkout">
      {/* LEFT */}
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Checkout</h2>

        {error && <p className="checkout-error">{error}</p>}

        {/* Customer Info */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
        />

        <input
          type="text"
          name="zip"
          placeholder="ZIP Code"
          onChange={handleChange}
        />

        {/* 💳 Payment */}
        <div className="payment">
          <h3>Payment Method</h3>

          <label>
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            Cash on Delivery
          </label>

          <label>
            <input
              type="radio"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            Card Payment
          </label>

          {/* Card Inputs */}
          {paymentMethod === "card" && (
            <div className="card-inputs">
              <input
                type="text"
                name="number"
                placeholder="Card Number"
                value={card.number}
                onChange={handleCardChange}
              />

              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={card.expiry}
                onChange={handleCardChange}
              />

              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={card.cvv}
                onChange={handleCardChange}
              />
            </div>
          )}
        </div>

        <button type="submit" className="checkout-btn">
          Place Order
        </button>
      </form>

      {/* RIGHT */}
      <div className="checkout-summary">
        <h3>Order Summary</h3>

        {cartItems.map((item) => (
          <div key={item.id} className="checkout-item">
            <span>{item.name}</span>
            <span>
              {item.quantity} × {formatPrice(item.price)}
            </span>
          </div>
        ))}

        <hr />

        {/* ✅ Total Updated */}
        <h3>Total: {formatPrice(totalPrice)}</h3>
      </div>
    </div>
  );
};

export default Checkout;