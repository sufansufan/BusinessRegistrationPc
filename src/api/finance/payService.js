import request from '@/utils/request'

// 获取收费项目列表
export const getChargeItemList = data =>
  request({
    url: '/a/financeManage/findChargeItemList',
    data
  })

// 添加编辑收费项目
export const addAndEditChargeItem = data =>
  request({
    url: '/a/financeManage/addAndEditChargeItem',
    data
  })

// 删除收费项目
export const deleteChargeItem = data =>
  request({
    url: '/a/financeManage/deleteChargeItem',
    data
  })

// 编辑收费项目的状态
export const editChargeItemStatus = data =>
  request({
    url: '/a/financeManage/editChargeItemStatus',
    data
  })
