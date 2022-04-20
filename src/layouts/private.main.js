import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Navbar from "../components/navbar";
import Swal from "sweetalert2/dist/sweetalert2.js";

const Main = () => {
  const navigate = useNavigate();
  useEffect(() => {
    chkLogin();
  }, []);

  const chkLogin = () => {
    let jsonData = localStorage.getItem("userLogin");
    let chk = JSON.parse(jsonData);
    if (!chk || chk.status != "admin") {
      Swal.fire("error 404!", "", "error");
      navigate("/");
    }
  };
  return (
    <div style={{ backgroundColor: "#f2f7ff" }}>
      <Navbar />

      <Outlet />
    </div>
  );
};

export default Main;
