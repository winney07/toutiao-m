  /**
 * 搜索相关请求模块
 */

import request from '@/utils/request'
// import store from '@/store/'

  /**
 * 获取搜索联想建议
 */

export const getSearchSuggestions = q => {
    // console.log(data)
    return request({
      method: 'GET',
      url: '/app/v1_0/suggestion',
      params: {
        q
      }
    })
}

  /**
 * 获取搜索结果
 */

export const getSearchResult = params => {
  // console.log(data)
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}

  /**
 * 获取用户搜索历史
 */

export const getSearchHistories = () => {
  // console.log(data)
  return request({
    method: 'GET',
    url: ' /app/v1_0/search/histories'
  })
}
