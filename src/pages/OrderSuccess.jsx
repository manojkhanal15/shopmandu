import { Link } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  return (
    <div className="success">
      <h1>🎉 Order Placed Successfully!</h1>
      <p>Thank you for your purchase.</p>

      <Link to="/" className="success-btn">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;