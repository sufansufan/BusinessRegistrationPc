import request from '@/utils/request'

// 查询教师的三率分析
export const findThreeRateAnalysisForTeacher = data =>
  request({
    url: '/a/subject/findThreeRateAnalysisForTeacher',
    data
  })

// 查询教师的三率分析
export const findThreeRateAnalysisForAdminOrgan = data =>
  request({
    url: '/a/subject/findThreeRateAnalysisForAdminOrgan',
    data
  })
// 按年级查询三率分析
export const findThreeRateAnalysisForGrade = data =>
  request({
    url: '/a/subject/findThreeRateAnalysisForGrade',
    data
  })
