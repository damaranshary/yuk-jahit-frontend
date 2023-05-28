import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Cart from "../pages/cart";
import Home from "../pages/home";
import Profile from "../pages/profile";
import Login from "../pages/login";
import Products from "../pages/all-products";
import Register from "../pages/register";
import Product from "../pages/product";
import Navbar from "../components/navbar";
import Search from "../pages/search";
import Order from "../pages/order";
import NotFound404 from "../pages/404";
import Footer from "../components/footer";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="order" element={<Order />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products">
            <Route index element={<Products />} />
            <Route path=":id" element={<Product />} />
          </Route>
          <Route path="search" element={<Search />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
