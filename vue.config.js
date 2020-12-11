module.exports = {
    runtimeCompiler: true,
    devServer: {
        proxy: {
            // 匹配请求路径中的字符，
            // 如果符合就用这个代理对象代理本次请求，路径为target的网址，
            // changeOrigin为是否跨域，
            // 如果不想始终传递这个前缀，可以重写路径
            // pathRewrite为是否将指定字符串转换一个再发过去。
            '/api': {
              target: 'http://ttapi.research.itcast.cn/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
