import Instance from "../helper/Axios";

const url = "ApiTypeProducts";

export async function GetTypeProducts() {
  try {
    const response = await Instance.get(url);
    return await response.data;
  } catch (err) {
    console.log("error", err);
  }
}
 