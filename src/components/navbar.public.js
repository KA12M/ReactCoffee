import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import $ from "jquery";
import "../style/navbar.public.css";

const NavbarPublic = () => {
  $(".canvas__open").on("click", function () {
    $(".offcanvas-menu-wrapper").addClass("active");
    $(".offcanvas-menu-overlay").addClass("active");
  });

  $(".offcanvas-menu-overlay").on("click", function () {
    $(".offcanvas-menu-wrapper").removeClass("active");
    $(".offcanvas-menu-overlay").removeClass("active");
  });

  const money = new Intl.NumberFormat("TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
  });
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [cartList, setCartList] = useState();

  useEffect(() => {
    let _data = localStorage.getItem("userLogin");
    if (_data) setUserData(JSON.parse(_data));
    chkUser();
  }, []);
  function chkUser() {
    let item = JSON.parse(localStorage.getItem("userLogin"));
    if (item) getItemCart();
  }
  function getItemCart() {
    let user = JSON.parse(localStorage.getItem("userLogin"));
    let item = JSON.parse(localStorage.getItem("cartList" + user.id));
    if (item) setCartList(item);
    return item;
  }
  const logout = () =>
    Swal.fire({
      title: "ออกจากระบบ!",
      text: "ต้องการออกจากระบบหรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D63030",
      cancelButtonColor: "#1D3ED3",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userLogin");
        setUserData();
        Swal.fire("สำเร็จ!", "ออกจากระบบเรียบร้อย.", "success");
        navigate("/login");
      }
    });

  const buildLogin = () => {
    if (!userData)
      return (
        <li>
          <Link to="/login">เข้าสู่ระบบ</Link>
        </li>
      );
    else
      return (
        <>
          <li onClick={() => navigate("/ProfileUser")}>
            <i className="fa-solid fa-user"></i> {userData.name}
          </li>
          {userData.status != "admin" ? (
            ""
          ) : (
            <li>
              <div onClick={() => navigate("/admin")}>ผู้ดูแลระบบ</div>
            </li>
          )}
          <li>
            <div onClick={() => logout()}>ออกจากระบบ</div>
          </li>
        </>
      );
  };
  const buildCart = () => {
    if (!cartList)
      return (
        <div className="header__top__right__cart">
          <Link to="/FavoritePage">
            <img src="img/icon/heart.png" alt="" />
          </Link>
          <Link to="/ShopingCart">
            <img src="img/icon/cart.png" alt="" /> <span></span>
          </Link>
          <div className="cart__price"></div>
        </div>
      );
    return (
      <div className="header__top__right__cart">
        <Link to="/FavoritePage">
          <img src="img/icon/heart.png" alt="" />
        </Link>
        <Link to="/ShopingCart">
          <img src="img/icon/cart.png" alt="" /> <span>{cartList.length}</span>
        </Link>
        <div className="cart__price">
          ตะกร้า:{" "}
          <span>
            {money.format(
              cartList.reduce((total, a) => total + a.price * a.amount, 0)
            )}{" "}
            บาท{" "}
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="offcanvas-menu-overlay "></div>
      <div className="offcanvas-menu-wrapper ">
        <div className="offcanvas__cart">
          <div className="offcanvas__cart__links">
            <Link to="/FavoritePage">
              <img src="img/icon/heart.png" alt="" />
            </Link>
          </div>
          <div className="offcanvas__cart__item">
            <Link to="/ShopingCart">
              <img src="img/icon/cart.png" alt="" />
              <span>{cartList ? cartList.length : 0}</span>
            </Link>
            <div className="cart__price">
              ตะกร้า:{" "}
              <span>
                {cartList
                  ? money.format(
                      cartList.reduce(
                        (total, a) => total + a.price * a.amount,
                        0
                      )
                    )
                  : null}
                บาท
              </span>
            </div>
          </div>
        </div>
        <div className="offcanvas__logo">
          <a href="/">
            <img src="img/logo.png" alt="" />
          </a>
        </div>
        <div className="row">
          <ul className="list-group">
            <Link to="/">
              <li className="list-group-item">หน้าแรก</li>
            </Link>
            <Link to="/productpage">
              <li className="list-group-item">สินค้า</li>{" "}
            </Link>
          </ul>
          <li className="mt-4">ระบบสมาชิก</li>
          <ul className="list-group">
            {!userData ? (
              <li className="list-group-item">
                <Link to="/login">
                  <i className="fa-solid fa-right-to-bracket"></i> เข้าสู่ระบบ
                </Link>
              </li>
            ) : (
              <>
                <li onClick={() => navigate("/ProfileUser")} className="list-group-item">
                  <i className="fa-solid fa-user"></i> {userData.name}
                </li>
                {userData.status != "admin" ? (
                  ""
                ) : (
                  <li className="list-group-item">
                    <div onClick={() => navigate("/admin")}>
                      <i className="fa-solid fa-lock"></i> ผู้ดูแลระบบ
                    </div>
                  </li>
                )}
                <li className="list-group-item">
                  <div onClick={() => logout()}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                    ออกจากระบบ
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <header className="header">
        <div className="header__top">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="header__top__inner">
                  <div className="header__top__left">
                    <a href="./index.html">
                      <img src="img/logo.png" alt="" />
                    </a>
                  </div>
                  <div className="header__logo">{buildCart()}</div>
                  <div className="header__top__right">
                    <div className="header__top__left">
                      <ul>{buildLogin()}</ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="canvas__open">
              <i className="fa fa-bars"></i>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li className="">
                    <Link to="/">หน้าแรก</Link>
                  </li>
                  <li>
                    <Link to="/productpage">สินค้า</Link>
                  </li>
                  <li>
                    <a href="#">Pages</a>
                    <ul className="dropdown">
                      <li>
                        <a href="./shop-details.html">Shop Details</a>
                      </li>
                      <li>
                        <a href="./shoping-cart.html">Shoping Cart</a>
                      </li>
                      <li>
                        <a href="./checkout.html">Check Out</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavbarPublic;
