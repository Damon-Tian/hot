import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;
// const baseURL = "http://something.wmelon.cn:2222";
// ? "http://127.0.0.1:2222"
// : "http://something.wmelon.cn:2222";
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
    return res.data?.data || res.data;
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

export async function getPic() {
  let res = await instance.get("/pic");
  console.log(res);
  return res;
}

export async function deletePic(id) {
  let res = await instance.get("/pic/delete/" + id);
  console.log(res);
  return res;
}

export async function upload(file) {
  return new Promise(async (resolve, reject) => {
    let res = await instance.post("/upload", formData(file), {
      headers: { "Content-Type": "multipart/form-data" },
    });
    resolve(res);
  });
}

function formData(data) {
  let formData = new FormData();
  for (let i in data) {
    formData.append(i, data[i]);
  }
  return formData;
}
