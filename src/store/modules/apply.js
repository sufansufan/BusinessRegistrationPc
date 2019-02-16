import {
  addCourseCart,
  getCourseCartList,
  delCourseCart
} from '@/api/foreground/apply'
const apply = {
  state: {
    courseCart: []
  },
  mutations: {
    SET_COURSE_CART(state, list) {
      state.courseCart = list
    }
  },
  actions: {
    addCourseCart({ dispatch }, { studentId, classId }) {
      return new Promise((resolve, reject) => {
        addCourseCart({ studentId, classId })
          .then(() => {
            dispatch('getCourseCart', { studentId })
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getCourseCart({ commit }, params) {
      return new Promise((resolve, reject) => {
        getCourseCartList(params)
          .then(response => {
            commit('SET_COURSE_CART', response.data.list)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    delCourseCart({ dispatch }, { id, studentId }) {
      return new Promise((resolve, reject) => {
        delCourseCart({ id })
          .then(() => {
            dispatch('getCourseCart', { studentId })
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default apply
