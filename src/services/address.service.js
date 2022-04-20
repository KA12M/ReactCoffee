import Instance from "../helper/Axios";

const url = "ApiAddresses";

export async function GetAddressById(userId) {
  try {
    const response = await Instance.get(url+"/"+userId);
    return await response.data;
  } catch (err) {
    console.log("error", err);
  }
}

export async function DeleteAddressById(id) {
  try {
    const response = await Instance.delete(url+"/"+id);
    return await response.data;
  } catch (err) {
    console.log("error", err);
  }
}

export async function PostAddress(v,userId) {
  try {
    let formData = new FormData();
    formData.append("userId", userId);
    formData.append("nameUser", v.nameUser);
    formData.append("telephone", v.telephone);
    formData.append("address1", v.address1);
    formData.append("province", v.province);
    formData.append("district", v.district);
    formData.append("subDistrict", v.subDistrict);
    formData.append("zipcode", v.zipcode);
    const response = await Instance.post(url,formData);
    return await response.data;
  } catch (err) {
    console.log("error", err);
  }
}
 