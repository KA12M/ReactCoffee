import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { PostLogin } from "../services/User.Service";
import Swal from "sweetalert2/dist/sweetalert2.js";

const Login = () => {
  const navigate = useNavigate();

  const loginSuccess = (response) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "เข้าสู่ระบบเรียบร้อย",
      showConfirmButton: false,
      timer: 1500,
    });
    localStorage.setItem('userLogin', JSON.stringify(response.data));
    navigate("/");
  };
  const loginFail = (response) =>
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: response.msg + "!",
    });
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email)  errors.email = "Required";
        if (!values.password)  errors.password = "Required";
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = "Invalid email address"; 
        return errors;
      }}
      onSubmit={(values) => {
        PostLogin(values).then((response) => {
          if (response.msg == "OK") loginSuccess(response)
          else loginFail(response);
        });
      }}
    >
      {({ values, errors, touched, handleSubmit, handleChange }) => (
        <div id="auth">
          <div className="row h-100">
            <div className="col-lg-5 col-12">
              <div id="auth-left">
                <div className="auth-logo">
                  <a href="">
                    <img src="img/logo.png" alt="Logo" width="80" />
                  </a>
                </div>
                <h1 className="auth-title">Coffee.House</h1>
                <p className="auth-subtitle mb-5">เข้าสู่ระบบ</p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group position-relative has-icon-left mb-4">
                    <input
                      className="form-control form-control-xl"
                      placeholder="อีเมล"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                    />
                    <div className="form-control-icon">
                      <i className="bi bi-person"></i>
                    </div>
                    {errors.email && touched.email && errors.email}
                  </div>
                  <div className="form-group position-relative has-icon-left mb-4">
                    <input
                      className="form-control form-control-xl"
                      placeholder="รหัสผ่าน"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      value={values.password}
                    />
                    <div className="form-control-icon">
                      <i className="bi bi-shield-lock"></i>
                    </div>
                    {errors.password && touched.password && errors.password}
                  </div>
                  <button
                    className="btn btn-primary btn-block btn-lg shadow-lg mt-5"
                    type="submit"
                  >
                    เข้าสู่ระบบ
                  </button>
                </form>
                <div className="text-center mt-5 text-lg fs-4">
                  <p className="text-gray-600">
                    ไม่ได้เป็นสมาชิก?{" "}
                    <Link to="/register" className="font-bold text-color">
                      สมัครสมาชิก
                    </Link>
                  </p>
                  <p>
                    <a className="font-bold text-color" href="">
                      ลืมรหัสผ่าน?
                    </a>
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

export default Login;
