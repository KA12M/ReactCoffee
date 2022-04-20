import React, { useState, useEffect } from "react";
import Footer from "../../../components/footer";
import { GetOrders } from "../../../services/Order.Service";
import { BASE_URL } from "../../../helper/Axios";
import { DateFormat } from "../../../helper/dateFormat";
import { Link } from "react-router-dom";

function MainOrder() {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    GetOrders().then((res) => {
      console.log("fetchOrders()", res);
      setOrderData(res);
    });
  }

  function buildCard(status) {
    return orderData.map((e, index) => {
      if (e.status === status)
        return (
          <div className="col-md-3 col-sm-12 p-2" key={index}>
            <div className="card shadow-sm p-2 mb-5 bg-white rounded">
              <div className="card-content">
                <Link to="/admin/detailOrder" state={{ id: e.id }}>
                  <img
                    className="card-img-top img-fluid"
                    src={
                      e.orderDetail[0].product.productDetail.length == 0
                        ? "https://www.powerstore.co.th/image/no-image2.jpg"
                        : `${BASE_URL}${e.orderDetail[0].product.productDetail[0].img}`
                    }
                  />
                </Link>
                <div className="card-body">
                  <h4 className="card-title">
                    สถานะ: <span className="badge bg-warning">{e.status}</span>
                  </h4>

                  <div className="card-text">
                    <div>
                      เลข: <span className="text-warning">{e.id}</span>
                    </div>
                    <div>
                      ยอดรวม: <span className="text-warning">{e.total}</span>{" "}
                      บาท
                    </div>
                  </div>
                  <small className="text-muted">{DateFormat(e.date)}</small>
                </div>
              </div>
            </div>
          </div>
        );
    });
  }

  return (
    <div id="main">
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
              <h3>คำสั่งซื้อ</h3>
              <p className="text-subtitle text-muted">คำสั่งซื้อในระบบ</p>
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
                    ตารางคำสั่งซื้อในระบบ
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">คำสั่งซื้อในระบบ</h4>
            </div>
            <div className="card-content">
              <div className="card-body">
                <div
                  className="list-group list-group-horizontal-sm mb-1 text-center"
                  role="tablist"
                >
                  <a
                    className="list-group-item list-group-item-action active"
                    id="list-sunday-list"
                    data-bs-toggle="list"
                    href="#list-sunday"
                    role="tab"
                  >
                    รอการชำระเงิน
                  </a>
                  <a
                    className="list-group-item list-group-item-action"
                    id="list-monday-list"
                    data-bs-toggle="list"
                    href="#list-monday"
                    role="tab"
                  >
                    การขนส่ง
                  </a>
                  <a
                    className="list-group-item list-group-item-action"
                    id="list-tuesday-list"
                    data-bs-toggle="list"
                    href="#list-tuesday"
                    role="tab"
                  >
                    สำเร็จ
                  </a>
                  <a
                    className="list-group-item list-group-item-action"
                    id="list-tuesday-list"
                    data-bs-toggle="list"
                    href="#list-gg"
                    role="tab"
                  >
                    ยกเลิก
                  </a>
                </div>
                <div className="tab-content text-justify">
                  <div
                    className="tab-pane fade show active"
                    id="list-sunday"
                    role="tabpanel"
                    aria-labelledby="list-sunday-list"
                  >
                    <div className="card-group">{buildCard("ที่ต้องชำระ")}</div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="list-monday"
                    role="tabpanel"
                    aria-labelledby="list-monday-list"
                  >
                    <div className="card-group">{buildCard("การจัดส่ง")}</div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="list-tuesday"
                    role="tabpanel"
                    aria-labelledby="list-tuesday-list"
                  >
                    <div className="card-group">{buildCard("สำเร็จ")}</div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="list-gg"
                    role="tabpanel"
                    aria-labelledby="list-tuesday-list"
                  >
                    <div className="card-group">{buildCard("ยกเลิกแล้ว")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
 
    </div>
  );
}

export default MainOrder;
