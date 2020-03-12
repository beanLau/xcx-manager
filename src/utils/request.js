import axios from "axios";
import { Message } from "element-ui";
import { getCookie, setCookie } from "./utils";
import { downLoadFile } from "@/utils/utils";
function zdAxios(options) {
  return new Promise((resolve, reject) => {
    let reqData = options.data;
    for (let key in reqData) {
      if (reqData[key] === "") {
        delete reqData[key];
      }
      // reqData[key].replace(" ", "");
    }
    //removeSpace(reqData);
    options.data = reqData;
    //网络请求
    axios({
      url: `${process.env.VUE_APP_BASE_API || ""}${options.url}`,
      method: options.method || "POST",
      headers: {
        "Content-Type": options.contentType || "application/json",
        Authorization: "Bearer " + localStorage.getItem("Authorization") || ""
      },
      data: options.contentType
        ? options.data
        : JSON.stringify(options.data || {}),
      responseType: options.responseType || "json"
    }).then(res => {
      //如果后台响应的是流数据，进行下载。
      if (res.headers["content-type"].indexOf("octet-stream") != -1) {
        let fileName = res.headers["content-disposition"].split("=");
        fileName = fileName[fileName.length - 1];
        fileName = fileName.replace(/"/g, "");
        res.fileName = fileName;
        downLoadFile(res);
        resolve(res);
      } else {
        if (res.data.code != 0) {
          Message({
            message: res.data.msg || "error",
            type: "error",
            duration: 5 * 1000
          });
          //如果登录失效
          if (res.data.code === 401 || res.data.code === 5) {
            window.location.href = "/login";
            // if (!getCookie("needLogin")) {
            //   window.open("http://localadmin.wangxiao.cn/login.aspx");
            //   setCookie("needLogin", true, 10000);
            // }
          }
          reject(res.data);
        } else {
          resolve(res.data);
        }
      }
    });
  });
}
zdAxios.post = function(url, data, responseType) {
  return zdAxios({
    method: "POST",
    url: url,
    data: data,
    responseType: responseType
  });
};
zdAxios.get = function(url, data, responseType) {
  return zdAxios({
    method: "GET",
    url: url,
    data: data,
    responseType: responseType
  });
};
export default zdAxios;
