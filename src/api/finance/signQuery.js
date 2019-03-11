import request from '@/utils/request'

// 获取收费项目列表
export const getAttendList = data =>
  request({
    url: '/a/signUpPayFees/findAttendList',
    data
  })
