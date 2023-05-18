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
  const Layout = ({ children }: any) => (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path="order"
            element={
              <Layout>
                <Order />
              </Layout>
            }
          />
          <Route
            path="cart"
            element={
              <Layout>
                <Cart />
              </Layout>
            }
          />
          <Route path="products">
            <Route
              index
              element={
                <Layout>
                  <Products />
                </Layout>
              }
            />
            <Route
              path=":id"
              element={
                <Layout>
                  <Product />
                </Layout>
              }
            />
          </Route>
          <Route
            path="search"
            element={
              <Layout>
                <Search />
              </Layout>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="*"
            element={
              <Layout>
                <NotFound404 />
              </Layout>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
