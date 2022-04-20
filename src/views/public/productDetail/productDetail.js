import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetProductById } from "../../../services/Product.Service";
import { useParams } from "react-router-dom";
import ImgUrl from "../../../components/imgUrl";
import FooterPublic from "../../../components/footer.public";
import HeaderPage from "../../../components/header";
import "./style.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { DateFormat } from "../../../helper/dateFormat";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import $ from "jquery";

const ProductDetail = () => {
  const noImg = "https://www.powerstore.co.th/image/no-image2.jpg";
  const navigation = useNavigate();
  let { pdid } = useParams();
  const [data, setData] = useState();
  const [load, setLoad] = useState(true);
  const [num, setNum] = useState(1);
  const [islike, setIsLike] = useState(false);

  useEffect(() => {
    fetchProductById();
  }, []);

  async function fetchProductById() {
    await GetProductById(pdid).then((result) => {
      let user = JSON.parse(localStorage.getItem("userLogin"));
      console.log(result.data[0]);
      if (user)
        var list = JSON.parse(localStorage.getItem("listLike" + user.id));
      setIsLike(false);
      if (list)
        list.forEach((res) => {
          if (res.pdid == result.data[0].id) setIsLike(true);
        });
      setData(result.data[0]);
      setLoad(false);
    });
  }
  function like() {
    let user = JSON.parse(localStorage.getItem("userLogin"));
    if (data && user) {
      let chk = false;
      let newList = [];
      let list = JSON.parse(localStorage.getItem("listLike" + user.id));
      if (list) {
        list.forEach((res) => {
          if (res.pdid == data.id) chk = true;
        });
        if (chk)
          list.forEach((res) => {
            if (res.pdid != data.id) newList.push(res);
          });
        else {
          newList = list;
          newList.push({
            pdid: data.id,
            name: data.name,
            price: data.price,
            img:
              data.productDetail.length > 0
                ? ImgUrl(data.productDetail[0].img)
                : "https://www.powerstore.co.th/image/no-image2.jpg",
          });
        }
      } else if (!list)
        newList.push({
          pdid: data.id,
          name: data.name,
          price: data.price,
          img:
            data.productDetail.length > 0
              ? ImgUrl(data.productDetail[0].img)
              : "https://www.powerstore.co.th/image/no-image2.jpg",
        });
      localStorage.setItem("listLike" + user.id, JSON.stringify(newList));
      fetchProductById();
    } else if (!user) navigation("/login");
  }

  function countStar(star) {
    var rows = [];
    for (var i = 0; i < star; i++)
      rows.push(<i key={i} className="fa-solid fa-star"></i>);
    return rows;
  }
  const numPluss = () => {
    if (data.stock > num) setNum(num + 1);
  };
  const numRemove = () => {
    if (num > 1) setNum(num - 1);
  };
  const addCart = () => {
    var user = JSON.parse(localStorage.getItem("userLogin"));
    var newCart = [];
    if (data && num && user) {
      let oldCart = JSON.parse(localStorage.getItem("cartList" + user.id));
      if (!oldCart || oldCart.length == 0)
        newCart.push({
          pdid: data.id,
          name: data.name,
          amount: num,
          price: data.price,
          img:
            data.productDetail.length > 0
              ? ImgUrl(data.productDetail[0].img)
              : "https://www.powerstore.co.th/image/no-image2.jpg",
        });
      else {
        oldCart.map((item) => {
          if (item.pdid == data.id) {
            item.amount += num;
            newCart = oldCart;
          }
        });
        if (newCart.length == 0) {
          oldCart.push({
            pdid: data.id,
            name: data.name,
            amount: num,
            price: data.price,
            img:
              data.productDetail.length > 0
                ? ImgUrl(data.productDetail[0].img)
                : "https://www.powerstore.co.th/image/no-image2.jpg",
          });
          newCart = oldCart;
        }
      }
      localStorage.setItem("cartList" + user.id, JSON.stringify(newCart));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "เพิ่มสินค้าลงตะกร้าสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
      navigation("/shopingcart");
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    } else if (!user) navigation("/login");
  };

  const buildBigImg = () => (
    <div className="col-lg-6">
      <div className="product__details__img">
        <div className="product__details__big__img">
          <img
            onClick={() =>
              onShowImg(
                data.productDetail.length > 0
                  ? ImgUrl(data.productDetail[0].img)
                  : noImg
              )
            }
            className="big_img"
            src={
              data.productDetail.length > 0
                ? ImgUrl(data.productDetail[0].img)
                : noImg
            }
            alt=""
            style={{
              width: "388px",
              height: "388px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="product__details__thumb">
          {data.productDetail.map((result, index) => {
            return (
              <div key={index} className="pt__item active">
                <img
                  data-imgbigurl={ImgUrl(result.img)}
                  src={ImgUrl(result.img)}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
  $(".product__details__thumb img").on("click", function () {
    $(".product__details__thumb .pt__item").removeClass("active");
    $(this).addClass("active");
    var imgurl = $(this).data("imgbigurl");
    var bigImg = $(".big_img").attr("src");
    if (imgurl != bigImg) {
      $(".big_img").attr({
        src: imgurl,
      });
    }
  });
  const onShowImg = (img) => {
    Swal.fire({
      imageUrl: img,
    });
  };
  if (data == null) return <div />;
  return (
    <>
      <HeaderPage
        title="รายละเอียดสินค้า"
        linkList={[{ title: "สินค้า", to: "/productPage" }]}
        tailing={data.name}
      />

      <section className="product-details spad mb-5">
        <div className="container">
          <div className="row">
            {buildBigImg()}
            <div className="col-lg-6">
              <div className="product__details__text">
                <div className="product__label">{data.type.typeName}</div>
                <h4>{data.name}</h4>
                <h5>
                  {data.price
                    .toFixed()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                  บาท
                </h5>
                <p>{data.detail}</p>
                <ul>
                  <li>
                    ในคลัง:{" "}
                    <span>{data.stock == 0 ? "สินค้าหมด" : data.stock}</span>
                  </li>
                  {data.typeId != 1 ? (
                    ""
                  ) : (
                    <>
                      <li>
                        เมล็ดพันธุ์: <span>{data.typeSeed}</span>
                      </li>
                      <li>
                        ระดับการคั่ว: <span>{data.levelCoffee}</span>
                      </li>
                    </>
                  )}
                </ul>
                <div className="product__details__option">
                  {data.stock == 0 ? (
                    ""
                  ) : (
                    <>
                      <div className="quantity">
                        <div className="pro-qty d-flex justify-content-around pt-3">
                          <a onClick={() => numRemove()}>
                            <i className="fa-solid fa-minus"></i>
                          </a>
                          <div className="num">{num}</div>
                          <a onClick={() => numPluss()}>
                            <i className="fa-solid fa-plus"></i>
                          </a>
                        </div>
                      </div>
                      <a onClick={() => addCart()} className="primary-btn">
                        เพิ่มลงตะกร้า
                      </a>
                    </>
                  )}
                  <a className="heart__btn" onClick={() => like()}>
                    {islike ? <BsHeartFill /> : <BsHeart />}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="product__details__tab">
            <div className="col-lg-12">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#tabs-1"
                    role="tab"
                  >
                    Description
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tabs-2"
                    role="tab"
                  >
                    Additional information
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tabs-3"
                    role="tab"
                  >
                    รีวิว({data.review.length})
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane active" id="tabs-1" role="tabpanel">
                  <div className="row d-flex justify-content-center">
                    <div className="col-lg-8">
                      <p>
                        This delectable Strawberry Pie is an extraordinary treat
                        filled with sweet and tasty chunks of delicious
                        strawberries. Made with the freshest ingredients, one
                        bite will send you to summertime. Each gift arrives in
                        an elegant gift box and arrives with a greeting card of
                        your choice that you can personalize online!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="tabs-2" role="tabpanel">
                  <div className="row d-flex justify-content-center">
                    <div className="col-lg-8">
                      <p>
                        This delectable Strawberry Pie is an extraordinary treat
                        filled with sweet and tasty chunks of delicious
                        strawberries. Made with the freshest ingredients, one
                        bite will send you to summertime. Each gift arrives in
                        an elegant gift box and arrives with a greeting card of
                        your choice that you can personalize online!2
                      </p>
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="tabs-3" role="tabpanel">
                  <div className="row d-flex justify-content-center">
                    <div
                      className="row justify-content-center"
                      style={{ backgroundColor: "#FFF1C4" }}
                    >
                      {data.review.map((res, index) => {
                        return (
                          <div className="col-md-8 p-2" key={index}>
                            <div className="testimonial__item">
                              <div className="testimonial__author">
                                <div className="testimonial__author__pic">
                                  <img src="img/testimonial/ta-1.jpg" alt="" />
                                </div>
                                <div className="testimonial__author__text">
                                  <h5>
                                    {res.user.name}{" "}
                                    <span>{DateFormat(res.date)}</span>
                                  </h5>
                                  <span>
                                    {res.comments == null
                                      ? ""
                                      : `ความคิดเห็น: ${res.comments}`}
                                  </span>
                                </div>
                              </div>
                              <div className="rating">
                                <span>{countStar(res.star)}</span>
                              </div>
                              {res.reviewDetail.map((res, i) => {
                                return (
                                  <img
                                    onClick={() => onShowImg(ImgUrl(res.img))}
                                    key={i}
                                    src={ImgUrl(res.img)}
                                    width="120"
                                    height="120"
                                  />
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
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

export default ProductDetail;
