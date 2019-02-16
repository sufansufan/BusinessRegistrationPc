import request from '@/utils/request'

// 获取收费项目列表
export const getChargeItemList = data =>
  request({
    url: '/a/financeManage/findChargeItemList',
    data
  })
