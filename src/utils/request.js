import axios from "axios"
import { Message } from "element-ui"
let instance = axios.create({
    baseURL: '/api',
    timeout: 60000,
    headers: {'Authorization': localStorage.getItem("Authorization")}
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log(config)
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data = response.data;
    if(data.code !== 0){
      Message(data.msg)
    }
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
export default instance