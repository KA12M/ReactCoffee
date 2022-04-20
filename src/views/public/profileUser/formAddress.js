import React, { useState, useEffect } from "react";
import Footer from "../../../components/footer.public";
import { Formik } from "formik";
import { PostAddress } from "../../../services/address.service";
import { default as data1 } from "../../../helper/json/province.json";
import { default as data2 } from "../../../helper/json/district.json";
import { default as data3 } from "../../../helper/json/subdistrict.json";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useNavigate } from "react-router-dom";

function FormAddress() {
  let navigation = useNavigate();
  const [idProvince, setIdProvince] = useState();
  const [idAmphure, setIdAmphur] = useState();

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          nameUser: "",
          telephone: "",
          address1: "",
          subDistrict: "",
          district: "",
          province: "",
          zipcode: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.nameUser) errors.nameUser = "กรุณากรอกข้อมูล";
          if (!values.telephone) errors.telephone = "กรุณากรอกข้อมูล";
          if (!values.address1) errors.address1 = "กรุณากรอกข้อมูล";
          if (!values.province) errors.province = "กรุณาเลือกข้อมูล";
          if (!values.district) errors.district = "กรุณาเลือกข้อมูล";
          if (!values.subDistrict) errors.subDistrict = "กรุณาเลือกข้อมูล";
          else if(values.telephone<10) errors.telephone = "กรุณากรอก 10 ตัวเลข";
          return errors;
        }}
        onSubmit={async (values) => {
          let user = JSON.parse(localStorage.getItem("userLogin"));
          if (user) {
            PostAddress(values, user.id).then((response) => {
              if (response.msg == "OK") {
                Swal.fire("success!", "", "success");
                navigation(-1, { replace: true });
              }
            });
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          setFieldValue,
        }) => (
          <div className="d-flex justify-content-center">
            <div className="card col-4 p-2 shadow mt-2">
              <div className="card-content">
                <div className="card-body">
                  <h4 className="card-title">ที่อยู่</h4>
                  <p></p>
                  <form className="form" onSubmit={handleSubmit}>
                    <div className="form-body">
                      <div className="form-group">
                        <input
                          className={
                            "form-control " +
                            (errors.nameUser ? "is-invalid" : "")
                          }
                          placeholder="ชื่อที่อยู่ในการจัดส่ง"
                          type="text"
                          name="nameUser"
                          value={values.nameUser}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          <i className="bx bx-radio-circle"></i>
                          {errors.nameUser && touched.nameUser
                            ? errors.nameUser
                            : null}
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          className={
                            "form-control " +
                            (errors.telephone ? "is-invalid" : "")
                          }
                          placeholder="เบอร์โทรศัพท์"
                          type="text"
                          name="telephone"
                          value={values.telephone}
                          onChange={handleChange}
                          maxLength="10"
                        />
                        <div className="invalid-feedback">
                          <i className="bx bx-radio-circle"></i>
                          {errors.telephone && touched.telephone
                            ? errors.telephone
                            : null}
                        </div>
                      </div>
                      <div className="form-group form-label-group">
                        <textarea
                          className={
                            "form-control " +
                            (errors.address1 ? "is-invalid" : "")
                          }
                          rows="3"
                          placeholder="ที่อยู่"
                          name="address1"
                          value={values.address1}
                          onChange={handleChange}
                        ></textarea>
                        <div className="invalid-feedback">
                          <i className="bx bx-radio-circle"></i>
                          {errors.address1 && touched.address1
                            ? errors.address1
                            : null}
                        </div>
                        <label htmlFor="label-textarea"></label>
                      </div>
                      <div className="form-group">
                        <select
                          name="province"
                          className={
                            "mb-2 form-select " +
                            (errors.province ? "is-invalid" : "")
                          }
                          onChange={(e) => {
                            if (e) {
                              setIdProvince(e.target.value);
                              setFieldValue(
                                "province",
                                data1.province.filter(
                                  (res) => res.Id == e.target.value
                                )[0].NameInThai
                              );
                            }
                          }}
                        >
                          <option value="" label="จังหวัด.."></option>
                          {data1.province.map((result, index) => {
                            return (
                              <option
                                key={index}
                                value={result.Id}
                                label={result.NameInThai}
                              ></option>
                            );
                          })}
                        </select>
                        <div className="invalid-feedback">
                          <i className="bx bx-radio-circle"></i>
                          {errors.province && touched.province
                            ? errors.province
                            : null}
                        </div>
                      </div>
                      <div className="form-group">
                        <select
                          name="province"
                          className={
                            "mb-2 form-select " +
                            (errors.district ? "is-invalid" : "")
                          }
                          onChange={(e) => {
                            if (e) {
                              setIdAmphur(e.target.value);
                              setFieldValue(
                                "district",
                                data2.district.filter(
                                  (res) => res.Id == e.target.value
                                )[0].NameInThai
                              );
                            }
                          }}
                        >
                          <option value="" label="อำเภอ.."></option>
                          {idProvince
                            ? data2.district.map((result, i) => {
                                if (result.ProvinceId == idProvince)
                                  return (
                                    <option
                                      key={i}
                                      value={result.Id}
                                      label={result.NameInThai}
                                    ></option>
                                  );
                              })
                            : null}
                        </select>
                        <div className="invalid-feedback">
                          <i className="bx bx-radio-circle"></i>
                          {errors.district && touched.district
                            ? errors.district
                            : null}
                        </div>
                      </div>
                      <div className="form-group">
                        <select
                          name="province"
                          className={
                            "mb-2 form-select " +
                            (errors.subDistrict ? "is-invalid" : "")
                          }
                          onChange={(e) => {
                            if (e) {
                              setFieldValue(
                                "subDistrict",
                                data3.subDistrict.filter(
                                  (res) => res.Id == e.target.value
                                )[0].NameInThai
                              );
                              setFieldValue(
                                "zipcode",
                                data3.subDistrict.filter(
                                  (res) => res.Id == e.target.value
                                )[0].ZipCode
                              );
                            }
                          }}
                        >
                          <option value="" label="ตำบล.."></option>
                          {idAmphure
                            ? data3.subDistrict.map((result, i) => {
                                if (result.DistrictId == idAmphure)
                                  return (
                                    <option
                                      key={i}
                                      value={result.Id}
                                      label={result.NameInThai}
                                    ></option>
                                  );
                              })
                            : null}
                        </select>
                        <div className="invalid-feedback">
                          <i className="bx bx-radio-circle"></i>
                          {errors.subDistrict && touched.subDistrict
                            ? errors.subDistrict
                            : null}
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          readOnly
                          className="form-control"
                          placeholder="รหัสไปรษณีย์"
                          name="zipcode"
                          value={values.zipcode}
                        />
                      </div>
                    </div>
                    <div className="form-actions d-flex justify-content-end">
                      <button type="submit" className="btn btn-warning me-1">
                        บันทึก
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>

      <Footer />
    </>
  );
}

export default FormAddress;
