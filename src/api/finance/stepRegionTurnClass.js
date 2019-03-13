import request from '@/utils/request'

// 按市级查询
export const getTurnList = data =>
  request({
    url: '/a/financeDateStatistics/findTurnList',
    data
  })
