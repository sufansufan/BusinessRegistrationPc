import request from '@/utils/request'

// 获取费率列表
export const getRateList = data =>
  request({
    url: '/a/financeManage/findRateList',
    data
  })

// 新增编辑费率
export const addAndEditRate = data =>
  request({
    url: '/a/financeManage/addAndEditRate',
    data
  })

// 编辑状态
export const editRateStatus = data =>
  request({
    url: '/a/financeManage/editRateStatus',
    data
  })

// 删除费率设置
export const deleteRate = data =>
  request({
    url: '/a/financeManage/deleteRate',
    data
  })
