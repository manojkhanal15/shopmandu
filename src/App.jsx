import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Journal from "./pages/Journal";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Header setSearch={setSearch} />

      <Routes>
        <Route path="/" element={<ProductListing search={search} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/success" element={<OrderSuccess />} />

        {/* 404 */}
        <Route
          path="*"
          element={<h1 style={{ padding: "40px" }}>404 - Page Not Found</h1>}
        />
      </Routes>
    </>
  );
}

export default App;