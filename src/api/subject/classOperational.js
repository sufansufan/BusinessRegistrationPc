import request from '@/utils/request'

// 班级运营数据
export const getClassOperationalList = data =>
  request({
    url: '/a/subject/findClassOperationData',
    data
  })
