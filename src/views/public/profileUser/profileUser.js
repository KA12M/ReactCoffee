import Footer from "../../../components/footer.public";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DateFormat } from "../../../helper/dateFormat";
import {
  GetAddressById,
  DeleteAddressById,
} from "../../../services/address.service";
import {
  GetOrderByUserId,
  CancelOrder,
  FinishOrder,
} from "../../../services/Order.Service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ImgUrl from "../../../components/imgUrl";

const ProfileUser = () => {
  const money = new Intl.NumberFormat("TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
  });
  const navigation = useNavigate();
  const [data, setData] = useState();
  const [address, setAddress] = useState();

  const [myOrder, setMyOrder] = useState();
  useEffect(() => {
    getUser();
  }, []);
  function getUser() {
    let local = JSON.parse(localStorage.getItem("userLogin"));
    if (local) {
      setData(local);
      GetAddressById(local.id).then((result) => {
        console.log(result.data);
        setAddress(result.data);
      });
      GetOrderByUserId(local.id).then((result) => {
        if (result.msg == "OK") setMyOrder(result.data);
      });
    } else if (!local) navigation("/login", { replace: true });
  }
  async function onCancelOrder(value) {
    Swal.fire({
      title: "ยกเลิกคำสั่งซื้อ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await CancelOrder(value).then((res) => {
          if (res.msg == "OK")
            Swal.fire({
              position: "top-end",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          getUser();
        });
      }
    });
  }
  async function onDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteAddressById(id).then((result) => {
          if (result.msg == "OK") {
            Swal.fire("Deleted!", "", "success");
            getUser();
          }
        });
      }
    });
  }
  async function onFinishOrder(id) {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        FinishOrder(id).then((result) => {
          if (result.msg == "OK") {
            Swal.fire("ยืนยันคำสั่งซื้อ!", "", "success");
            getUser();
          }
        });
      }
    });
  }

  const buildAddress = () => {
    if (address)
      return address.map((result, i) => {
        return (
          <div key={i} className="card-content">
            <div className="card-body">
              <div className="accordion" id={"cardAccordion" + i}>
                <div className="card shadow-sm">
                  <div
                    className="card-header"
                    id="headingOne"
                    data-bs-toggle={"collapse"}
                    data-bs-target={"#collapseOne" + i}
                    aria-expanded="false"
                    aria-controls={"collapseOne" + i}
                    role="button"
                  >
                    <span className="collapsed collapse-title">
                      ชื่อ: {result.nameUser}
                    </span>
                    <span
                      onClick={() => onDelete(result.id)}
                      className="btn btn-danger float-end"
                    >
                      ลบ
                    </span>
                  </div>
                  <div
                    id={"collapseOne" + i}
                    className="collapse pt-1"
                    aria-labelledby="headingOne"
                    data-parent={"#cardAccordion" + i}
                  >
                    <div className="card-body">
                      <p>{result.telephone}</p>
                      <p>
                        {result.address1} ต.{result.subDistrict} อ.
                        {result.district} จ.{result.province} {result.zipcode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
  };
  const buildMyOrder = () => {
    if (myOrder)
      return myOrder.map((result, i) => {
        return (
          <div key={i} className="card col-lg-6 col-12 shadow-sm">
            <img
              style={{ height: 120 }}
              src={ImgUrl(result.orderDetail[0].product.productDetail[0].img)}
              className="card-img-top card-img"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{result.status}</h5>
              <p className="card-text">ยอดชำระ: {money.format(result.total)}</p>
              <p className="card-text">{DateFormat(result.date)}</p>
              <Link to={"/detailorder/"+result.id} className="btn btn-primary">
                ดูรายละเอียด
              </Link>
              {result.status == "ยกเลิกแล้ว" ? null : result.status ==
                "การจัดส่ง" ? (
                <button
                  onClick={() => onFinishOrder(result.id)}
                  className="btn btn-warning"
                  type="button"
                >
                  ยืนยันการรับสินค้า
                </button>
              ) : result.status == "สำเร็จ" ? (
                <button 
                  className="btn btn-info "
                  type="button"
                >
                  รีวิว
                </button>
              ) : (
                <button
                  onClick={() => onCancelOrder(result)}
                  className="btn btn-danger "
                  type="button"
                >
                  ยกเลิก
                </button>
              )}
            </div>
          </div>
        );
      });
  };
  if (!data) return <div />;
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="card-content col-6 p-5">
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-4">
                <div className="list-group" role="tablist">
                  <a
                    className="list-group-item list-group-item-action active"
                    id="list-home-list"
                    data-bs-toggle="list"
                    href="#list-home"
                    role="tab"
                  >
                    ข้อมูลส่วนตัว
                  </a>
                  <a
                    className="list-group-item list-group-item-action"
                    id="list-profile-list"
                    data-bs-toggle="list"
                    href="#list-profile"
                    role="tab"
                  >
                    ที่อยู่
                  </a>
                  <a
                    className="list-group-item list-group-item-action"
                    id="list-messages-list"
                    data-bs-toggle="list"
                    href="#list-messages"
                    role="tab"
                  >
                    คำสั่งซื้อของฉัน
                  </a>
                  {/* <a
                    className="list-group-item list-group-item-action"
                    id="list-settings-list"
                    data-bs-toggle="list"
                    href="#list-settings"
                    role="tab"
                  >
                    Settings
                  </a> */}
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-8 mt-1">
                <div className="tab-content text-justify" id="nav-tabContent">
                  <div
                    className="tab-pane show active"
                    id="list-home"
                    role="tabpanel"
                    aria-labelledby="list-home-list"
                  >
                    <div className="blog__details__author">
                      <div className="blog__details__author__pic">
                        <img src="img/blog/details/blog-author.jpg" alt="" />
                      </div>
                      <div className="blog__details__author__text">
                        <h6>{data.name}</h6>
                        <div className="blog__details__author__social">
                          <a href="#">
                            <i className="fa-brands fa-facebook"></i>
                          </a>
                          <a href="#">
                            <i className="fa-brands fa-twitter"></i>
                          </a>
                          <a href="#">
                            <i className="fa-brands fa-instagram"></i>
                          </a>
                        </div>
                        <p>{data.email}</p>
                        <p>{DateFormat(data.dateReg)}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane"
                    id="list-profile"
                    role="tabpanel"
                    aria-labelledby="list-profile-list"
                  >
                    <div className="card collapse-icon accordion-icon-rotate shadow">
                      <div className="card-header">
                        <Link to="/FormAddress">
                          <button className="btn btn-info float-end">
                            เพิ่ม
                          </button>
                        </Link>
                        <h1 className="card-title pl-1">ที่อยู่</h1>
                      </div>
                      {buildAddress()}
                    </div>
                  </div>
                  <div
                    className="tab-pane"
                    id="list-messages"
                    role="tabpanel"
                    aria-labelledby="list-messages-list"
                  >
                    <div className="row">{buildMyOrder()}</div>
                  </div>
                  <div
                    className="tab-pane"
                    id="list-settings"
                    role="tabpanel"
                    aria-labelledby="list-settings-list"
                  >
                    Irure enim occaecat labore sit qui aliquip reprehenderit
                    amet velit. Deserunt ullamco ex elit nostrud ut dolore nisi
                    officia magna sit occaecat laboris sunt dolor. Nisi eu minim
                    cillum occaecat aute est cupidatat aliqua labore aute
                    occaecat ea aliquip sunt amet. Aute mollit dolor ut
                    exercitation irure commodo non amet consectetur quis amet
                    culpa. Quis ullamco nisi amet qui aute irure eu. Magna
                    labore dolor quis ex labore id nostrud deserunt dolor
                    eiusmod eu pariatur culpa mollit in irure
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProfileUser;
