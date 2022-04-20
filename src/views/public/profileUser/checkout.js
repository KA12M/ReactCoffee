import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAddressById } from "../../../services/address.service";
import Header from "../../../components/header";
import Footer from "../../../components/footer.public";
import { Field, Formik } from "formik";
import { PostOrder } from "../../../services/Order.Service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "./style.css"

const CheckoutShopping = () => {
  const money = new Intl.NumberFormat("TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
  });
  let navigation = useNavigate();
  const [user, setUser] = useState();
  const [address, setAddress] = useState();
  const [cartList, setCartList] = useState();

  const [payImg, setPayImg] = useState();
  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    let _user = JSON.parse(localStorage.getItem("userLogin"));
    if (!_user) navigation("/login", { replace: true });
    else if (_user) {
      setUser(_user);
      await GetAddressById(_user.id).then((response) => {
        if (response.data.length > 0) {
          setAddress(response.data);
          let _cart = JSON.parse(localStorage.getItem("cartList"+_user.id));
          setCartList(_cart);
        } else navigation("/profileuser", { replace: true });
      });
    }
  }
  async function onPostOrder(v) {
    await PostOrder(v, payImg, cartList).then((response) => {
      if (response.msg == "OK") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigation("/", { replace: true });
      }
    });
  }
  function handleImg(e) {
    if (e.target.files[0]) setPayImg(e.target.files[0]);
  }
  const calCartList = () => {
    let total = 0;
    if (cartList) total = cartList.reduce((a, b) => a + b.amount * b.price, 0);
    return total;
  };
  if (!user && !address && !cartList) return <div />;
  return (
    <>
      <Header
        title="ยืนยันคำสั่งซื้อ"
        linkList={[{ title: "ตะกร้า", to: "/ShopingCart" }]}
        tailing="ยืนยันคำสั่งซื้อ"
      />

      <Formik
        enableReinitialize={true}
        initialValues={{ addressId: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.addressId)
            errors.addressId = "กรุณาเลือกที่อยู่ในกาจัดส่ง";
          return errors;
        }}
        onSubmit={(values) => {
          values.userId = user.id;
          values.total = calCartList();
          values.addressId = parseInt(values.addressId);
          if (payImg) onPostOrder(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <section className="checkout spad">
            <div className="container">
              <div className="checkout__form">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-8 col-md-6">
                      <h6 className="coupon__code">
                        <i className="fa-solid fa-triangle-exclamation"></i>{" "}
                        กรุณาเช็คสินค้าและที่อยู่ในการจัดส่งของคุณให้เรียบร้อย
                        พร้อมแนบใบเสร็จการชำระเงิน
                      </h6>
                      {!address
                        ? null
                        : address.map((info, i) => {
                            console.log(info);
                            return (
                              <div key={i} className="form-check">
                                <Field
                                  className="form-check-input"
                                  type="radio"
                                  name="addressId"
                                  value={info.id.toString()}
                                />
                                <label className="form-check-label">
                                  {info.nameUser}
                                  <p>
                                    <span>{info.address1} </span>
                                    <span>ต.{info.subDistrict} </span>
                                    <span>อ.{info.district} </span>
                                    <span>จ.{info.province} </span>
                                    <span>รหัสไปรษณีย์ {info.zipcode} </span>
                                  </p>
                                  <p>+66{info.telephone}</p>
                                </label>
                                <div
                                  className={
                                    (errors.addressId ? "is" : "in") +
                                    "valid-feedback text-danger"
                                  }
                                >
                                  <i className="bx bx-radio-circle"></i>
                                  {errors.addressId && touched.addressId
                                    ? errors.addressId
                                    : null}
                                </div>
                              </div>
                            );
                          })}
                      <div className="mb-3">
                        <label className="form-label">
                          แนบใบเสร็จการชำระเงิน
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          onChange={(e) => handleImg(e)}
                        />
                      </div>
                      {!payImg ? null : (
                        <img className="paymentImg" src={URL.createObjectURL(payImg)} />
                      )}
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="checkout__order">
                        <h6 className="order__title">สินค้าของฉัน</h6>
                        <div className="checkout__order__products">
                          สินค้า <span>รวม</span>
                        </div>
                        <ul className="checkout__total__products">
                          {!cartList
                            ? null
                            : cartList.map((info, i) => {
                                return (
                                  <li key={i}>
                                    {info.name}
                                    <span>
                                      {money.format(info.price * info.amount)}
                                    </span>
                                  </li>
                                );
                              })}
                        </ul>
                        <ul className="checkout__total__all">
                          <li>
                            {!cartList ? null : (
                              <>
                                ยอดรวม{" "}
                                <span>{money.format(calCartList())}</span>
                              </>
                            )}
                          </li>
                        </ul>
                        <button type="submit" className="site-btn">
                          ยืนยันคำสั่งซื้อ
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        )}
      </Formik>

      <Footer />
    </>
  );
};

export default CheckoutShopping;
