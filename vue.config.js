const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    lintOnSave: true,
    chainWebpack: (config) => {
        config.resolve.alias
        .set('@', resolve('src'))
        .set('@assets',resolve('src/assets'))
        // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
    },
    devServer: {
        // 设置代理
        proxy: {
            "/api":{
                target: 'http://127.0.0.1:3000/',
                changeOrigin: true,
                ws:true,
                pathRewrite:{
                    "^/api": ""
                }
            }
        }
    }
}