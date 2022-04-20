import Instance from "../helper/Axios";

const url = "apiproducts";

export async function GetProductsWithSize(currentPage, pageSize, search) {
  try {
    const response = await Instance.get(
      url +
        `/withsize?currentPage=${currentPage}` +
        `&pageSize=${pageSize}` +
        `&search=${search}`
    );
    return await response.data;
  } catch (err) {
    console.log("error", err);
  }
}

export async function GetProductById(pdid) {
  try {
    const response = await Instance.get(url + "/" + pdid);
    return await response.data;
  } catch (err) {
    console.log("error", err);
  }
}

export async function ChkStock(pdid, amount) {
  try {
    const response = await Instance.post(
      url + "/chkstock/" + pdid + "/" + amount
    );
    return await response.data;
  } catch (err) {
    console.log("error", err);
  }
}

export async function PostProduct(v, uploads) {
  try {
    let formData = new FormData();
    formData.append("typeId", v.typeId);
    formData.append("name", v.name);
    formData.append("price", v.price);
    formData.append("detail", v.detail);
    if (v.typeId == 1) {
      formData.append("typeSeed", v.typeSeed);
      formData.append("levelCoffee", v.levelCoffee);
    }

    const response = await Instance.post(url, formData);
    if (response.data.msg == "OK" && uploads) { 
      await PostProductDetail(response.data.data.id, uploads);
    }
    setTimeout(async function () {console.log("PostProduct()",response.data)}, 1000);
    return await response.data;
  } catch (err) {
    console.log("error", err);
  }
}

export async function PutProduct(v, uploads) {
  try {
    let formData = new FormData();
    formData.append("id", v.id);
    formData.append("typeId", v.typeId);
    formData.append("name", v.name);
    formData.append("price", v.price);
    formData.append("detail", v.detail);
    formData.append("stock", v.stock);
    formData.append("stockSell", v.stockSell);
    formData.append("isused", v.isused);
    if (v.typeId == 1) {
      formData.append("typeSeed", v.typeSeed);
      formData.append("levelCoffee", v.levelCoffee);
    }
    const response = await Instance.put(url, formData);
    if (uploads) {
      await PostProductDetail(v.id, uploads);
    }
    return response.data;
  } catch (err) {
    console.log("error", err);
  }
}

export async function DeleteProduct(pdid) {
  try {
    const response = await Instance.delete(url + "/" + pdid);
    return await response.data;
  } catch (err) {
    console.log("error", err);
  }
}

export async function PostProductDetail(pdid, uploads) {
  try {
    Array.from(uploads).map(async (res) => {
      let formData = new FormData();
      formData.append("productId", pdid);
      formData.append("UpFile", res);
      await Instance.post("Apiproductdetails", formData);
    });
  } catch (err) {
    console.log("error", err);
  }
}

export async function DeleteProductDetail(pdid) {
  try {
    const response = await Instance.delete("Apiproductdetails/" + pdid);
    return await response.data;
  } catch (err) {
    console.log("error", err);
  }
}
