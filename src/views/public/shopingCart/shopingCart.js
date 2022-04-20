import React, { useEffect, useState } from "react";
import HeaderPage from "../../../components/header";
import Footer from "../../../components/footer.public";
import { Link, useNavigate } from "react-router-dom";
import { ChkStock } from "../../../services/Product.Service";
import Swal from "sweetalert2/dist/sweetalert2.js";

const ShopingCart = () => {
  const money = new Intl.NumberFormat("TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
  });
  const navigation = useNavigate();
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    chkUser();
  }, []);

  function chkUser() {
    let item = JSON.parse(localStorage.getItem("userLogin"));
    if (!item)
      Swal.fire({
        title: "ไม่พบผู้ใช้!",
        text: "เข้าสู่ระบบ!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) navigation("/login");
        else navigation("/",{replace:true});
      });
    else getItemCart();
  }
  function getItemCart() {
    let user = JSON.parse(localStorage.getItem("userLogin"));
    let item = JSON.parse(localStorage.getItem("cartList" + user.id));
    if (item) setCartList(item);
    return item;
  }

  async function plusItem(pdid, amount) {
    let user = JSON.parse(localStorage.getItem("userLogin"));
    let item = getItemCart();
    let chk = await ChkStock(pdid, amount + 1);
    if (chk.msg == "have") {
      item.map((res) => {
        if (res.pdid == pdid) res.amount += 1;
      });
      localStorage.setItem("cartList" + user.id, JSON.stringify(item));
      getItemCart();
    }
  }
  function removeItem(pdid) {
    let user = JSON.parse(localStorage.getItem("userLogin"));
    let item = getItemCart();
    item.map((res) => {
      if (res.pdid == pdid && res.amount > 1) res.amount -= 1;
    });
    localStorage.setItem("cartList" + user.id, JSON.stringify(item));
    getItemCart();
  }
  function deleteItem(pdid) {
    let user = JSON.parse(localStorage.getItem("userLogin"));
    let item = getItemCart();
    let newCart = [];
    item.map((res) => {
      if (res.pdid != pdid) newCart.push(res);
    });
    localStorage.setItem("cartList" + user.id, JSON.stringify(newCart));
    getItemCart();
  }
  function onCheckout(){
    if(cartList.length > 0) navigation('/CheckoutShoping')
  }
  const buildItemCart = () =>
    cartList.map((res, i) => (
      <tr key={i}>
        <td className="product__cart__item">
          <div className="product__cart__item__pic">
            <Link to={"/productdetail/" + res.pdid}>
              <img src={res.img} alt="" width="100" />
            </Link>
          </div>
          <div className="product__cart__item__text">
            <h6>{res.name}</h6>
            <h5>{money.format(res.price)} บาท</h5>
          </div>
        </td>
        <td>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              onClick={() => removeItem(res.pdid)}
              type="button"
              className="btn btn-warning"
            >
              -
            </button>
            <button type="button" className="btn btn-warning">
              {res.amount}
            </button>
            <button
              onClick={() => plusItem(res.pdid, res.amount)}
              type="button"
              className="btn btn-warning"
            >
              +
            </button>
          </div>
        </td>
        <td className="cart__price">
          {money.format(res.price * res.amount)} บาท
        </td>
        <td className="cart__close">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => deleteItem(res.pdid)}
          >
            <i className="fa-solid fa-xmark"></i>
          </span>
        </td>
      </tr>
    ));

  const buildTotal = () => {
    return (
      <div className="cart__total">
        <h6>สินค้ารวม</h6>
        <ul>
          {cartList.map((res, i) => (
            <li
              key={i}
              style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
            >
              {res.name} <span>{money.format(res.price * res.amount)}</span>
            </li>
          ))}
          <li>
            ราคารวม{" "}
            <span>
              {money.format(
                cartList.reduce((total, a) => total + a.price * a.amount, 0)
              )}
            </span>
          </li>
        </ul>
        <a type="button" onClick={() => onCheckout()}className="primary-btn">
          ยืนยันการสั่งซื้อ
        </a>
      </div>
    );
  };
  if (!cartList) return <div />;
  return (
    <>
      <HeaderPage title="ตะกร้า" tailing="ตะกร้า" />

      <section className="shopping-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="shopping__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th>สินค้า</th>
                      <th>จำนวน</th>
                      <th>ราคารวม</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>{buildItemCart()}</tbody>
                </table>
                {cartList.length>0?null:<img src="https://thedecman.com/images/web/empty-cart.png" width="600"/>}
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="continue__btn">
                    <Link to="/productpage">เลือกซื้อสินค้าเพิ่มเติม</Link>
                  </div>
                </div> 
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cart__discount">
                <form action="#">
                  <input type="text" placeholder="คูปองส่วนลด" />
                  <button type="submit">ใช้งาน</button>
                </form>
              </div>
              {buildTotal()}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ShopingCart;
