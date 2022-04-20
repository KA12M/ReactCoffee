import React, { useEffect, useState } from "react";
import CardProduct from "./Components/cardProduct";
import { GetProductsWithSize } from "../../../services/Product.Service";
import FooterPublic from "../../../components/footer.public";
import $ from "jquery";

const Home = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    await GetProductsWithSize(1, 8, "").then((res) => {
      console.log("fetchProducts()", res.data);
      if (res.data) setProductData(res.data);
    });
  }

  return (
    <>
      <section className="product spad">
        <div className="container">
          <div className="row">
            {productData.map((info) => {
              return <CardProduct key={info.id} data={info} />;
            })}
          </div>
        </div>
      </section>
 
      <section className="instagram spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 p-0">
              <div className="instagram__text">
                <div className="section-title">
                  <span>Follow us on instagram</span>
                  <h2>Sweet moments are saved as memories.</h2>
                </div>
                <h5>
                  <i className="fa-brands fa-instagram"></i> @sweetcake
                </h5>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                  <div className="instagram__pic">
                    <img src="img/instagram/instagram-1.jpg" alt="" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                  <div className="instagram__pic middle__pic">
                    <img src="img/instagram/instagram-2.jpg" alt="" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                  <div className="instagram__pic">
                    <img src="img/instagram/instagram-3.jpg" alt="" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                  <div className="instagram__pic">
                    <img src="img/instagram/instagram-4.jpg" alt="" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                  <div className="instagram__pic middle__pic">
                    <img src="img/instagram/instagram-5.jpg" alt="" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                  <div className="instagram__pic">
                    <img src="img/instagram/instagram-3.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterPublic />
    </>
  );
};

export default Home;
