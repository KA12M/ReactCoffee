import Instance from "../helper/Axios";

const url = "apitransports";

export async function PostTransport(body) {
  try {
    const response = await Instance.post(url,body);
    return await response.data;
  } catch (err) {
    console.log("error", err);
  }
}