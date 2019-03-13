import request from '@/utils/request'

// 发放管理-查询
export const getCouponGrantList = data =>
  request({
    url: '/a/subject/findCouponGrantList',
    data
  })

// 查询优惠券模板
export const getCouponTemplateList = data =>
  request({
    url: '/a/subject/findCouponTemplateList',
    data
  })

// 新增编辑优惠券模板
export const addAndEditCouponTemplate = data =>
  request({
    url: '/a/subject/addAndEditCouponTemplate',
    data
  })

// 匹配优惠券
export const findCouponByStudent = data =>
  request({
    url: '/a/subject/findCouponByStudent',
    data
  })

// 停用优惠券模板
export const editCouponTemplateStatus = data =>
  request({
    url: '/a/subject/editCouponTemplateStatus',
    data
  })

// 删除优惠券模板
export const deleteCouponTemplate = data =>
  request({
    url: '/a/subject/deleteCouponTemplate',
    data
  })

// 发放管理-删除
export const deleteCouponGrant = data =>
  request({
    url: '/a/subject/deleteCouponGrant',
    data
  })

// 发放管理-新增
export const addCouponGrant = data =>
  request({
    url: '/a/subject/addCouponGrant',
    data
  })

// 发放管理-发放
export const addCouponGrantList = data =>
  request({
    url: '/a/subject/addCouponGrantList',
    data
  })

// 发放管理-查询发放详情
export const findCouponGrantInfo = data =>
  request({
    url: '/a/subject/findCouponGrantInfo',
    data
  })

// 发放管理-导入
export const importCouponGrant = data =>
  request({
    url: '/a/subject/importCouponGrant',
    data
  })
