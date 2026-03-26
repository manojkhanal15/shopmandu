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
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Header setSearch={setSearch} />

      <Routes>
        <Route path="/" element={<ProductListing search={search} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />

        {/* 🔐 PROTECTED CHECKOUT */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="*"
          element={<h1 style={{ padding: "40px" }}>404 - Page Not Found</h1>}
        />
      </Routes>
    </>
  );
}

export default App;