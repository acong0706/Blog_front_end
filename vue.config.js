module.exports = {
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://43.143.156.17:8081',
        // target: 'http://localhost:8081',
        // secure: false, // 如果是https接口，需要配置这个参数
        // 允许跨域
        changeOrigin: true,
        // ws: true, // 是否代理websockets
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
