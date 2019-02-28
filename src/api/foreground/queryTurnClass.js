import request from '@/utils/request'

// 获取转班查询
export const getTurnClassList = data =>
  request({
    url: '/a/businessQuery/findTurnClassList',
    data
  })
