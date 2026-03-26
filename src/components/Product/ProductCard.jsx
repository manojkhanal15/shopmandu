import { Link } from "react-router-dom";
import "./ProductCard.css";
import { formatPrice } from "../../utils/formatPrice";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
        />

        {/* 🔥 Hover Overlay */}
        <div className="product-card__overlay">
          <span>View Product</span>
        </div>
      </Link>

      <div className="product-card__info">
        <p className="product-card__name">{product.name}</p>
        <p className="product-card__price">
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;