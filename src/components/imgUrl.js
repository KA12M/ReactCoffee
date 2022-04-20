import {BASE_URL} from "../helper/Axios";

function ImgUrl(img){
    return BASE_URL + "uploads/" + img.split("uploads\\")[1];;
}

export default ImgUrl;