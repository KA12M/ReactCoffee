import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import HeaderPage from "../../../components/header";
import Footer from "../../../components/footer.public";
import Swal from "sweetalert2/dist/sweetalert2.js";

const FavoritePage = () => {
  let navigation = useNavigate();
  const [data, setData] = useState([]);
  const [id, setId] = useState();

  useEffect(() => {
    let jsonUser = localStorage.getItem("userLogin");
    if (jsonUser) getData(JSON.parse(jsonUser).id);
    else navigation("/login", { replace: true });
  }, []);

  function getData(id) {
    let list = JSON.parse(localStorage.getItem("listLike" + id));
    if (list) setData(list);
    setId(id);
  }
  function removeItem(pdid) {
    let newList = [];
    let list = JSON.parse(localStorage.getItem("listLike" + id));
    if (list)
      list.map((result) => {
        if (result.pdid != pdid) newList.push(result);
      });
    localStorage.setItem("listLike" + id, JSON.stringify(newList));
    getData(id);
  }
  function addCart(data) {
    var user = JSON.parse(localStorage.getItem("userLogin"));
    var newCart = [];
    if (user) {
      let oldCart = JSON.parse(localStorage.getItem("cartList" + id));
      if (!oldCart || oldCart.length == 0)
        newCart.push({
          pdid: data.pdid,
          name: data.name,
          amount: 1,
          price: data.price,
          img: data.img,
        });
      else {
        oldCart.map((item) => {
          if (item.pdid == data.pdid) {
            item.amount += 1;
            newCart = oldCart;
          }
        });
        if (newCart.length == 0) {
          oldCart.push({
            pdid: data.pdid,
            name: data.name,
            amount: 1,
            price: data.price,
            img: data.img,
          });
          newCart = oldCart;
        }
      }
      localStorage.setItem("cartList" + id, JSON.stringify(newCart));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "เพิ่มสินค้าลงตะกร้าสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
      navigation("/shopingcart", { replace: true });
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  }
  const buildColumn = () => {
    return data.map((result, i) => {
      return (
        <tr key={i}>
          <td className="product__cart__item">
            <div className="product__cart__item__pic">
              <Link to={"/productdetail/" + result.pdid}>
                <img src={result.img} alt="" width="110" />
              </Link>
            </div>
            <div className="product__cart__item__text">
              <h6>{result.name}</h6>
            </div>
          </td>
          <td className="cart__price">{result.price}</td>
          <td className="cart__btn">
            <button onClick={() => addCart(result)} className="primary-btn">
              เพิ่มลงตะกร้า
            </button>
          </td>
          <td className="cart__close">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => removeItem(result.pdid)}
            >
              <i className="fa-solid fa-xmark"></i>
            </span>
          </td>
        </tr>
      );
    });
  };
  return (
    <>
      <HeaderPage title="สินค้าที่ถูกใจ" tailing="สินค้าที่ถูกใจ" />

      <section className="wishlist spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wishlist__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th>สินค้า</th>
                      <th>ราคา</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>{buildColumn()}</tbody>
                </table>
                {data.length > 0 ? null : (
                  <div className="d-flex justify-content-center">
                    <img src="https://www.tharagold.in/assets/img/no-product-found.png" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default FavoritePage;
