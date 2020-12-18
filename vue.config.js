module.exports = {
    publicPath: '/',
    devServer: {
      proxy: {
        '/api': {
          target: 'http://ttapi.research.itcast.cn/',
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api/': ''
          }
        },
        '/socket.io': {
          target: 'http://ttapi.research.itcast.cn',
          ws: true,
          changeOrigin: true
        },
        'sockjs-node': {
            target: 'http://ttapi.research.itcast.cn',
            ws: false,
            changeOrigin: true
        }
      }
    },
    css: {
      loaderOptions: {
        less: {
          modifyVars: {
            blue: '#3296FA',
            'text-color': '#333'
          }
        }
      }
    }
  }
