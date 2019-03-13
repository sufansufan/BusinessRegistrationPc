import request from '@/utils/request'

// 查询-人数人次
export const getFindPerson = data =>
  request({
    url: '/a/subject/findPerson',
    data
  })

// 常规分析-查询学员及注册人数
export const getFindRegisterPerson = data =>
  request({
    url: '/a/subject/findRegisterPerson',
    data
  })

