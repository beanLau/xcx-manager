export function setCookie(name, value, time) {
    var exp = new Date();
    exp.setTime(exp.getTime() + time);
    document.cookie =
      name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  }
  export function getCookie(name) {
    var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
  }
  export function delCookie(name) {
    setCookie(name, "", -1);
  }
  export function downLoadFile(res) {
    const blob = new Blob([res.data]);
    if ("download" in document.createElement("a")) {
      // 非IE下载
      const elink = document.createElement("a");
      elink.download = res.fileName;
      elink.style.display = "none";
      elink.href = URL.createObjectURL(blob);
      document.body.appendChild(elink);
      elink.click();
      URL.revokeObjectURL(elink.href); // 释放URL 对象
      document.body.removeChild(elink);
    } else {
      // IE10+下载
      navigator.msSaveBlob(blob, res.fileName);
    }
  }
  /**
   * 根据用户权限生产动态路由
   * @param {路由规则} asyncRoutes
   * @param {权限信息} roles
   * @param {表示是否是一级菜单} flag
   */
  export function generateRoutes(asyncRoutes, roles, flag) {
    let routes = [];
    asyncRoutes.forEach(item => {
      let path = item.path;
      let power = roles[path];
      let children;
      if (flag == void 0) {
        // 如果flag == 空 走一级菜单
        if (item.children) {
          children = generateRoutes(item.children, roles, true);
          if (children.length > 0) {
            item.children = children;
            routes.push(item);
          }
        }
      } else if (power && power.showStatus) {
        item.meta = power || { showStatus: true };
        if (item.children) {
          children = generateRoutes(item.children, roles, true);
          item.children = children;
        }
        routes.push(item);
      }
    });
    return routes;
  }
  
  export function getDefaultPage(asyncRoutes) {
    let defaultPath = "";
    for (let i = 0; i < asyncRoutes.length; i++) {
      if (i == asyncRoutes.length - 1) {
        defaultPath = asyncRoutes[0].children[0].path;
        break;
      }
    }
    return defaultPath || "/login";
  }
  