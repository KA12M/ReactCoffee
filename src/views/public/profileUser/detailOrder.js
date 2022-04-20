import Footer from "../../../components/footer.public";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GetOrderById, PostPayment } from "../../../services/Order.Service";
import ImgUrl from "../../../components/imgUrl";
import { DateFormat } from "../../../helper/dateFormat";
import { Upload, Button, Steps, Divider } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const DetailOrder = () => {
  const { Step } = Steps;
  const props = {
    onChange: (e) => {
      e.fileList = [];
      console.log(e);
      setPayImg(e.file.originFileObj);
    },
  };
  function onSaveImgpayment() {
    if (payimg)
      PostPayment(orderId, payimg).then((result) => {
        fetchOrderById(orderId);
      });
  }
  const money = new Intl.NumberFormat("TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
  });
  const { orderId } = useParams();
  const [order, setOrder] = useState();
  const [payimg, setPayImg] = useState();

  useEffect(() => {
    if (orderId) fetchOrderById(orderId);
  }, []);

  async function fetchOrderById(id) {
    await GetOrderById(id).then((result) => {
      console.log(result.data);
      if (result.msg == "OK") setOrder(result.data);
    });
  }
  const calList = () => {
    let total = 0;
    if (order)
      total = order.orderDetail.reduce(
        (a, b) => a + b.amount * b.product.price,
        0
      );
    return total;
  };
  const buildItem = () => {
    return order.orderDetail.map((result, i) => {
      return (
        <div key={i} className="d-flex position-relative m-2 shadow-sm rounded">
          <img
            src={ImgUrl(result.product.productDetail[0].img)}
            className="flex-shrink-0 me-3"
            alt="..."
            width="180px"
          />
          <div>
            <h5 className="mt-0">
              {result.product.name} {money.format(result.product.price)}
            </h5>
            <p>
              x{result.amount}{" "}
              {money.format(result.amount * result.product.price)}
            </p>
            <Link
              to={"/productdetail/" + result.product.id}
              className="btn btn-info mb-2"
            >
              ดูสินค้า
            </Link>
          </div>
        </div>
      );
    });
  };
  const buildPayment = () => {
    return order.payment.map((result, i) => {
      return (
        <div key={i} className="card col-sm-12 col-lg-6">
          <img src={ImgUrl(result.payImg)} alt="..." />
          <div className="col-md-6 p-4 ps-md-0">
            <h5 className="mt-0">{DateFormat(result.date)}</h5>
          </div>
        </div>
      );
    });
  };
  if (!order) return <div />;
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="shadow-sm m-5 col-sm-12 col-lg-6">
          <div className="card-body">
            <h5 className="card-title">
              เลขคำสั่งซื้อ: {order.id}{" "}
              <span className="badge bg-warning">{order.status}</span>
            </h5>
            <p className="card-text">วันที่ {DateFormat(order.date)}</p>
            <p className="card-text">ยอดชำระ: {money.format(calList())}</p>
            {order.transportDetail.length > 0 ? (
              <>
                <Divider />
                <Steps
                  current={order.status=="สำเร็จ"?order.transportDetail.length:order.transportDetail.length-1} 
                  direction="vertical"
                >
                  {order.transportDetail.map((result,i)=>{
                    return <Step key={i} title={result.status} description={result.detail} />
                  })}  
                </Steps>
                <Divider />
              </>
            ) : (
              ""
            )}
            {buildItem()}
            <p className="card-text">ใบเสร็จชำระเงิน </p>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>แนบเพิ่มเติม</Button>
            </Upload>
            <Button onClick={() => onSaveImgpayment()}>บันทึก</Button>
            <div className="row">{buildPayment()}</div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DetailOrder;
