import React, { useState, useEffect } from "react";
import {
  MdDescription,
  MdOutlineDoDisturb,
  MdDelete,
  MdReplayCircleFilled,
} from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  GetUsersWithSize,
  DeleteUser,
  PutUserStatus,
} from "../../../services/User.Service";
import Pagination from "../../../components/Pagination";
import LoadingPage from "../../../components/loadingPage";

function MainUser() {
  const [userData, setUserData] = useState([]);
  const [pagin, setPagin] = useState({
    currentPage: 1,
    pageSize: 10,
    totalRow: 0,
    totalPage: 0,
  });
  const [keyword, setKeyword] = useState("");
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetchUser(1, 10, "");
  }, []);

  function setCurrentPage(currentPage) {
    fetchUser(currentPage, pagin.pageSize, keyword);
  }

  async function fetchUser(currentPage, pageSize, search) {
    await GetUsersWithSize(currentPage, pageSize, search).then((res) => {
      console.log(res);
      setUserData(res.data);
      setPagin(res.pagin);
      setLoad(false);
    });
  }
  async function deleteUser(id, del) {
    await DeleteUser(id, del).then((res) => {
      console.log(res);
      if (res.msg == "OK") Swal.fire("สำเร็จ", ``, "success");
    });
    reset();
  }

  const buildColumn = userData.map((e, index) => {
    return (
      <tr key={index}>
        <td className="text-bold-500">
          {(pagin.currentPage - 1) * pagin.pageSize + (index + 1)}
        </td>
        <td className="text-bold-500">{e.id}</td>
        <td>{e.name}</td>
        <td className="text-bold-500">{e.email}</td>
        <td>{e.status}</td>
        <td>
          {e.isused == 1 ? (
            <span className="badge bg-success">ใช้งาน</span>
          ) : (
            <span className="badge bg-danger">ระงับการใช้งาน</span>
          )}
        </td>
        <td>
          <button
            className="btn btn-info m-1"
            data-bs-toggle="modal"
            data-bs-target="#border-less"
          >
            <MdDescription />
          </button>
          {e.isused == 1 ? (
            <button
              onClick={() => {
                Swal.fire({
                  title: "ระงับการใช้งาน?",
                  text: `ระงับการใช้งานผู้ใช้รหัส ${e.id}!`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                }).then((result) => {
                  if (result.isConfirmed) deleteUser(e.id, "");
                });
              }}
              className="btn btn-danger m-1"
            >
              <MdOutlineDoDisturb />
            </button>
          ) : (
            <button
              onClick={() => {
                Swal.fire({
                  title: "ปรับสถานะ?",
                  text: `ปรับสถานะการใช้งานของผู้ใช้รหัส ${e.id}!`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                }).then((result) => {
                  if (result.isConfirmed)
                    PutUserStatus(e).then((result) => {
                      if (reset.msg == "OK") Swal.fire("สำเร็จ", ``, "success");
                      reset();
                    });
                });
              }}
              className="btn btn-warning m-1"
            >
              <MdReplayCircleFilled />
            </button>
          )}
          <Link
            to=""
            onClick={() => {
              Swal.fire({
                title: "ลบผู้ใช้งาน?",
                text: `ลบผู้ใช้งานรหัส ${e.id}!`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
              }).then((result) => {
                if (result.isConfirmed) deleteUser(e.id, "del");
              });
            }}
            className="btn btn-danger m-1"
          >
            <MdDelete />
          </Link>
        </td>
      </tr>
    );
  });

  function reset() {
    fetchUser(1, pagin.pageSize, keyword);
  }

  function onSize(num) {
    var result = pagin;
    result.pageSize = num;
    setPagin(result);
    reset();
  }
  const pageSizeChange = [5, 10, 25, 50, 100];

  return (
    <div id="main">
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
              <h3>สมาชิก</h3>
              <p className="text-subtitle text-muted">รายชื่อผู้ใช้งานในระบบ</p>
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
                    ตารางรายชื่อสมาชิก
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <section className="section">
          <div className="row" id="table-head">
            <div className="col-12">
              <div className="card">
                <div className="card-header col-md-6 col-12">
                  สมาชิก
                  <div className="input-group">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="กรอกข้อมูลค้นหา"
                      value={keyword}
                      onChange={(e) => {
                        setKeyword(e.target.value);
                        reset();
                      }}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => reset()}
                    >
                      ค้นหา
                    </button>
                    <button
                      className="btn btn-primary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></button>
                    <ul className="dropdown-menu">
                      {pageSizeChange.map((res) => {
                        return (
                          <button
                            key={res}
                            className="dropdown-item"
                            onClick={() => onSize(res)}
                          >
                            {res}
                          </button>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0" id="table1">
                      <thead className="thead-dark">
                        <tr>
                          <th>ลำดับ</th>
                          <th>รหัสผู้ใช้งาน</th>
                          <th>ชื่อ</th>
                          <th>อีเมล</th>
                          <th>สถานะผู้ใช้</th>
                          <th>สถานะการใช้งาน</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>{buildColumn}</tbody>
                    </table>
                    <Pagination
                      totalPage={pagin.totalPage}
                      currentPages={pagin.currentPage}
                      totalRow={pagin.totalRow}
                      onChange={async (page) => {
                        setCurrentPage(page);
                      }}
                    />
                    <LoadingPage status={load} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div
          className="modal fade text-left modal-borderless"
          id="border-less"
          role="dialog"
          aria-labelledby="myModalLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Border-Less</h5>
                <button
                  type="button"
                  className="close rounded-pill"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i data-feather="x"></i>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Bonbon caramels muffin. Chocolate bar oat cake cookie pastry
                  dragée pastry. Carrot cake chocolate tootsie roll chocolate
                  bar candy canes biscuit. Gummies bonbon apple pie fruitcake
                  icing biscuit apple pie jelly-o sweet roll. Toffee sugar plum
                  sugar plum jelly-o jujubes bonbon dessert carrot cake. Cookie
                  dessert tart muffin topping donut icing fruitcake. Sweet roll
                  cotton candy dragée danish Candy canes chocolate bar cookie.
                  Gingerbread apple pie oat cake. Carrot cake fruitcake bear
                  claw. Pastry gummi bears marshmallow jelly-o.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light-primary"
                  data-bs-dismiss="modal"
                >
                  <i className="bx bx-x d-block d-sm-none"></i>
                  <span className="d-none d-sm-block">Close</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <footer>
          <div className="footer clearfix mb-0 text-muted">
            <div className="float-start">
              <p>2021 &copy;</p>
            </div>
            Karm
          </div>
        </footer>
      </div>
    </div>
  );
}

export default MainUser;
