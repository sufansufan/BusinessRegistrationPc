import request from '@/utils/request'

// 按市级查询
export const getIncomeConfirmListByCity = data =>
  request({
    url: '/a/financeDateStatistics/findIncomeConfirmListByCity',
    data
  })

// 按校区查询
export const getIncomeConfirmListByCampus = data =>
  request({
    url: '/a/financeDateStatistics/findIncomeConfirmListByCampus',
    data
  })

// 预估确认收入
export const getPredictIncomeConfirmList = data =>
  request({
    url: '/a/financeDateStatistics/findPredictIncomeConfirmList',
    data
  })
