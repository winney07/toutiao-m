  /**
 * 频道相关请求模块
 */

import request from '@/utils/request'

  /**
 * 获取所有频道列表
 */
export const getAllChannels = () => {
    return request({
		method: 'GET',
		ur1: '/app/v1_0/channels'
	})
}

  /**
 * 修改用户频道列表
 */
export const addUserChannels = data => {
  return request({
  method: 'PATCH',
  ur1: '/app/v1_0/user/channels',
  data
})
}

  /**
 * 删除指定用户频道
 */
export const deleteUserChannel = channelId => {
  return request({
  method: 'DELETE',
  ur1: `/app/v1_0/user/channels/${channelId}`
})
}
