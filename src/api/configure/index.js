import request from '@/utils/request'

// 中小学设置--获取中小学列表
export const getSchoolList = data =>
  request({
    url: '/a/sysManage/findSchoolList',
    data
  })

// 中小学设置--添加编辑中小学
export const addAndEditSchool = data =>
  request({
    url: '/a/sysManage/addAndEditSchool',
    data
  })

// 中小学设置--删除中小学
export const delSchool = data =>
  request({
    url: '/a/sysManage/deleteSchool',
    data
  })

// APP账号查询
export const getAppAccList = data =>
  request({
    url: '/a/sysManage/findStudentExpandList',
    data
  })

// 修改app账号状态
export const editStudentExpandStatus = data =>
  request({
    url: '/a/sysManage/editStudentExpandStatus',
    data
  })

// 查询POS机信息
export const getPosList = data =>
  request({
    url: '/a/sysManage/findPosList',
    data
  })

// 删除pos机
export const delPos = data =>
  request({
    url: '/a/sysManage/deletePos',
    data
  })

// POS机启用停用
export const editPosStatus = data =>
  request({
    url: '/a/sysManage/editPosStatus',
    data
  })

// 新增编辑POS机
export const addAndEditPos = data =>
  request({
    url: '/a/sysManage/addAndEditPos',
    data
  })

// 查询POS机历史记录
export const getPosHistoryList = data =>
  request({
    url: '/a/sysManage/findPosHistoryList',
    data
  })

// 查询操作日志
export const getSysOperationInfoList = data =>
  request({
    url: '/a/sysManage/findSysOperationInfoList',
    data
  })
