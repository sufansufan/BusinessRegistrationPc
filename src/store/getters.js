const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  drawer: state => state.app.drawer,
  theme: state => state.app.theme,
  fastNav: state => state.app.fastNav,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  status: state => state.user.status,
  roles: state => state.user.roles,
  userInfo: state => state.user.userInfo,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  constant: state => state.constant.constant,
  courseCart: state => state.apply.courseCart,
  campusStatus: state => state.campus.campusStatus
}
export default getters
