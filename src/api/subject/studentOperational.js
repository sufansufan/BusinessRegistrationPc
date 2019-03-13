import request from '@/utils/request'

// 学员运营数据
export const getStudentOperationalList = data =>
  request({
    url: '/a/subject/findStudentOperationData',
    data
  })
