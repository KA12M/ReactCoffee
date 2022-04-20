import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GetProductById,
  DeleteProductDetail,
} from "../../../services/Product.Service";
import { useNavigate } from "react-router-dom";
import ImgUrl from "../../../components/imgUrl";
import { AiFillEdit } from "react-icons/ai";
import { Formik, Field } from "formik";
import { PostManageStock } from "../../../services/ManageStock.Service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "./style.css";
import { DateFormat } from "../../../helper/dateFormat";

const ProductDetail = () => {
  var money = new Intl.NumberFormat("th-TH");
  const navigation = useNavigate();
  const [product, setProduct] = useState();
  const { pdid } = useParams();

  useEffect(() => {
    console.log(pdid);
    if (pdid) fetchProduct(pdid);
  }, []);
  async function fetchProduct(id) {
    await GetProductById(id).then((result) => {
      console.log("fetchProduct()", result);
      if (result.data.length > 0) setProduct(result.data[0]);
    });
  }
  async function delImg(id) {
    Swal.fire({
      title: "ลบ!",
      text: "ลบรูปภาพที่เลือก?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await DeleteProductDetail(id).then((res) => {
          if (res.msg == "OK") {
            Swal.fire("Deleted!", "สำเร็จ", "success");
            fetchProduct(pdid);
          }
        });
      }
    });
  }
  function countStar(star) {
    var rows = [];
    for (var i = 0; i < star; i++)
      rows.push(<i key={i} className="fa-solid fa-star"></i>);
    return rows;
  }
  const buildImgLogo = () => {
    let isActive = 0;
    if (product)
      if (product.productDetail.length > 0)
        return (
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <ol className="carousel-indicators">
              {product.productDetail.map((res, i) => {
                return (
                  <li
                    key={i}
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to={i}
                    className={isActive == i ? "active" : ""}
                    onClick={() => (isActive = i)}
                  ></li>
                );
              })}
            </ol>
            <div className="carousel-inner">
              {product.productDetail.map((res, i) => {
                return (
                  <div
                    key={i}
                    className={
                      "carousel-item " + (isActive == i ? "active" : "")
                    }
                  >
                    <img
                      src={ImgUrl(res.img)}
                      className="d-block w-100"
                      style={{ objectFit: "cover", height: "240px" }}
                    />
                  </div>
                );
              })}
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleCaptions"
              role="button"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleCaptions"
              role="button"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </a>
          </div>
        );
      else
        return (
          <img src="https://www.thaicreate.com/upload/stock/20160507185832.jpg?v=1001" />
        );
  };
  const buildImgShow = () => {
    if (product)
      if (product.productDetail.length > 0)
        return product.productDetail.map((res, i) => {
          return (
            <div
              key={i}
              className="card col-md-3 shadow-sm p-3 mb-5 bg-white rounded"
            >
              <div className="card-content">
                <span
                  className="top-right"
                  style={{ cursor: "pointer" }}
                  onClick={() => delImg(res.id)}
                >
                  <i className="fa-solid fa-xmark d-flex justify-content-center"></i>
                </span>{" "}
                <img
                  className="rounded"
                  src={ImgUrl(res.img)}
                  style={{
                    objectFit: "cover",
                    width: "360px",
                    height: "240px",
                  }}
                />
              </div>
            </div>
          );
        });
  };
  if (!product)
    return (
      <div className="d-flex justify-content-center" id="main">
        <button className="btn btn-primary" type="button" disabled>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </button>
      </div>
    );
  return (
    <div id="main">
      <header className="mb-3">
        <a href="#" className="burger-btn d-block d-xl-none">
          <i className="bi bi-justify fs-3"></i>
        </a>
      </header>

      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
              <h3>รายละเอียดสินค้า</h3>
              <p className="text-subtitle text-muted">
                รหัสสินค้า: {product.id}
              </p>
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
                    {product.name}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <section className="section">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                {product.name}
                {"  "}
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => navigation("/admin/formProduct/" + pdid)}
                >
                  <AiFillEdit /> แก้ไข
                </button>
              </h4>
            </div>
            <div className="card-body row">
              <div className="col-12 row">
                <div className="col-md-2">{buildImgLogo()}</div>
                <div className="col">
                  <p>ประเภท: {product.type.typeName}</p>
                  {product.typeId == 1 ? (
                    <>
                      <p>เมล็ดพันธุ์: {product.typeSeed}</p>
                      <p>ระดับการคั่ว: {product.levelCoffee}</p>
                    </>
                  ) : null}
                  <p>ราคา: {money.format(product.price)} บาท</p>
                  <p>รายละเอียดสินค้า: {product.detail}</p>
                </div>
                <div className="col-md-4 ">
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className={
                        "btn btn-" + (product.stock == 0 ? "danger" : "primary")
                      }
                    >
                      จำนวนสินค้าในคลัง{" "}
                      <span className="badge bg-transparent">
                        {product.stock}
                      </span>
                    </button>
                    <button type="button" className="btn btn-success">
                      ขายแล้ว{" "}
                      <span className="badge bg-transparent">
                        {product.stockSell}
                      </span>
                    </button>
                  </div>
                  <div className="d-flex justify-content-end mt-3">
                    <button
                      className="btn btn-success rounded-pill"
                      data-bs-toggle="modal"
                      data-bs-target="#manageStockForm"
                    >
                      อัพเดตสินค้า
                    </button>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">เพิ่มเติม</h4>
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
                          รีวิว{" "}
                          {product
                            ? product.review.length > 0
                              ? product.review.length
                              : 0
                            : 0}
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
                          รูปภาพ{" "}
                          {product
                            ? product.productDetail.length > 0
                              ? product.productDetail.length
                              : 0
                            : 0}
                        </a>
                        <a
                          className="nav-link"
                          id="v-pills-messages-tab"
                          data-bs-toggle="pill"
                          href="#v-pills-messages"
                          role="tab"
                          aria-controls="v-pills-messages"
                          aria-selected="false"
                        >
                          ประวัติการจัดการคลัง{" "}
                          {product
                            ? product.manageStock.length > 0
                              ? product.manageStock.length
                              : 0
                            : 0}
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
                          <div className="row shadow-sm">
                            {product.review.map((res, index) => {
                              return (
                                <div className="col-md-6 p-2" key={index}>
                                  <div className="testimonial__item">
                                    <div className="testimonial__author">
                                      <div className="testimonial__author__pic">
                                        <img
                                          src="assets/images/faces/5.jpg"
                                          alt=""
                                        />
                                      </div>
                                      <div className="testimonial__author__text">
                                        <h5>
                                          {res.user.name}{" "}
                                          <span>{DateFormat(res.date)}</span>
                                        </h5>
                                        <span>
                                          {res.comments == null
                                            ? ""
                                            : `ความคิดเห็น: ${res.comments}`}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="rating">
                                      <span>{countStar(res.star)}</span>
                                    </div>
                                    {res.reviewDetail.map((res, i) => {
                                      return (
                                        <img
                                          key={i}
                                          src={ImgUrl(res.img)}
                                          style={{"cursor":"pointer"}}
                                          width="120"
                                          height="120"
                                          onClick={() =>
                                            Swal.fire({
                                              imageUrl: ImgUrl(res.img),
                                            })
                                          }
                                        />
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="v-pills-profile"
                          role="tabpanel"
                          aria-labelledby="v-pills-profile-tab"
                        >
                          <div className="row">{buildImgShow()}</div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="v-pills-messages"
                          role="tabpanel"
                          aria-labelledby="v-pills-messages-tab"
                        >
                          <div className="row">
                            {product.manageStock.length == 0
                              ? ""
                              : [...product.manageStock]
                                  .reverse()
                                  .map((res) => {
                                    return (
                                      <div key={res.id} className="col-md-6">
                                        <div
                                          className={
                                            "alert alert-" +
                                            (res.typeManage == "1"
                                              ? "success"
                                              : res.typeManage == "2"
                                              ? "warning"
                                              : res.typeManage == "3"
                                              ? "info"
                                              : "danger")
                                          }
                                        >
                                          <h4 className="alert-heading">
                                            {res.typeManage == "1"
                                              ? "คำสั่งซื้อสำเร็จ"
                                              : res.typeManage == "2"
                                              ? "เพิ่มสินค้าโดยแอดมิน"
                                              : res.typeManage == "3"
                                              ? "นำสินค้าออกโดยแอดมิน"
                                              : "คำสั่งซื้อถูกยกเลิก"}{" "}
                                            <span>
                                              {res.detail
                                                ? `( ${res.detail} )`
                                                : ""}
                                            </span>
                                          </h4>
                                          <p>
                                            {res.typeManage == 1 ||
                                            res.typeManage == 3
                                              ? "นำจำนวนสินค้าในคลังออก"
                                              : "เพิ่มจำนวนสินค้าในคลัง"}{" "}
                                            <span
                                              className={
                                                "badge bg-white text-" +
                                                (res.typeManage == 1
                                                  ? "success"
                                                  : "danger")
                                              }
                                            >
                                              {res.stock}
                                            </span>{" "}
                                            {"  "}
                                            {DateFormat(res.date)}
                                          </p>
                                        </div>
                                      </div>
                                    );
                                  })}
                          </div>
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

      {/* modal form manageStock */}
      <div
        className="modal fade text-left"
        id="manageStockForm"
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
                อัพเดตสินค้าในระบบ เลขสินค้า: {product.id}
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
            <Formik
              enableReinitialize={true}
              initialValues={{
                typeManage: "2",
                stock: "",
                detail: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.stock) errors.stock = "กรุณากรอกข้อมูล";
                return errors;
              }}
              onSubmit={async (values) => {
                await PostManageStock(pdid, values).then((res) => {
                  if (res.msg == "OK") {
                    Swal.fire("Deleted!", "สำเร็จ", "success");
                    fetchProduct(pdid);
                    values.stock = "";
                    values.detail = "";
                  } else Swal.fire("error!", res.msg, "warning");
                });
              }}
            >
              {({ values, errors, touched, handleSubmit, handleChange }) => (
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="input-group">
                      <Field
                        as="select"
                        name="typeManage"
                        className="form-select mb-2"
                        onChange={handleChange}
                      >
                        <option value="2">เพิ่มสินค้า</option>
                        <option value="3">นำสินค้าออก</option>
                      </Field>
                    </div>
                    <label>จำนวน: </label>
                    <div className="form-group">
                      <input
                        type="number"
                        className={
                          "form-control " + (errors.stock ? "is-invalid" : "")
                        }
                        onChange={handleChange}
                        name="stock"
                        value={values.stock}
                      />
                      <div className="invalid-feedback">
                        <i className="bx bx-radio-circle"></i>
                        {errors.stock && touched.stock ? errors.stock : null}
                      </div>
                    </div>
                    <label>รายละเอียด: </label>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        onChange={handleChange}
                        name="detail"
                        value={values.detail}
                      ></textarea>
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
                    <button type="submit" className="btn btn-primary ml-1">
                      <i className="bx bx-check d-block d-sm-none"></i>
                      <span className="d-none d-sm-block">OK</span>
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
