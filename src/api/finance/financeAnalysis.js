import request from '@/utils/request'

// 按市级查询
export const getFinanceAnalysisList = data =>
  request({
    url: '/a/financeDateStatistics/findFinanceAnalysisList',
    data
  })
