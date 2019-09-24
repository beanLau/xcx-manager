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
            '/api': {
                // 目标 API 地址
                target: 'http://127.0.0.1:3000/',
                // 将主机标头的原点更改为目标URL
                changeOrigin: false
            }
        }
    }
}