  /**
 * 评论请求模块
 */

import request from '@/utils/request'
// import store from '@/store/'

  /**
 * 获取评论或评论回复
 */

// export const getArticleComments = data => {
//     return request({
//       method: 'GET',
//       url: '/app/v1_0/comments',
//       data
//     })
// }

export const getArticleComments = () => {
  let results = ''
  request.get('/app/v1_0/comments?type=a&source=1323834137571753984&limit=10').then(response => {
    console.log('response')
    console.log(response)
    results = response
  })
  return results
}

  /**
 * 对评论或评论回复点赞
 */

export const addCommentLike = commentId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}

 /**
 * 取消对评论或评论回复点赞
 */

export const deleteCommentLike = commentId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${commentId}`
  })
}

 /**
 * 添加评论或评论回复
 */

export const addComment = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
