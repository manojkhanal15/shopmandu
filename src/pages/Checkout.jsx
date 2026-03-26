import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { z } from "zod";
import toast from "react-hot-toast";
import "./Checkout.css";

const schema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  zip: z.string().regex(/^\d+$/, "ZIP must be numeric"),
});

const Checkout = () => {
  const { clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [quantity, setQuantity] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = () => {
    toast.success("Order placed successfully 🎉");
    clearCart();
  };

  return (
    <div className="checkout">

      <h1 className="checkout-title">Checkout</h1>
      <p className="checkout-subtitle">Please fill all required fields</p>

      <div className="checkout-grid">

        {/* LEFT */}
        <div className="checkout-left">

          {/* SHIPPING */}
          <motion.div className="card">
            <h2>Shipping Information</h2>

            <div className="form-group">
              <input {...register("name")} placeholder="Full Name" />
              <p className="error">{errors.name?.message}</p>
            </div>

            <div className="form-group">
              <input {...register("email")} placeholder="Email" />
              <p className="error">{errors.email?.message}</p>
            </div>

            <div className="form-group">
              <input {...register("address")} placeholder="Address" />
              <p className="error">{errors.address?.message}</p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <input {...register("city")} placeholder="City" />
                <p className="error">{errors.city?.message}</p>
              </div>

              <div className="form-group">
                <input {...register("zip")} placeholder="ZIP Code" />
                <p className="error">{errors.zip?.message}</p>
              </div>
            </div>
          </motion.div>

          {/* PAYMENT */}
          <motion.div className="card">
            <h2>Payment Method</h2>

            <label className="radio">
              <input
                type="radio"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              Cash on Delivery
            </label>

            <label className="radio">
              <input
                type="radio"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              Card Payment
            </label>

            {paymentMethod === "card" && (
              <div className="card-inputs">
                <input placeholder="Card Number" />
                <div className="form-row">
                  <input placeholder="MM/YY" />
                  <input placeholder="CVV" />
                </div>
              </div>
            )}
          </motion.div>

        </div>

        {/* RIGHT */}
        <motion.div className="card summary">
          <h2>Order Summary</h2>

          <div className="summary-item">
            <span>The Sideswept Dhoti</span>
            <span>₹1,999</span>
          </div>

          <div className="quantity">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>₹{1999 * quantity}</span>
          </div>

          <p className="badge">✔ In Stock • Free Delivery</p>

          <button
            onClick={handleSubmit(onSubmit)}
            className="checkout-btn"
          >
            Place Order
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default Checkout;