import React, { useEffect, useState } from "react";
import CardProduct from "../home/Components/cardProduct";
import { GetProductsWithSize } from "../../../services/Product.Service";
import FooterPublic from "../../../components/footer.public";
import Pagination from "../../../components/pagination.public";
import HeaderPage from "../../../components/header"; 

const ProductPage = () => {
  const [productData, setProductData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [pagin, setPagin] = useState({
    currentPage: 1,
    pageSize: 0,
    totalPage: 0,
    totalRow: 0,
  });

  useEffect(() => {
    fetchProducts(1, 16, "");
  }, []);

  async function fetchProducts(currentPage, pageSize, search) {
    await GetProductsWithSize(currentPage, pageSize, search).then((res) => {
      console.log("fetchProducts()", res.data);
      setProductData(res.data);
      setPagin(res.pagin);
    });
  }

  function setCurrentPage(currentPage) {
    fetchProducts(currentPage, pagin.pageSize, keyword);
    window.scroll({
      top: 0,
      left: 100,
      behavior: "smooth",
    });
  }
  function reset() {
    fetchProducts(1, pagin.pageSize, keyword);
  } 
  return (
    <>
      <HeaderPage title="สินค้า" tailing="สินค้า" />

      <section className="shop spad">
        <div className="container">
          <div className="shop__option">
            <div className="row">
              <div className="col-lg-7 col-md-7">
                <div className="shop__option__search">
                  <form onSubmit={() => reset()}>
                    <input
                      type="text"
                      placeholder="ค้นหา"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit">
                      <i className="fa fa-search"></i>
                    </button>
                  </form>
                </div>
              </div>
              <div className="row">
                <Pagination
                  totalPage={pagin.totalPage}
                  currentPages={pagin.currentPage}
                  totalRow={pagin.totalRow}
                  onChange={async (page) => {
                    setCurrentPage(page);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row"></div>
          <div className="shop__last__option">
            <div className="row">
              {productData.map((res, index) => {
                return <CardProduct key={index} data={res} />;
              })}
            </div>
            <div className="row">
              <Pagination
                totalPage={pagin.totalPage}
                currentPages={pagin.currentPage}
                totalRow={pagin.totalRow}
                onChange={async (page) => {
                  setCurrentPage(page);
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <FooterPublic />
    </>
  );
};

export default ProductPage;
