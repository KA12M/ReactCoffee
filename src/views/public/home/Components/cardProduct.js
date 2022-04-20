import ImgUrl from "../../../../components/imgUrl";
import { Link } from "react-router-dom";

const CardProduct = ({ data }) => {
  return (
    <>
      <div className="col-6 col-sm-6 col-md-4 col-lg-3">
        <div className="product__item">
          <Link to={"productdetail/" + data.id}>
            <div
              className="product__item__pic set-bg"
              style={{
                backgroundImage: `url(${
                  data.productDetail.length > 0
                    ? ImgUrl(data.productDetail[0].img)
                    : "https://www.powerstore.co.th/image/no-image2.jpg"
                })`,
              }}
            >
              <div className="product__label">
                <span>{data.type.typeName}</span>
              </div>
            </div>
          </Link>
          <div className="product__item__text">
            <h6>
              <Link to={"/productdetail/" + data.id}>{data.name}</Link>
            </h6>
            <div className="product__item__price">
              {data.price.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
              บาท
            </div>
            <div className="cart_add">
              <a href="#">เพิ่มลงตะกร้า</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProduct;
