import ProductCard from "./ProductCard";
import "./ProductGrid.css";

const ProductGrid = ({ products }) => {
  // Safety check (prevents crash if products is undefined)
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
        />
      ))}
    </div>
  );
};

export default ProductGrid;