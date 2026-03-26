import { useParams } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import products from "../data/products";
import { formatPrice } from "../utils/formatPrice";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  if (!product) {
    return (
      <div className="product-details__not-found">
        <h2>Product not found</h2>
        <p>The product you are looking for does not exist.</p>
      </div>
    );
  }

  const sizes = ["S", "M", "L", "XL"];

  const increaseQty = () => {
    if (quantity < 10) setQuantity((q) => q + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Please select a size before adding to cart.");
      return;
    }

    setError("");

    addToCart({
      ...product,
      size: selectedSize,
      quantity,
    });
  };

  return (
    <div className="product-details">
      
      {/* LEFT - IMAGE */}
      <div className="product-details__image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-details__image"
        />
      </div>

      {/* RIGHT - INFO */}
      <div className="product-details__info">
        <h1 className="product-details__name">{product.name}</h1>

        <p className="product-details__price">
          {formatPrice(product.price)}
        </p>

        <p className="product-details__description">
          {product.description}
        </p>

        {/* ACTIONS */}
        <div className="product-details__actions">

          {/* SIZE */}
          <div>
            <p className="label">Select Size</p>
            <div className="sizes-list">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${
                    selectedSize === size ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedSize(size);
                    setError("");
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div>
            <p className="label">Quantity</p>
            <div className="quantity-controls">
              <button onClick={decreaseQty}>−</button>
              <span>{quantity}</span>
              <button onClick={increaseQty}>+</button>
            </div>
          </div>

          {error && (
            <p className="product-details__error">{error}</p>
          )}

          {/* CTA */}
          <button
            className="product-details__cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;