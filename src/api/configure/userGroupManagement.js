import request from '@/utils/request'

// 获取用户组
export const getRoleList = data =>
  request({
    url: '/a/sysManage/findRoleList',
    data
  })

// 获取全部菜单列表
export const getMenuList = data =>
  request({
    url: '/a/sysManage/findAllMenuList',
    data
  })

// 添加编辑用户组
export const addAndEditRole = data =>
  request({
    url: '/a/sysManage/addAndEditRole',
    data
  })

// 删除用户组
export const delRoleById = data =>
  request({
    url: '/a/sysManage/deleteRoleById',
    data
  })
