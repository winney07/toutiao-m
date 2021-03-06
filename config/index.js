module.exports = {
    dev: {
        proxyTable: {
            '/api': {
              target: 'http://ttapi.research.itcast.cn/', // 接口的域名
              secure: false, // 如果是https接口，需要配置这个参数
              changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
              pathRewrite: {
                '^/api': '' // '/api/a/user' =='localhost:8080/user'
              }
            },
            '/socket.io': {
              target: 'http://ttapi.research.itcast.cn', // 代理的服务地址
              changeOrigin: true, // needed for virtual hosted sites
              logLevel: 'debug'
            }
        }
    }
}
