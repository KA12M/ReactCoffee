import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { PostRegister } from "../services/User.Service";

const Register = () => {
  const navigate = useNavigate();
  const buildSuccess = () => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'สมัครสมาชิกเรียบร้อย',
      showConfirmButton: false,
      timer: 1500
    })
    navigate("/login");
  };
  const buildError = (response) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: response.msg + "!",
    });
  };
  return (
    <Formik
      initialValues={{ email: "", name: "", password: "", confirmPassword: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) errors.email = "Required";
        if (!values.name) errors.name = "Required";
        if (!values.password) errors.password = "Required";
        if (!values.confirmPassword) errors.confirmPassword = "Required";
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
          errors.email = "Invalid email address";
        else if (values.password != values.confirmPassword)
          errors.confirmPassword = "รหัสไม่ตรงกัน";
        return errors;
      }}
      onSubmit={(values) => {
        PostRegister(values).then((response) => {
          if (response.msg == "OK") buildSuccess();
          else buildError(response);
        });
      }}
    >
      {({ values, errors, touched, handleSubmit, handleChange }) => (
        <div id="auth">
          <div className="row h-100">
            <div className="col-lg-5 col-12">
              <div id="auth-left">
                <div className="auth-logo">
                  <a href="index.html">
                    <img src="img/logo.png" alt="Logo" width="80" />
                  </a>
                </div>
                <h1 className="auth-title">Coffee.House</h1>
                <p className="auth-subtitle mb-5">สมัครสมาชิก</p>

                <form onSubmit={handleSubmit}>
                  <div className="form-group position-relative has-icon-left mb-4">
                    <input
                      className="form-control form-control-xl"
                      placeholder="อีเมล"
                      type="text"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                    <div className="form-control-icon">
                      <i className="bi bi-envelope"></i>
                    </div>
                    {errors.email && touched.email && errors.email}
                  </div>
                  <div className="form-group position-relative has-icon-left mb-4">
                    <input
                      className="form-control form-control-xl"
                      placeholder="ชื่อผู้ใช้"
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                    <div className="form-control-icon">
                      <i className="bi bi-person"></i>
                    </div>
                    {errors.name && touched.name && errors.name}
                  </div>
                  <div className="form-group position-relative has-icon-left mb-4">
                    <input
                      className="form-control form-control-xl"
                      placeholder="รหัส"
                      type="password"
                      name="password"
                      values={values.password}
                      onChange={handleChange}
                    />
                    <div className="form-control-icon">
                      <i className="bi bi-shield-lock"></i>
                    </div>
                    {errors.password && touched.password && errors.password}
                  </div>
                  <div className="form-group position-relative has-icon-left mb-4">
                    <input
                      className="form-control form-control-xl"
                      placeholder="ยืนยันรหัสผ่าน"
                      type="password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                    />
                    <div className="form-control-icon">
                      <i className="bi bi-shield-lock"></i>
                    </div>
                    {errors.confirmPassword &&
                      touched.confirmPassword &&
                      errors.confirmPassword}
                  </div>
                  <button
                    className="btn btn-primary btn-block btn-lg shadow-lg mt-5"
                    type="submit"
                  >
                    สมัครสมาชิก
                  </button>
                </form>
                <div className="text-center mt-5 text-lg fs-4">
                  <p className="text-gray-600">
                    มีสมาชิก?{" "}
                    <Link to="/login" className="font-bold text-color">
                      เข้าสู่ระบบ
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-7 d-none d-lg-block">
              <div id="auth-right"></div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Register;
