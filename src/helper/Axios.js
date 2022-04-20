import axios from 'axios';

// export const BASE_URL = 'http://localhost:30120/';
export const BASE_URL = 'http://tee.kru.ac.th/cs63/s11/flutterapp1/backend/';

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    //Authorization: "",
  },
});
