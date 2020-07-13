import axios from "axios"
import qs from "qs"

const ajax = axios.create({
  baseURL: 'http://10.10.10.10',
  headers: {
    Accept: "*/*",
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  },
  timeout: 500000,
  transformRequest: [
    function (data, headers) {
      // 对 data 进行任意转换处理
      if (headers['Content-Type'] === "application/x-www-form-urlencoded;charset=utf-8")
        return qs.stringify(data);
      else
        return data;
    }
  ]
})

// 拦截请求
ajax.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 拦截响应
ajax.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error);
  }
)
export default ajax
