import request from '@/utils/request'

// 获取后补管理列表
export const getSignupCandidateList = data =>
  request({
    url: '/a/signUpPayFees/findSignupCandidateList',
    data
  })

// 删除后补管理列表
export const delSignupCandidate = data =>
  request({
    url: '/a/signUpPayFees/deleteSignupCandidate',
    data
  })
