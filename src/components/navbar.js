import React from "react";
import NavItem from "./itemnav"; 

function Navbars() { 
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     NavItemActive: "",
  //   };
  // }

  // activeitem = (item) => {
  //   if (this.state.NavItemActive.length > 0)
  //     document
  //       .getElementById(this.state.NavItemActive)
  //       .classList.remove("active");
  //   // this.setState({ NavItemActive: item }, () => {
  //   //   document.getElementById(this.state.NavItemActive).classList.add("active");
  //   // });
  // };

  function closeNav() {
    document.getElementById("sidebar").classList.remove("active");
    document.getElementById("main").style.marginLeft = "0";
  }

  return (
    <div>
      <div id="sidebar" className="active">
        <div className="sidebar-wrapper active">
          <div className="sidebar-header">
            <div className="d-flex justify-content-between">
              <div className="logo">
                <a>
                  <img src="assets/images/logo/logo.png" alt="Logo" srcSet="" />
                </a>
              </div>
              <div className="toggler">
                <a
                  onClick={() => closeNav()}
                  className="sidebar-hide d-xl-none d-block"
                >
                  <i className="bi bi-x bi-middle"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="sidebar-menu">
            <ul className="menu">
              <li className="sidebar-title">เมนู</li>

              <NavItem
                item="หน้าหลัก"
                toLink={"/admin"}
                icon="bi bi-grid-fill"
              />
              <NavItem
                item="คำสั่งซื้อ"
                toLink={"/admin/mainOrder"}
                icon="bi bi-list"
              />
              <NavItem
                item="สินค้า"
                toLink={"/admin/mainProduct"}
                icon="bi bi-list"
              />
              <NavItem
                item="รายชื่อผู้ใช้งาน"
                toLink={"/admin/mainUser"}
                icon="bi bi-person"
              />
            </ul>
          </div>
          <button className="sidebar-toggler btn x">
            <i data-feather="x"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbars;
