import request from '@/utils/request'

// 退款管理-修改备注/审核/打款操作
export const editBigOrder = data =>
  request({
    url: '/a/signUpPayFees/editBigOrderStatus',
    data
  })
