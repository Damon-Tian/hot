import axios from "axios";

let dev = import.meta.env.DEV;
const baseURL = dev
  ? "http://127.0.0.1:2222"
  : "http://something.wmelon.cn:2222";
const timeout = 50000;

const instance = axios.create({
  baseURL,
  timeout,
});

instance.interceptors.request.use((config) => {
  return config;
});

instance.interceptors.response.use((res) => {
  if (res.data.code == 200) {
    return res.data.data;
  } else {
    return res.statusText;
  }
});

export async function getD() {
  let res = await instance.get("d");
  console.log(res);
  return res;
}

export async function getDouban(type, page = 1) {
  let res = await instance.get("/douban/" + type + "/" + page);
  console.log(res);
  return res;
}

export async function getZhihu() {
  let res = await instance.get("/zhihu");
  console.log(res);
  return res;
}
