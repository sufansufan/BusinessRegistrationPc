import request from '@/utils/request'

// 获取字典
export const getSysDictList = data =>
  request({
    url: '/a/backgroundSystem/sysDict/findSysDictList',
    data
  })

// 首页第一部分统计（包括总收入，总退费，在读学员数，确认收入）
export const getFirstStatistics = data =>
  request({
    url: '/a/home/findFirstStatistics',
    data
  })

// 首页第二部分统计（包括注册人数，订单数）
export const getSecondStatistics = data =>
  request({
    url: '/a/home/findSecondStatistics',
    data
  })

// 首页第三部分统计（包括转班通知，调课通知）
export const getThreeStatistics = data =>
  request({
    url: '/a/home/findThreeStatistics',
    data
  })

// 首页第四部分统计（包括学员年级，学员来源，近30天咨询转化）
export const getFourStatistics = data =>
  request({
    url: '/a/home/findFourStatistics',
    data
  })
