import request from '@/utils/request'

// 添加到购课车
export const addCourseCart = data =>
  request({
    url: '/a/signUpPayFees/addAndEditCourseCart',
    data
  })

// 获取购课车列表
export const getCourseCartList = data =>
  request({
    url: '/a/signUpPayFees/findCourseCartList',
    data
  })

// 删除购课车
export const delCourseCart = data =>
  request({
    url: '/a/signUpPayFees/deleteCourseCart',
    data
  })

// 结算
export const getSettlementList = data =>
  request({
    url: '/a/signUpPayFees/findClassInfoByCloseAccount',
    data
  })

// 获取班级课次列表
export const getClassAttendList = data =>
  request({
    url: '/a/signUpPayFees/findClassAttendList',
    data
  })

// 立即支付/稍后再缴
export const signUp = data =>
  request({
    url: '/a/signUpPayFees/signUp',
    data
  })

// 支付完成
export const paymentComplete = data =>
  request({
    url: '/a/signUpPayFees/paymentComplete',
    data
  })

// 订单列表
export const getOrderList = data =>
  request({
    url: '/a/signUpPayFees/findStudentOrderList',
    data
  })

// 在读班级、已结课、支付完成
export const getStudentClassList = data =>
  request({
    url: '/a/signUpPayFees/findStudentClassList',
    data
  })

// 支付记录列表
export const getPaymentList = data =>
  request({
    url: '/a/signUpPayFees/findStudentPaymentInfoList',
    data
  })

// 获取调课记录列表
export const getClassSwitching = data =>
  request({
    url: '/a/signUpPayFees/findClassSwitching',
    data
  })

// 根据大订单ID获取订单数据
export const getOrderInfo = data =>
  request({
    url: '/a/signUpPayFees/getBigOrder',
    data
  })

// 判断是否允许转班/调课
export const findAllowedClasses = data =>
  request({
    url: '/a/signUpPayFees/findAllowedClasses',
    data
  })

// 调课
export const classSwitching = data =>
  request({
    url: '/a/signUpPayFees/editClassSwitching',
    data
  })

// 转班
export const changeOfClass = data =>
  request({
    url: '/a/signUpPayFees/editChangeOfClass',
    data
  })

// 获取转班记录列表
export const getChangeOfClassList = data =>
  request({
    url: '/a/signUpPayFees/findChangeOfClassList',
    data
  })

// 获取其他收费列表
export const getOtherOrderList = data =>
  request({
    url: '/a/signUpPayFees/findOtherOrderList',
    data
  })

// 获取退费单列表
export const getApplyRefund = data =>
  request({
    url: '/a/signUpPayFees/getApplyRefund',
    data
  })

// 发起退费
export const applyRefund = data =>
  request({
    url: '/a/signUpPayFees/editApplyRefund',
    data
  })

// 获取报名退费列表
export const getSignUpRefundOrderList = data =>
  request({
    url: '/a/signUpPayFees/findSignUpRefundOrderList',
    data
  })

// 获取其他退费列表
export const getOtherOrderRefundList = data =>
  request({
    url: '/a/signUpPayFees/findOtherOrderRefundList',
    data
  })

// 获取退费单列表
export const getBigRefundOrderList = data =>
  request({
    url: '/a/signUpPayFees/findBigRefundOrderList',
    data
  })

// 获取退费详情
export const getBigRefundInfo = data =>
  request({
    url: '/a/signUpPayFees/getBigRefundInfo',
    data
  })
