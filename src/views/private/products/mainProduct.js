import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../helper/Axios";
import { MdDescription, MdDelete, MdModeEdit } from "react-icons/md";
import { GetManageStockByPdId } from "../../../services/ManageStock.Service";
import { DateFormat } from "../../../helper/dateFormat";
import LoadingPage from "../../../components/loadingPage";
import Pagination from "../../../components/Pagination";
import { GetProductsWithSize } from "../../../services/Product.Service";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { DeleteProduct } from "../../../services/Product.Service";

function MainProduct() {
  const url = BASE_URL;
  var money = new Intl.NumberFormat("th-TH"); 
  const navigation = useNavigate();
  const [productData, setProductData] = useState([]);
  const [stock, setStock] = useState([]);
  const [pagin, setPagin] = useState({
    currentPage: 1,
    pageSize: 0,
    totalPage: 0,
    totalRow: 0,
  });

  const [keyword, setKeyword] = useState("");
  const [load, setLoad] = useState(true);
  useEffect(() => {
    fetchProducts(1, 10, "");
  }, []);

  async function fetchProducts(currentPage, pageSize, search) {
    await GetProductsWithSize(currentPage, pageSize, search).then((res) => {
      console.log(res);
      setProductData(res.data);
      setPagin(res.pagin);
      setLoad(false);
    });
  }
  async function onDelete(pdid) {
    Swal.fire({
      title: "ลบสินค้า!",
      text: "ลบสินค้าออกจากระบบ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33", 
    }).then(async (result) => {
      if (result.isConfirmed) {
        await DeleteProduct(pdid).then((res) => {
          if (res.msg == "OK") {
            Swal.fire("Deleted!", "ลบสินค้าเรียบร้อย", "success");
            fetchProducts(pagin.currentPage, pagin.pageSize, keyword);
          }
        });
      }
    });
  }
  function setCurrentPage(currentPage) {
    fetchProducts(currentPage, pagin.pageSize, keyword);
  }

  function getManageStock(id) {
    GetManageStockByPdId(id).then((res) => {
      console.log("getManageStock()", res);
      if (res != null) setStock(res);
    });
  }

  const buildColumn = productData.map((res, index) => {
    return (
      <tr key={index}>
        <td>
          <img
            src={
              res.productDetail.length == 0
                ? "https://www.powerstore.co.th/image/no-image2.jpg"
                : `${url}${res.productDetail[0].img}`
            }
            width="80"
          />
        </td>
        <td>{(pagin.currentPage - 1) * pagin.pageSize + (index + 1)}</td>
        <td className="text-bold-500">{res.id}</td>
        <td>{res.name}</td>
        <td className="text-bold-500">{res.type.typeName}</td>
        <td>{money.format(res.price)} บาท</td>
        <td>{res.stock} ชิ้น</td>
        <td>{res.stockSell} ชิ้น</td>
        <td></td>
        <td>
        <button
            className="btn btn-info m-1" 
            onClick={() =>navigation('/admin/productDetail/'+res.id)}
          >
            <MdDescription />
          </button> 
          <button
            className="btn btn-warning m-1"
            onClick={() => navigation(`/admin/formProduct/${res.id}`)}
          >
            <MdModeEdit />
          </button>
          <button
            className="btn btn-danger m-1"
            onClick={() => onDelete(res.id)}
          >
            <MdDelete />
          </button>
        </td>
      </tr>
    );
  });

  function reset() {
    fetchProducts(1, pagin.pageSize, keyword);
  }
  function onSize(num) {
    var result = pagin;
    result.pageSize = num;
    setPagin(result);
    reset();
  }
  const pageSizeChange = [5, 10, 25, 50, 100];
  const buildSearch = (
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
        onClick={(e) => reset()}
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
  );
  return (
    <div id="main">
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
              <h3>สินค้า</h3>
              <p className="text-subtitle text-muted">สินค้าในระบบ</p>
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
                    ตารางสินค้าในระบบ
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
                <div className="card-header ">
                  <div className="col-md-6">
                    สินค้า
                    {buildSearch}
                  </div>
                  <div>
                    <Link
                      to="/admin/formProduct"
                      className="btn btn-outline-success float-end"
                    >
                      เพิ่มสินค้า
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="thead-dark">
                        <tr>
                          <th>สินค้า</th>
                          <th>ลำดับ</th>
                          <th>รหัสสินค้า</th>
                          <th>ชื่อสินค้า</th>
                          <th>ประเภท</th>
                          <th>ราคา</th>
                          <th>จำนวนในคลัง</th>
                          <th>ยอดขาย</th>
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
      </div>

      <div
        className="modal fade"
        id="exampleModalScrollable"
        role="dialog"
        aria-labelledby="exampleModalScrollableTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalScrollableTitle">
                ประวัติการจัดการคลังสินค้า เลขสินค้า{" "}
                {stock.length == 0 ? "" : stock[0].prodcutId}
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i data-feather="x"></i>
              </button>
            </div>
            <div className="modal-body">
              {stock.length == 0
                ? ""
                : [...stock].reverse().map((res) => {
                    return (
                      <div
                        key={res.id}
                        className={
                          "alert alert-" +
                          (res.typeManage == 1 ? "success" : "danger")
                        }
                      >
                        <h4 className="alert-heading">
                          {res.typeManage == 1
                            ? "คำสั่งซื้อสำเร็จ"
                            : "คำสั่งซื้อถูกยกเลิก"}
                        </h4>
                        <p>
                          {res.typeManage == 1
                            ? "นำจำนวนสินค้าในคลังออก"
                            : "เพิ่มจำนวนสินค้าในคลัง"}{" "}
                          <span
                            className={
                              "badge bg-white text-" +
                              (res.typeManage == 1 ? "success" : "danger")
                            }
                          >
                            {res.stock}
                          </span>{" "}
                          {"  "}
                          {DateFormat(res.date)}
                        </p>
                      </div>
                    );
                  })}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainProduct;
