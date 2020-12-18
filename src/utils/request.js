import axios from 'axios'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'

import store from '@/store/'
import router from '@/router/'

const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

const request = axios.create({
    // 基础路径
    baseURL: 'http://ttapi.research.itcast.cn/',
    transformResponse: [function (data) {
        // 后端返回的数据可能不是 JSON 格式字符串
        // 如果不是的话，那么 JSONbig.parse 调用就会报错
        // 所以我们使用 try-catch 来捕获异常，处理异常的发生
        try {
          // 如果转换成功，则直接把结果返回
          return JSONbig.parse(data)
        } catch (err) {
          // console.log('转换失败', err)
          // 如果转换失败了，则进入这里
          // 我们在这里把数据原封不动的直接返回给请求使用
          return data
        }
        // axios 默认在内部使用 JSON.parse 来转换处理原始数据
        // return JSON.parse(data)
    }]
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log(config)
    const { user } = store.state

    // 如果用户已登录，统一给接口设置token信息
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    // 处理完之后，一定要把config返回，否则请求就会停在这里
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(function (response) {
  // 响应成功
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, async function (error) {
  // 响应失败
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  const status = error.response.status

  if (status === 400) {
    // 客户端请求参数错误
    Toast.fail('客户端请求参数异常')
  } else if (status === 401) {
    // token失效
    const { user } = store.state
    // 1、如果没有user或者user.token，跳转到登录页面
    if (!user || !user.token) {
      // 直接跳转到登录页
      return redirectLogin()
    }
    // 2、使用refresh_token请求获取新的token
    try {
      const { data } = await refreshTokenReq({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })

      console.log(data)

      // 拿到新的token之后把它更新到容器中
      user.token = data.data.token
      store.commit('setUser', user)

      // 把失败的请求重新发出去
      // error.config是本次请求的相关配置信息对象
      // 这里使用request发请求，它会走自己的拦截器
      // 它的请求拦截器中通过store容器访问token数据
      return request(error.config)
    } catch (err) {
      // 刷新token都失败了，直接跳转登录页
      redirectLogin()
    }
  } else if (status === 403) {
    // 没有权限操作
    Toast.fail('没有权限操作')
  } else if (status >= 500) {
    // 服务器异常
    Toast.fail('服务端异常，请稍后重试')
  }

  // 抛出异常
  return Promise.reject(error)
})

function redirectLogin () {
  // router.replace('/login')
  router.replace({
    name: 'login',
    // 传递查询参数
    query: {
      // 数据名是自己起的
      // router.currentRoute和在组件中使用this.$route是一个东西
      redirect: router.currentRoute.fullPath
    }
  })
}
// 导出
export default request
