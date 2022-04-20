import React, { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import { GetTypeProducts } from "../../../services/typeProduct";
import {
  PostProduct,
  GetProductById,
  PutProduct,
  DeleteProductDetail,
} from "../../../services/Product.Service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useNavigate, useParams } from "react-router-dom";
import ImgUrl from "../../../components/imgUrl"; 
import "./style.css";

function FormProduct() {
  const { pdid } = useParams();
  const navigation = useNavigate();
  const [dataProduct, setDataProduct] = useState();
  const [fileUploads, setFileUploads] = useState();
  const [typeProducts, setTypeProducts] = useState([]);
  const [id, setId] = useState();

  useEffect(() => {
    console.log(pdid);
    if (pdid) fetchProduct(pdid);
    fetchTypeProduct();
  }, []);

  async function fetchProduct(pdid) {
    await GetProductById(pdid).then((result) => {
      console.log("fetchProduct()", result);
      if (result.data.length > 0) {
        setDataProduct(result.data[0]);
        setId(pdid);
      }
    });
  }
  async function fetchTypeProduct() {
    await GetTypeProducts().then((result) => {
      if (result) setTypeProducts(result);
    });
  }
  async function onSubmitProduct(values) {
    var response;
    if (id) {
      values.id = dataProduct.id;
      values.stock = dataProduct.stock;
      values.stockSell = dataProduct.stockSell;
      values.isused = dataProduct.isused;
      response = await PutProduct(values, fileUploads);
    } else response = await PostProduct(values, fileUploads);
    if (response.msg == "OK") {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "บันทึกข้อมูลสินค้าสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
      navigation(-1);
    }
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
  const uploadImgs = (e) => {
    let newUpload = e.currentTarget.files;
    console.log(newUpload);
    if (newUpload.length != 0) setFileUploads(newUpload);
  };

  const buildTitlePage = () => {
    return (
      <div className="page-title">
        <div className="row">
          <div className="col-12 col-md-6 order-md-1 order-last">
            <h3>สินค้า</h3>
            <p className="text-subtitle text-muted">
              แบบบันทึกข้อมูลสินค้าในระบบ
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
                  แบบบันทึกข้อมูลสินค้า
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    );
  };
  const buildPreviewImg = () => {
    if (fileUploads)
      return Array.from(fileUploads).map((res, i) => {
        return (
          <div
            key={i}
            className="card col-md-4 shadow-sm p-3 mb-5 bg-white rounded"
          >
            <div className="card-content">
              <img
                className="rounded"
                src={URL.createObjectURL(res)}
                style={{
                  objectFit: "cover",
                  width: "200px",
                  height: "200px",
                }}
              />
            </div>
          </div>
        );
      });
  };

  const buildOldImg = () => {
    if (dataProduct)
      if (dataProduct.productDetail.length > 0)
        return dataProduct.productDetail.map((res, i) => {
          return (
            <div
              key={i}
              className="card col-md-4 shadow-sm p-3 mb-5 bg-white rounded"
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
                    width: "200px",
                    height: "200px",
                  }}
                />
              </div>
            </div>
          );
        });
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        typeId: id ? dataProduct.typeId : "",
        name: id ? dataProduct.name : "",
        price: id ? dataProduct.price : "",
        detail: id ? dataProduct.detail : "",
        typeSeed: id ? (dataProduct.typeSeed ? dataProduct.typeSeed : "") : "",
        levelCoffee: id
          ? dataProduct.levelCoffee
            ? dataProduct.levelCoffee
            : ""
          : "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.typeId) errors.typeId = "กรุณาเลือกประเภท";
        if (!values.name) errors.name = "กรุณากรอกข้อมูล";
        if (!values.price) errors.price = "กรุณากรอกข้อมูล";
        if (!values.detail) errors.detail = "กรุณากรอกข้อมูล";
        if (values.typeId == 1) {
          if (!values.typeSeed) errors.typeSeed = "กรุณากรอกข้อมูล";
          if (!values.levelCoffee) errors.levelCoffee = "กรุณากรอกข้อมูล";
        }
        return errors;
      }}
      onSubmit={async (values) => {
        console.log("values", values);
        console.log("img", fileUploads);
        onSubmitProduct(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        handleBlur,
        handleChange,
        setFieldValue,
      }) => (
        <div id="main">
          {buildTitlePage()}
          <section id="multiple-column-form">
            <div className="row match-height">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">แบบบันทึกข้อมูลสินค้า</h4>
                  </div>
                  <div className="card-content">
                    <div className="card-body">
                      <form className="form" onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="col-md-12 mb-1">
                              <div className="input-group mb-3">
                                <div className="input-group mb-3">
                                  <label
                                    className="input-group-text"
                                    htmlFor="inputGroupFile01"
                                  >
                                    <i className="bi bi-upload"></i>
                                  </label> 
                                  <input
                                    type="file"
                                    className="form-control "
                                    id="inputGroupFile01"
                                    multiple
                                    accept="jpeg,png,jpg"
                                    onChange={(e) => {
                                      if (e.target.files.length != 0) {
                                        e.preventDefault();
                                        uploadImgs(e);
                                      }
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            {fileUploads ? (
                              <div className="row m-2 shadow-sm p-3 mb-5 bg-white rounded">
                                <div className="card-header">
                                  <h4>รูปภาพที่จะบันทึก</h4>
                                </div>
                                {buildPreviewImg()}
                              </div>
                            ) : null}
                            {dataProduct ? (
                              dataProduct.productDetail.length > 0 ? (
                                <div className="row m-2 shadow-sm p-3 mb-5 bg-white rounded">
                                  <div className="card-header">
                                    <h4>รูปภาพเดิม</h4>
                                  </div>
                                  {buildOldImg()}
                                </div>
                              ) : null
                            ) : null}
                          </div>

                          <div className="col-md-6">
                            <div className="input-group mb-3">
                              <label
                                className="input-group-text"
                                htmlFor="inputGroupSelect01"
                              >
                                ประเภท
                              </label>
                              <Field
                                as="select"
                                name="typeId"
                                className={
                                  "form-select " +
                                  (errors.typeId ? "is-invalid" : "")
                                }
                                onChange={handleChange}
                              >
                                <option value="">เลือก..</option>
                                {typeProducts.map((info, i) => {
                                  return (
                                    <option key={i} value={info.id}>
                                      {info.typeName}
                                    </option>
                                  );
                                })}
                              </Field>
                              <div className="invalid-feedback">
                                <i className="bx bx-radio-circle"></i>
                                {errors.typeId && touched.typeId
                                  ? errors.typeId
                                  : null}
                              </div>
                            </div>

                            {values.typeId && values.typeId == 1 ? (
                              <>
                                <div className="form-group row align-items-center">
                                  <div className="col-lg-2 col-3">
                                    <label className="col-form-label">
                                      เมล็ดพันธุ์
                                    </label>
                                  </div>
                                  <div className="col-lg-10 col-9">
                                    <input
                                      type="text"
                                      id="typeSeed"
                                      className={
                                        "form-control " +
                                        (errors.typeSeed ? "is-invalid" : "")
                                      }
                                      name="typeSeed"
                                      value={values.typeSeed}
                                      onChange={handleChange}
                                    />
                                    <div className="invalid-feedback">
                                      <i className="bx bx-radio-circle"></i>
                                      {errors.typeSeed && touched.typeSeed
                                        ? errors.typeSeed
                                        : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group row align-items-center">
                                  <div className="col-lg-2 col-3">
                                    <label className="col-form-label">
                                      ระดับการคั่ว
                                    </label>
                                  </div>
                                  <div className="col-lg-10 col-9">
                                    <input
                                      type="text"
                                      id="levelCoffee"
                                      className={
                                        "form-control " +
                                        (errors.levelCoffee ? "is-invalid" : "")
                                      }
                                      name="levelCoffee"
                                      value={values.levelCoffee}
                                      onChange={handleChange}
                                    />
                                    <div className="invalid-feedback">
                                      <i className="bx bx-radio-circle"></i>
                                      {errors.levelCoffee && touched.levelCoffee
                                        ? errors.levelCoffee
                                        : null}
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : null}

                            <div className="form-group row align-items-center">
                              <div className="col-lg-2 col-3">
                                <label className="col-form-label">
                                  ชื่อสินค้า
                                </label>
                              </div>
                              <div className="col-lg-10 col-9">
                                <input
                                  type="text"
                                  id="name"
                                  className={
                                    "form-control " +
                                    (errors.name ? "is-invalid" : "")
                                  }
                                  name="name"
                                  value={values.name}
                                  onChange={handleChange}
                                />
                                <div className="invalid-feedback">
                                  <i className="bx bx-radio-circle"></i>
                                  {errors.name && touched.name
                                    ? errors.name
                                    : null}
                                </div>
                              </div>
                            </div>

                            <div className="form-group row align-items-center">
                              <div className="col-lg-2 col-3">
                                <label className="col-form-label">ราคา</label>
                              </div>
                              <div className="col-lg-10 col-9">
                                <input
                                  type="number"
                                  id="price"
                                  className={
                                    "form-control " +
                                    (errors.price ? "is-invalid" : "")
                                  }
                                  name="price"
                                  value={values.price}
                                  onChange={handleChange}
                                />
                                <div className="invalid-feedback">
                                  <i className="bx bx-radio-circle"></i>
                                  {errors.price && touched.price
                                    ? errors.price
                                    : null}
                                </div>
                              </div>
                            </div>

                            <div className="form-group row align-items-center">
                              <div className="col-lg-2 col-3">
                                <label className="col-form-label">
                                  รายละเอียด
                                </label>
                              </div>
                              <div className="col-lg-10 col-9">
                                <textarea
                                  className={
                                    "form-control " +
                                    (errors.detail ? "is-invalid" : "")
                                  }
                                  id="exampleFormControlTextarea1"
                                  rows="5"
                                  type="text"
                                  name="detail"
                                  value={values.detail}
                                  onChange={handleChange}
                                ></textarea>
                                <div className="invalid-feedback">
                                  <i className="bx bx-radio-circle"></i>
                                  {errors.detail && touched.detail
                                    ? errors.detail
                                    : null}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 d-flex justify-content-end">
                            <button
                              type="submit"
                              className="btn btn-primary me-1 mb-1"
                            >
                              บันทึก
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </Formik>
  );
}

export default FormProduct;
