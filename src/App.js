import React from "react";
import { Route, Routes } from "react-router-dom";

import Main from "./layouts/private.main";
import MainPublic from "./layouts/public.main";

import Home from "./components/home";
import MainUser from "./views/private/users/mainUser";
import MainProduct from "./views/private/products/mainProduct";
import MainOrder from "./views/private/orders/mainOrder";
import DetailOrder from "./views/private/orders/detailOrder";
import HomePublic from "./views/public/home/home";
import ProductDetail from "./views/public/productDetail/productDetail";
import ProductPage from "./views/public/productPage/productPage";
import Login from "./layouts/login";
import Register from "./layouts/register";
import ShopingCart from "./views/public/shopingCart/shopingCart";
import FormProduct from "./views/private/products/formProduct";
import ProductDetailPrivate from "./views/private/products/productDetail";
import FavoritePage from "./views/public/favoritePage/favoritePage";
import ProfileUser from "./views/public/profileUser/profileUser";
import FormAddress from "./views/public/profileUser/formAddress";
import CheckoutShoping from "./views/public/profileUser/checkout";
import OrderDetail from "./views/public/profileUser/detailOrder";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>

        <Route path="" element={<MainPublic />}>
          <Route path="" element={<HomePublic />} />
          <Route path="/productpage" element={<ProductPage />} />
          <Route path="/ShopingCart" element={<ShopingCart />} />
          <Route path="/FavoritePage" element={<FavoritePage />} />
          <Route path="/ProfileUser" element={<ProfileUser />} />
          <Route path="/FormAddress" element={<FormAddress />} />
          <Route path="/CheckoutShoping" element={<CheckoutShoping />} />
          <Route path="/productdetail/:pdid" element={<ProductDetail />} />
          <Route path="/DetailOrder/:orderId" element={<OrderDetail />} />
          <Route path="/productpage/productdetail/:pdid" element={<ProductDetail />} />
        </Route>

        <Route path="admin" element={<Main />}>
          <Route path="" element={<Home />} />
          <Route path="/admin/mainUser" element={<MainUser />} />
          <Route path="/admin/mainProduct" element={<MainProduct />} />
          <Route path="/admin/productDetail/:pdid" element={<ProductDetailPrivate />} />
          <Route path="/admin/formProduct" element={<FormProduct />} />
          <Route path="/admin/formProduct/:pdid" element={<FormProduct />} />
          <Route path="/admin/mainOrder" element={<MainOrder />} />
          <Route path="/admin/detailOrder" element={<DetailOrder />} />
        </Route>

        <Route path="*" element={<h1>error 404</h1>} />
      </Routes>
    </div>
  );
}

export default App;
