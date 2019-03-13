import request from '@/utils/request'

// 缴退费总览
export const getRefundOrPayForECharts = data =>
  request({
    url: '/a/businessQuery/findRefundOrPayForECharts',
    data
  })

// 查询教室利用率
export const getClassroomUtilizationRatio = data =>
  request({
    url: '/a/businessQuery/findClassroomUtilizationRatioForECharts',
    data
  })

// 业务量查询
export const getStudentBusinessForECharts = data =>
  request({
    url: '/a/businessQuery/findStudentBusinessForECharts',
    data
  })

// 查询业务量列表
export const getStudentBusinessList = data =>
  request({
    url: '/a/businessQuery/findStudentBusinessList',
    data
  })
