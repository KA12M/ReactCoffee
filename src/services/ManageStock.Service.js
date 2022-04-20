import Instance from "../helper/Axios";

const url = "apimanagestocks";

export async function GetManageStockByPdId(pdid) {
  try {
    const response = await Instance.get(url + `/bypdid/${pdid}`);
    return await response.data;
  } catch (err) {
    console.log("error", err);
  }
}

export async function PostManageStock(pdid,v) {
  try {
    let formData = new FormData();
    if(v.detail)formData.append("detail",v.detail);
    const response = await Instance.post(url + `/postmanage/${pdid}/${v.stock}/${v.typeManage}`,formData);
    console.log("PostManageStock()",response.data);
    return await response.data;
  } catch (err) {
    console.log("error", err);
  }
}
 