import axios from 'axios'

const request = axios.create({
    // 基础路径
	baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器

// 相应拦截器

// 导出
export default request
