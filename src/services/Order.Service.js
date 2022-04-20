import Instance from "../helper/Axios";

const url = "apiorders";
const urlOrderDetail = "ApiOrderDetails";
const urlPayment = "apipayments";

export async function GetOrders() {
  try {
    const response = await Instance.get(url);
    return await response.data;
  } catch (err) {
    console.log("error", err);
  }
}

export async function GetOrderById(orderId) {
  try {
    const response = await Instance.get(url + `/byId/${orderId}`);
    return await response.data;
  } catch (err) {
    console.log("error", err);
  }
}

export async function GetOrderByUserId(userId) {
  try {
    const response = await Instance.get(url + `/ByUserId/${userId}`);
    return await response.data;
  } catch (err) {
    console.log("error", err);
  }
}

export async function CancelOrder(v) {
  try {
    let formData = new FormData();
    formData.append("id", v.id);
    formData.append("userId", v.userId);
    formData.append("addressId", v.addressId);
    formData.append("status", "ยกเลิกแล้ว");
    formData.append("total", v.total);
    formData.append("date", v.date);
    formData.append("transportCode", v.transportCode);
    formData.append("isused", v.isused);
    const response = await Instance.put(url,formData); 
    return await response.data;
  } catch (err) {
    console.log("error", err);
  }
}


export async function ConfirmOrder(orderId) {
  try {
    const response = await Instance.post(url + `/ConfirmOrder/${orderId}`);
    return await response.data;
  } catch (err) {
    console.log("error", err);
  }
} 

export async function FinishOrder(orderId) {
  try {
    const response = await Instance.post(url + `/OrderFinish/${orderId}`);
    return await response.data;
  } catch (err) {
    console.log("error", err);
  }
}

export async function PostOrder(v,payImg,itemList) {
  try {
    let formData = new FormData();
    formData.append("userId",v.userId);
    formData.append("addressId",v.addressId);
    formData.append("status", "ที่ต้องชำระ");
    formData.append("total",v.total); 
    const response = await Instance.post(url,formData); 

    let formData1 = new FormData();
    formData1.append("upfile", payImg)
    if(response.data.msg=="OK") {
      await itemList.map(async (info)=>{
        let formDataItem = new FormData();
        formDataItem.append("orderId", response.data.data.id)
        formDataItem.append("productId", info.pdid)
        formDataItem.append("amount", info.amount)
        await Instance.post(urlOrderDetail,formDataItem); 
      }) 
      await Instance.post(urlPayment+"/"+response.data.data.id,formData1).then((res)=>{
        localStorage.removeItem('cartList'+response.data.data.userId);
        if(res.data.msg=="OK") console.log("PostOrder() and Upfile payment success",res.data);
        else console.log("PostOrder() post paymentImg error",res.data)
      });
    }
    return await response.data;
  } catch (err) {
    console.log("error", err);
  }
}

export async function PostPayment(orderId,img) {
  try {
    let formData1 = new FormData();
    formData1.append("upfile", img)
    var response = await Instance.post(urlPayment+"/"+orderId,formData1); 
    return await response.data;
  } catch (err) {
    console.log("error", err);
  }
}