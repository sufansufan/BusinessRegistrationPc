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
