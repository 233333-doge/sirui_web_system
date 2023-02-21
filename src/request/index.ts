import axios from "axios";
import { ElMessageBox, ElMessage } from "element-plus";
import router from "@/router";

// const baseURL = "/api"; // fastMock
const baseURL = "https://service.ruisport.cn/ruis/";
//创建axios实例
const service = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    "Content-type": "application/json;charset=utf-8",
  },
});

//请求拦截
service.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  if (localStorage.getItem("token")) {
    config.headers.token = localStorage.getItem("token") || "";
  }
  return config;
});

//响应拦截
service.interceptors.response.use(
  ({ data }) => {
    if (data.success != true) {
      if (data.msgCode === -10003) {
        ElMessageBox.alert("登录过期，请重新登录！", "提示", {
          // if you want to disable its autofocus
          // autofocus: false,
          confirmButtonText: "OK",
          callback: () => {
            router.push("/login");
          },
        });
      }
      ElMessage.error(data.errMsg);
      return Promise.reject(data);
    }
    return data;
  },
  (err) => {
    console.log(err, "asd");
  }
);

export default service;
