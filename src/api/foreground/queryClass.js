import request from '@/utils/request'

// 获取班级详情
export const getClassInfo = data =>
  request({
    url: '/a/class/classAbout/getPxxclassById',
    data
  })

// 获取课次和签到列表
export const getAttendClassList = data =>
  request({
    url: '/a/class/attendClass/findAttendClassList',
    data
  })

// 获取学生上课列表
export const getStuAttendClassList = data =>
  request({
    url: '/a/class/attendClass/findStuAttendClassList',
    data
  })

// 获取学生列表
export const getStudentList = data =>
  request({
    url: '/a/class/classAbout/findStudentListByClassId',
    data
  })

// 班级收入情况
export const getClassIncomeList = data =>
  request({
    url: '/a/class/classAbout/findIncomeSituationByClassId',
    data
  })

// 获取变动记录列表
export const getChangedRecordList = data =>
  request({
    url: '/a/class/classAbout/findClassOperationInfoListByClassId',
    data
  })

// 获取教师详情
export const getTeacherInfo = data =>
  request({
    url: '/a/teacher/teacherAbout/getTeacherById',
    data
  })
