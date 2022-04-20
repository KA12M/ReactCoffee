import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GetOrderById, ConfirmOrder } from "../../../services/Order.Service";
import { PostTransport } from "../../../services/Transport.Service";
import { BASE_URL } from "../../../helper/Axios";
import { DateFormat } from "../../../helper/dateFormat";

export default function DetailOrder() {
  const { state } = useLocation();
  const [orderData, setOrderData] = useState({});
  const [address, setAddress] = useState({});
  const [payment, setPayment] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [transport, setTransport] = useState([]);

  const [status, setStatus] = useState("");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    fetchOrder();
  }, []);

  function fetchOrder() {
    GetOrderById(state.id).then((res) => {
      console.log(res);
      if (res.msg == "OK") {
        setOrderData(res.data);
        setAddress(res.data.address);
        setPayment(res.data.payment);
        setOrderDetail(res.data.orderDetail);
        setTransport(res.data.transportDetail);
      }
    });
  }

  function BuildAddress() {
    return (
      <div className="card shadow p-3 mb-5 bg-white rounded">
        <div className="card-content">
          <div className="card-body">
            <h4 className="card-title">ชื่อ {address.nameUser}</h4>
            <p className="card-text">
              {address.address1} ตำบล
              {address.subDistrict} อำเภอ
              {address.district} จังหวัด
              {address.province} รหัสไปรษณีย์ {address.zipcode}
            </p>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <span>+66{address.telephone}</span>
        </div>
      </div>
    );
  }

  function buildPaymentItem() {
    return payment.map((res, index) => {
      return (
        <div key={index}>
          <div className="alert alert-primary">
            {" "}
            <img src={`${BASE_URL}${res.payImg}`} width="120" />
            {DateFormat(res.date)}
          </div>
        </div>
      );
    });
  }

  function buildConfirmBTN() {
    if (orderData.status == "ที่ต้องชำระ")
      return (
        <button
          type="button"
          className="btn btn-primary rounded-pill"
          data-bs-toggle="modal"
          data-bs-backdrop="false"
          data-bs-target="#backdrop"
        >
          ยืนยันการชำระเงิน
        </button>
      );
  }

  function buildUpdateTransportBTN() {
    return (
      <button
        type="button"
        className="btn btn-success rounded-pill"
        data-bs-toggle="modal"
        data-bs-target="#inlineForm"
      >
        อัพเดตสถานะ
      </button>
    );
  }

  function buildTransportItem() {
    return [...transport].reverse().map((res, index) => {
      return (
        <div key={index}>
          <div className="alert alert-secondary ">
            {" "}
            <p>
              {res.status} {res.detail}
            </p>
            {DateFormat(res.date)}
          </div>
        </div>
      );
    });
  }

  function buildProductItem() {
    if (orderDetail.length != 0)
      return orderDetail.map((res, index) => {
        return (
          <div key={index}>
            <div className="alert alert-secondary ">
              {" "}
              <p>
                <img
                  src={BASE_URL + res.product.productDetail[0].img}
                  width="120"
                />{" "}
                {res.product.name} {res.product.price} บาท x{res.amount}
              </p>
            </div>
          </div>
        );
      });
  }

  function onSubmit() {
    if (status != "") {
      let body = new FormData();
      body.append("orderid", state.id);
      body.append("status", status);
      body.append("detail", detail);
      PostTransport(body).then((res) => {
          if(res.msg=="OK"){
            fetchOrder();
            setStatus("");
            setDetail("");
          }
      })
    }
  } 
  return (
    <div id="main">
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
              <h3>คำสั่งซื้อ</h3>
              <p className="text-subtitle text-muted">รายละเอียดคำสั่งซื้อ</p>
            </div>
            <div className="col-12 col-md-6 order-md-2 order-first">
              <nav
                aria-label="breadcrumb"
                className="breadcrumb-header float-start float-lg-end"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">หน้าหลัก</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    รายละเอียดคำสั่งซื้อ
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    เลขคำสั่งซื้อ: {orderData.id}{" "}
                    <span
                      className={
                        "badge bg-" +
                        (orderData.status === "ยกเลิกแล้ว"
                          ? "danger"
                          : orderData.status === "สำเร็จ"
                          ? "success"
                          : "warning")
                      }
                    >
                      {orderData.status}
                    </span>
                  </h5>
                </div>
                <div className="card-body">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link active"
                        id="home-tab"
                        data-bs-toggle="tab"
                        href="#home"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        รายละเอียด
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link"
                        id="profile-tab"
                        data-bs-toggle="tab"
                        href="#profile"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        สินค้า
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link"
                        id="contact-tab"
                        data-bs-toggle="tab"
                        href="#contact"
                        role="tab"
                        aria-controls="contact"
                        aria-selected="false"
                      >
                        การชำระเงิน
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <div className="my-2">
                        <p>เลขคำสั่งซื้อ: {orderData.id}</p>
                        <p>สถานะ: {orderData.status}</p>
                        <p>ยอดชำระเงิน: {orderData.total} บาท</p>
                        {orderData.date != null
                          ? DateFormat(orderData.date)
                          : ""}
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      <div className="my-2">
                        {buildProductItem()}
                        ราคารวม {orderData.total} บาท
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="contact"
                      role="tabpanel"
                      aria-labelledby="contact-tab"
                    >
                      <div className="card-body">
                        <div className="my-2">
                          {buildPaymentItem()}
                          {buildConfirmBTN()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">รายละเอียดการจัดส่ง</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-3">
                      <div
                        className="nav flex-column nav-pills"
                        id="v-pills-tab"
                        role="tablist"
                        aria-orientation="vertical"
                      >
                        <a
                          className="nav-link active"
                          id="v-pills-home-tab"
                          data-bs-toggle="pill"
                          href="#v-pills-home"
                          role="tab"
                          aria-controls="v-pills-home"
                          aria-selected="true"
                        >
                          ที่อยู่ในการจัดส่ง
                        </a>
                        <a
                          className="nav-link"
                          id="v-pills-profile-tab"
                          data-bs-toggle="pill"
                          href="#v-pills-profile"
                          role="tab"
                          aria-controls="v-pills-profile"
                          aria-selected="false"
                        >
                          การจัดส่ง
                        </a>
                      </div>
                    </div>
                    <div className="col-9">
                      <div className="tab-content" id="v-pills-tabContent">
                        <div
                          className="tab-pane fade show active"
                          id="v-pills-home"
                          role="tabpanel"
                          aria-labelledby="v-pills-home-tab"
                        >
                          {BuildAddress()}
                        </div>
                        <div
                          className="tab-pane fade"
                          id="v-pills-profile"
                          role="tabpanel"
                          aria-labelledby="v-pills-profile-tab"
                        >
                          {buildUpdateTransportBTN()}{" "}
                          {orderData.transportCode != null ? (
                            <button type="button" className="btn btn-primary">
                              เลขพัสดุ{" "}
                              <span >
                                {orderData.transportCode}
                              </span>
                            </button>
                          ) : (
                            ""
                          )}
                          <div className="my-2">{buildTransportItem()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div
        className="modal fade text-left"
        id="backdrop"
        role="dialog"
        aria-labelledby="myModalLabel4"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel4">
                ยืนยันการชำระเงิน
              </h4>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i data-feather="x"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>เลขคำสั่งซื้อ: {state.id}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light-secondary"
                data-bs-dismiss="modal"
              >
                <i className="bx bx-x d-block d-sm-none"></i>
                <span className="d-none d-sm-block">Close</span>
              </button>
              <button
                type="button"
                className="btn btn-primary ml-1"
                data-bs-dismiss="modal"
                onClick={() =>
                  ConfirmOrder(state.id).then((res) => {
                    if (res.msg == "OK") fetchOrder();
                  })
                }
              >
                <i className="bx bx-check d-block d-sm-none"></i>
                <span className="d-none d-sm-block">Ok</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade text-left"
        id="inlineForm"
        role="dialog"
        aria-labelledby="myModalLabel33"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel33">
                อัพเดตสถานะการขนส่ง{" "}
              </h4>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i data-feather="x"></i>
              </button>
            </div>
            <form>
              <div className="modal-body">
                <label>สถานะ: </label>
                <div className="form-group">
                  <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="form-control"
                  />
                </div>
                <label>รายละเอียด: </label>
                <div className="form-group">
                  <input
                    type="text"
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light-secondary"
                  data-bs-dismiss="modal"
                >
                  <i className="bx bx-x d-block d-sm-none"></i>
                  <span className="d-none d-sm-block">Close</span>
                </button>
                <button
                  type="button"
                  className="btn btn-primary ml-1"
                  data-bs-dismiss="modal"
                  onClick={()=>onSubmit()}
                >
                  <i className="bx bx-check d-block d-sm-none"></i>
                  <span className="d-none d-sm-block">Ok</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
